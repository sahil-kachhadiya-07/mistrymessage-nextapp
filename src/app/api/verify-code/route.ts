import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
    
export async function Post (request: Request) {
  await dbConnect()
  const response = Response as any
  try {
    const { username, code } = await request.json() //get values from user
    const decodedUsername = decodeURIComponent(username) //Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
    const user = await UserModel.findOne({ username: decodedUsername })
    if (!user) {
      return response.json(
        {
          success: false,
          message: 'User not found'
        },
        { statusCode: 500 }
      )
    }
    const isCodeValid = user.verifyCode === code //check verification code and compare with db user code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date() //compare with current date

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true
      await user.save() //it is compulsory for save in database
      return response.json(
        {
          success: true,
          message: 'Account verified'
        },
        { statusCode: 200 }
      )
    } else if (!isCodeNotExpired) {
      return response.json(
        {
          success: false,
          message: 'Verification Code has expired please sign in again'
        },
        { statusCode: 400 }
      )
    } else {
      return response.json(
        {
          success: false,
          message: 'Incorrect Verification Code'
        },
        { statusCode: 400 }
      )
    }
  } catch (error) {
    console.error('Error checking for verify code', error)
    return response.json(
      {
        success: false,
        message: 'Error checking for verify code'
      },
      { statusCode: 500 }
    )
  }
}
