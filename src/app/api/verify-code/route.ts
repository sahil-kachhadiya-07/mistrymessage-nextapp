import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { NextResponse } from 'next/server'
      
export async function POST (request: Request) {
  await dbConnect()
  try {
    const { username, code } = await request.json() //get values from user
    const decodedUsername = decodeURIComponent(username) //Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
    const user = await UserModel.findOne({ username: decodedUsername })
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 500 }
      )
    }
    const isCodeValid = user.verifyCode === code //check verification code and compare with db user code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date() //compare with current date

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true
      await user.save() //it is compulsory for save in database
      return NextResponse.json(
        {
          success: true,
          message: 'Account verified'
        },
        { status: 200 }
      )
    } else if (!isCodeNotExpired) {
      return NextResponse.json(
        {
          success: false,
          message: 'Verification Code has expired please sign in again'
        },
        { status: 400 }
      )
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Incorrect Verification Code'
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error checking for verify code', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error checking for verify code'
      },
      { status: 500 }
    )
  }
}
