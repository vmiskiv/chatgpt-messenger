"use client";

import { Toaster } from "react-hot-toast";

export default function ClientProvider() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "rgba(255, 255, 255, .7)",
          },
        }}
      />
    </>
  );
}
