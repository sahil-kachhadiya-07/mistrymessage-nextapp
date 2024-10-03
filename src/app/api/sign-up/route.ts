import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'

import React from 'react'

export const POST = async (request: Request) => {
  await dbConnect()
  try {
    const { username, email, password } = await request.json()
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true
    })

    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: 'Username is Already taken' },
        { status: 400 }
      )
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email
    })

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    if (existingUserVerifiedByEmail) {
    if (existingUserVerifiedByEmail.isVerified) {
      return Response.json(
        {
          success: false,
          message:"user is already exist"
        },
        {
          statusCode: 400
        }
      )
    }else{
      const hashedPassword = await bcrypt.hash(password, 10)
      existingUserVerifiedByEmail.password = hashedPassword;
      existingUserVerifiedByEmail.verifyCode = verifyCode;
      existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserVerifiedByEmail.save();
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

    if (!sendEmailResponse.success) {
      return Response.json(
        {
          success: false,
          message: sendEmailResponse.message
        },
        {
          statusCode: 500
        }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'user registered successfully , please verify your email'
      },
      {
        statusCode: 201
      }
    )
  } catch (error) {
    console.error('error registering user', error)
    return Response.json(
      {
        success: false,
        message: 'error registering user'
      },
      {
        statusCode: 200
      }
    )
  }
}
