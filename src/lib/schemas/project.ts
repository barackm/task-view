import * as z from "zod";

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});
