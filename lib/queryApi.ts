import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const query = async (prompt: string, model: string, messages: any) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        // { role: "system", content: "Hi my name is Tom" },
        { role: "user", content: prompt },
        // { role: "user", content: "Who won the world series in 2020?" },
        // {
        //   role: "assistant",
        //   content: "The Los Angeles Dodgers won the World Series in 2020.",
        // },
        // { role: "user", content: "Where was it played? And what is my name?" },
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
