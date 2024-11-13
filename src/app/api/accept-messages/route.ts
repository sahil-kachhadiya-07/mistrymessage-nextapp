import dbConnect from '@/lib/dbConnect'
import { User, getServerSession } from 'next-auth' // User is used for type
import authOptions from '../auth/[...nextauth]/options'
import UserModel from '@/model/User'
import { NextResponse } from 'next/server' // Use NextResponse for API responses in Next.js

/********  POST request to update status ******/
export async function POST (request: Request) {
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'User not Authenticated'
      },
      { status: 401 }
    )
  }

  const userId = user._id
  const { acceptMessages } = await request.json()

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true } // new is used to return the new updated values
    )

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update user to accept messages'
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        updatedUser
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to update user to accept messages:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update user to accept messages'
      },
      { status: 500 }
    )
  }
}

/******  GET method to retrieve current status *******/
export async function GET () {
  await dbConnect()

  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'User not Authenticated'
      },
      { status: 401 }
    )
  }

  const userId = user._id
  console.log('userId', userId)
  try {
    const foundUser = await UserModel.findById(userId)

    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in getting message acceptance status:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error in getting message acceptance status'
      },
      { status: 500 }
    )
  }
}
