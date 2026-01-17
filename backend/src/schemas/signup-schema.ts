import * as z from "zod"; 

export const signupSchema =z.object({
    email:z.email(),
    fname:z.string(),
    lname:z.string(),
    password:z.string().min(6)
})
