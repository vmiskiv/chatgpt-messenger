import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`flex justify-center py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-5">
        <Image
          src={message.user.avatar}
          alt="avatar"
          width={10}
          height={10}
          className="rounded-full h-10 w-10 object-cover"
        />
        <p className="">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
