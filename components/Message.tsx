import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`flex  py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className={`flex lg:w-[700px] lg:mx-auto gap-5 px-5 ${!isChatGPT && `flex-row-reverse ml-auto`}`}>
        <Image
          src={message.user.avatar}
          alt="avatar"
          width={500}
          height={500}
          className="rounded-full h-10 w-10"
        />
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
