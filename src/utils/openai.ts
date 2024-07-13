import { createOpenAI } from "@ai-sdk/openai";

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-proj-1oeSyXr7dP3qexLn6w6hT3BlbkFJWRfN4e2GDHeMxJGT0W3X",
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});
