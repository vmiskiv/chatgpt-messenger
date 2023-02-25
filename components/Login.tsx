"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image className="select-none" src="/chatgpt-icon.svg" alt="chatgpt" width={300} height={300} />
      <button onClick={() => signIn('google')} className="font-bold text-white text-3xl animate-pulse">
        Sign In to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
