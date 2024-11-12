import z from 'zod'
import { usernameValidation } from '@/schemas/signUpSchema'
import UserModel from '@/model/User'
import dbConnect from '@/lib/dbConnect'
import { NextResponse } from 'next/server'

const UsernameQuerySchema = z.object({
  username: usernameValidation
})
export async function GET (request: Request) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url) //get url path like localhost:300//.....
    const queryParams = {
      username: searchParams.get('username') //get username from routes
    }
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParams) //to parse data safely without throwing an error(convert json to string)
    // console.log("result" ,result)
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || []
      return NextResponse.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(', ')
              : 'invalid query params'
        },
        { status: 400 }
      )
    }
    const { username } = result.data //get username from result
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true
    })
    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username is taken'
        },
        { status: 400 }
      )
    } else {
      return NextResponse.json(
        {
          success: true,
          message: 'Username is unique'
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.log('Error checking Username', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error checking username'
      },
      {
        status: 500
      }
    )
  }
}
