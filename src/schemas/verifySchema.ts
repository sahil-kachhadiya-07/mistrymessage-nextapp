import z from 'zod'

export const signInSchema = z.object({
  code: z.string().length(6,"verification code must be 6 character"),
})
