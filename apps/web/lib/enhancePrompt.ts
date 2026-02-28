import OpenAI from "openai";
import { systemPrompt } from "./prompts";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function enhancePrompt(
  userPrompt: string,
  image_urls: string[] = []
) {
  const prompt = z.object({
    prompt: z.string(),
  });

  const ai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const validImageUrls = image_urls.filter(Boolean);
  const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    { type: "text", text: userPrompt },
    ...validImageUrls.map((url) => ({
      type: "image_url" as const,
      image_url: { url },
    })),
  ];

  const aiPrompt = await ai.chat.completions.create({
    model: "google/gemini-3-flash-preview",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: content,
      },
    ],
    response_format: zodResponseFormat(prompt, "prompt"),
  });

  if (!aiPrompt.choices[0]) {
    return "";
  }
  return aiPrompt.choices[0].message.content;
}
