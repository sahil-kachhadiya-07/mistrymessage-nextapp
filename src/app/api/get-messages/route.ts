import dbConnect from '@/lib/dbConnect'
import { User, getServerSession } from 'next-auth'
import authOptions from '../auth/[...nextauth]/options'
import mongoose from 'mongoose'
import UserModel from '@/model/User'

export async function GET (request: Request) {
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

  //this is only needs when doing aggregation
  //if id is a string or any form then this mongoose method converts into mongoose objectId
  const userId = new mongoose.Types.ObjectId(user._id)

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: '$messages' }, //"$...." is syntax was add mongodb internal parameter
      // unwind is used to Deconstructs an array field from the input documents to
      //  output a document for each element. Each output document is the
      //  input document with the value of the array field replaced by the element.
      { $sort: { 'messages.createdAt': -1 } }, //-1 is for Sort descending.
      { $group: { _id: '$_id', message: { $push: '$messages' } } } //single id for all messages and messages was sorted
    ])
    if (!user || user.length === 0) {
      response.json(
        {
          success: false,
          message: 'User does not exist'
        },
        { statusCode: 401 }
      )
    }
    response.json(
      {
        success: true,
        messages: user[0].messages //aggregation pipelines returns array
      },
      { statusCode: 200 }
    )
  } catch (error) {}
}
