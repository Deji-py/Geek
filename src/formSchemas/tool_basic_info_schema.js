import { z } from "zod";

export const tool_basic_information_Schema = z.object({
  toolname: z.string().min(1, {
    message: "Tool name must be at least one character long",
  }),

  websiteUrl: z.string().url({
    message: "Invalid Website Url",
  }),

  oneliner: z
    .string()
    .min(5, {
      message: "One liner must be at least 5 characters long",
    })
    .max(70, {
      message: "One liner must be at most 70 characters long",
    }),
});
