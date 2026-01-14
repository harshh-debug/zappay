import * as z from "zod"; 

export const updateUserSchema =z.object({
    fname:z.string(),
    lname:z.string(),
    password:z.string().length(6)
})
