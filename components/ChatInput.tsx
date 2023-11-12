"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const [messages] =
    useCollection(
      session &&
        query(
          collection(
            db,
            "users",
            session?.user?.email!,
            "chats",
            chatId,
            "messages"
          ),
          orderBy("createdAt", "asc")
        )
    ) || [];

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
        messages,
      }),
    }).then(() => {
      toast.success("ChatGPT has been responded", {
        id: notification,
      });
    });
  };

  return (
    <div className="flex-col bg-gray-700/50 text-gray-400 rounded-lg text-sm flex lg:w-[700px] lg:mx-auto">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex w-full">
        <input
          className="flex-1 bg-transparent 
          focus:outline-none disabled:cursor-not-allowed
        disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Write your message here..."
        />
        <button
          disabled={!session || !prompt}
          type="submit"
          className="p-2 bg-[#13A37F] hover:opacity-50
          rounded-full text-white font-bold disabled:bg-gray-500 
          disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
