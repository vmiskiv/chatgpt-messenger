export const convertedMessages = (messages: any) =>
  messages.map(({ text }: { text: string }) => ({
    role: "user",
    content: text,
  }));
