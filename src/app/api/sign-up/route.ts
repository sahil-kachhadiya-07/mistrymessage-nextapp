import sendVerificationEmail from '@/helpers/sendVerificationEmail'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export const POST = async (request: Request) => {
  await dbConnect()

  try {
    const { username, email, password } = await request.json()
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true
    })

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        { success: false, message: 'Username is Already taken' },
        { status: 400 }
      )
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email
    })

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('verifyCode ', verifyCode)

    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: 'user is already exist'
          },
          {
            status: 400
          }
        )
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingUserVerifiedByEmail.password = hashedPassword
        existingUserVerifiedByEmail.verifyCode = verifyCode
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000
        )
        await existingUserVerifiedByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: []
      })
      await newUser.save()
    }

    //send verification email
    const sendEmailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    )
    console.log('sendEmailResponse', sendEmailResponse)

    if (!sendEmailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: sendEmailResponse.message
        },
        {
          status: 500
        }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'user registered successfully , please verify your email'
      },
      {
        status: 201
      }
    )
  } catch (error) {
    console.error('error registering user', error)
    return NextResponse.json(
      {
        success: false,
        message: 'error registering user'
      },
      {
        status: 200
      }
    )
  }
}
