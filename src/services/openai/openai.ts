import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const sendPromptToOpenAI = async (prompt: string) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 2000,
    temperature: 0.1,
  });
  return completion;
};
