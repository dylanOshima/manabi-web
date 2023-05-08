import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import {AxiosResponse} from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const sendPromptToOpenAI = async (
  prompt: string
): Promise<AxiosResponse<CreateCompletionResponse, any>> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 2000,
    temperature: 0.1,
  });
  return completion;
};
