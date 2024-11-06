import dbConnect from '@/lib/dbConnect'
import { User, getServerSession } from 'next-auth'
import authOptions from '../../auth/[...nextauth]/options'
import UserModel from '@/model/User'

export async function DELETE (
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const messageId = params.messageId
  await dbConnect()
  const response = Response as any

  const session = await getServerSession(authOptions)

  const user: User = session?.user as User

  if (!session || !session.user) {
    return response.json(
      { success: false, message: 'User not authenticated' },
      {
        status: 401
      }
    )
  }
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
      {
        $pull: { messages: { _id: messageId } }
      }
    )
    if (updateResult?.modifiedCount == 0) {
      return response.json(
        { success: false, message: 'Message not found or already deleted' },
        {
          status: 404
        }
      )
    }
    return response.json(
      { success: false, message: 'Message  Deleted' },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log('error in delete message route', error)
    return response.json(
      { success: false, message: 'Error  deleting message' },
      {
        status: 500
      }
    )
  }
}
