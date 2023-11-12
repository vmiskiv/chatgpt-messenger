import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const query = async (prompt: string, model: string, messages: any) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        // 4509 required settings
        {
          role: "system",
          content: "",
        },
        { role: "user", content: prompt },
        // 4501 Add a dialogue
      ],
    });

    const gptAnswer = completion.choices[0].message.content;

    return gptAnswer;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    }
  }
};

export default query;
