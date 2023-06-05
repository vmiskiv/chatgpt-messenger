import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const query = async (prompt: string, model: string) => {
  const completion = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.3,
      max_tokens: 1800,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => `ChatGPT didn't find an answer on that ${err.message}`);

  return completion;
};

export default query;
