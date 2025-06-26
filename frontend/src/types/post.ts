import z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  body: z.string().min(1, "Texto obrigatório"),
});

export type PostFormData = z.infer<typeof postSchema>;

export interface Post {
  id: number;
  title: string;
  body: string;
}
