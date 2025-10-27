import z from "zod";
export const signupInput = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(4)
});
export const signinInput = z.object({
    email: z.email(),
    password: z.string().min(4)
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
});
//# sourceMappingURL=index.js.map