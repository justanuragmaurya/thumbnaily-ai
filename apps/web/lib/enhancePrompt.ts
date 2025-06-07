import OpenAI from "openai";
import { systemPrompt } from "./prompts";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function enhancePrompt(userPrompt: string, image_url: string="") {
  const prompt = z.object({
    prompt: z.string(),
  });
  
  const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  let content: OpenAI.Chat.Completions.ChatCompletionContentPart[];
  
  console.log(image_url);

  if (image_url) {
    content = [
      { type: "text", text: userPrompt },
      { type: "image_url", image_url: {url:image_url}},
    ];
  } else {
    content = [
      { type: "text", text: userPrompt },
    ];
  }

  const aiPrompt = await ai.chat.completions.create({
    model: "gpt-4o",
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