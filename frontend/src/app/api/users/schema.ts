import { z } from "zod";
// min is length for strings
const schema = z.object({
  name: z.string().min(3),
  email: z.string().email().optional(),
  age: z.number().min(18).max(120).optional(),
});
export default schema;
