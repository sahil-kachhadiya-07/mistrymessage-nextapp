import dbConnect from '@/lib/dbConnect'
import UserModel, { Message } from '@/model/User'

export async function POST (request: Request) {
  await dbConnect()
  const response = Response as any

  const { username, content } = await request.json()

  try {
    const user = await UserModel.findOne({ username })
    if (!user) {
      return response.json(
        { success: false, message: 'User not found' },
        {
          status: 404
        }
      )
    }
    //is user not accepting the message
    if (!user.isAcceptingMessage) {
      return response.json(
        { success: false, message: 'User is not accepting the messages' },
        {
          status: 403
        }
      )
    }

    //if user accepting the message
    const newMessage = { content, createdAt: new Date() }
    user.messages.push(newMessage as Message)
    await user.save()

    return response.json(
      { success: true, message: 'Message send successfully' },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log('Error adding messages', error)
    return response.json(
      { success: false, message: 'Internal server Error' },
      {
        statusCode: 500
      }
    )
  }
}
