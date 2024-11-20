import dbConnect from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import authOptions from "../../auth/[...nextauth]/options"
import { NextResponse } from "next/server"
import UserModel from "@/model/User"

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params; // Destructure username from params
  console.log('Requested username:', username);

  await dbConnect();

  // Fetch session from next-auth
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    console.log('No active session or user not found');
    return NextResponse.json(
      { success: false, message: 'User not authenticated' },
      { status: 401 }
    );
  }
  
  console.log('Authenticated user:', session.user);

  try {
    // Fetch the user from the database based on the username
    const user = await UserModel.findOne({ username ,  isVerified: true});
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return the user data if found
    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error while searching for user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
