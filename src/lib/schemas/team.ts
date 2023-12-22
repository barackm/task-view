import * as z from "zod";

export const teamSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  make_default: z.boolean().optional(),
});
