import dbConnect from '@/lib/dbConnect'
import { User, getServerSession } from 'next-auth' //User is used for type
import authOptions from '../auth/[...nextauth]/options'
import UserModel from '@/model/User'

/********  post request is used to update status ******/
export async function POST (request: Request) {
  await dbConnect()
  const response = Response as any

  //getServerSession is used to retrieve the session object from the server-side.
  const session = await getServerSession(authOptions)

  const user: User = session?.user as User

  if (!session || !session.user) {
    return response.json(
      {
        success: false,
        message: 'User not found Authenticated'
      },
      { statusCode: 401 }
    )
  }

  const userId = user._id
  const { acceptMessages } = await response.json()

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages
      },
      { new: true }
    ) //new is used to return new updated values

    if (!updatedUser) {
      return response.json(
        {
          success: false,
          message: 'faild to update user to accept messages'
        },
        { statusCode: 401 }
      )
    }
    return response.json(
      {
        success: true,
        message: 'message acceptance status updated successfully',
        updatedUser
      },
      { statusCode: 200 }
    )
  } catch (error) {
    console.log('failed to update user to accept messages')
    return response.json(
      {
        success: false,
        message: 'failed to update user to accept messages'
      },
      { statusCode: 500 }
    )
  }
}


/******  get method is used to get current status *******/
export async function GET (request: Request) {
  await dbConnect()
  const response = Response as any

  //getServerSession is used to retrieve the session object from the server-side.
  const session = await getServerSession(authOptions)

  const user: User = session?.user as User

  if (!session || !session.user) {
    return response.json(
      {
        success: false,
        message: 'User not found Authenticated'
      },
      { statusCode: 401 }
    )
  }

  const userId = user._id
  try {
    const foundUser = await UserModel.findById(userId)

    if (!foundUser) {
      return response.json(
        {
          success: false,
          message: 'User not found'
        },
        { statusCode: 404 }
      )
    }

    return response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage
      },
      { statusCode: 200 }
    )
  } catch (error) {
    console.log('Error is getting message acceptance status')
    return response.json(
      {
        success: false,
        message: 'Error is getting message acceptance status'
      },
      { statusCode: 500 }
    )
  }
}
