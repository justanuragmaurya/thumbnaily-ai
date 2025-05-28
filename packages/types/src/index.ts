import { z } from "zod/v4"

export const inputType = z.object({
  prompt: z.string(),
  reference: z.string().optional(),
  creatorID: z.string(),
});

