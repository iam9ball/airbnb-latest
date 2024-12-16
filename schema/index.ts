import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFieldValues = z.infer<typeof LoginSchema>;


export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
}).refine((data) => 
    data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  
  
})
   
export type RegisterFieldValues = z.infer<typeof RegisterSchema>;

export const VerifyEmailSchema = z
  .object({
    token: z.string().min(6, "6 characters required").max(6, "6 characters required"),
  })

  
export type VerifyEmailFieldValues = z.infer<typeof VerifyEmailSchema>;
