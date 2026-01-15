import * as z from "zod"; 

export const updateUserSchema =z.object({
    fname:z.string().optional(),
    lname:z.string().optional(),
    password:z.string().length(6).optional()
})
