import * as z from "zod"

export const SignupValidation = z.object({
    name:z.string().min(2,{message:"Too short"}),
    username: z.string().min(2,{message:"Too short"}),
    email:z.string().email(),
    password:z.string().min(8,{message:"Password must be of 8 characters"}),

    
  })

  export const SigninValidation = z.object({
    
    email:z.string().email(),
    password:z.string().min(8,{message:"Password must be of 8 characters"}),

    
  })

  export const PostValidation = z.object({
    caption: z.string(),
    file: z.custom<File[]>(),
    location: z.string(),
    tags: z.string(),
  });

  export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });