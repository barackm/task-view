import * as z from "zod";
import { PriorityType } from "../types/priority";

export const taskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  priority_id: z.nativeEnum(PriorityType),
});
