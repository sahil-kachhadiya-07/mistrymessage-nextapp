import z from 'zod'

export const usernameValidation = z
  .string()
  .min(3, 'username must be contains more than 3 character')
  .max(10, 'username must be contains less than 10 character')
  .regex(/^[a-zA-Z0-9_$]{3,16}$/, {
    message:
      'Username must be 3-16 characters long and contain only letters, numbers, underscores, or dollar signs.'
  })

  export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,"password must be at least 6 characters"),
  })