import { z } from "zod";

/** Schema for the startup idea input — matches frontend's StartupIdea type */
export const StartupIdeaSchema = z.object({
  idea: z
    .string()
    .min(5, "Idea must be at least 5 characters")
    .max(2000, "Idea must be under 2000 characters"),
  industry: z.string().optional(),
  targetMarket: z.string().optional(),
});
