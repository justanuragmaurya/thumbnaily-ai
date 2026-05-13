import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { systemPrompt } from "./prompts.js";

export async function enhancePrompt(userPrompt: string, imageUrls: string[] = []) {
  const prompt = z.object({
    prompt: z.string(),
  });

  const ai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    { type: "text", text: userPrompt },
    ...imageUrls.filter(Boolean).map((url) => ({
      type: "image_url" as const,
      image_url: { url },
    })),
  ];

  const aiPrompt = await ai.chat.completions.create({
    model: "moonshotai/kimi-k2.6",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content,
      },
    ],
    response_format: zodResponseFormat(prompt, "prompt"),
  });

  return aiPrompt.choices[0]?.message.content ?? "";
}
