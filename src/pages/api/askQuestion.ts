// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "lib/queryApi";

import { adminDb } from "firebaseAdmin";
import { firestore } from "firebase-admin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID" });
    return;
  }

  const response = await query(prompt, model);
  const message: Message = {
    text: response || "ChatGPT didn't find an answer on that",
    createdAt: firestore.FieldValue.serverTimestamp(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
