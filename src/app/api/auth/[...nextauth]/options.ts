import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import UserModel from '@/model/User'
import bcrypt from 'bcryptjs';

import dbConnect from '@/lib/dbConnect'

 const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
 
      async authorize (credentials: any): Promise<any> {
        await dbConnect()
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier }
            ]
          })  
          if (!user) {
            throw new Error('user not found')
          }
          if (!user.isVerified) {
            throw new Error('user not verified')
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          )
          if (isPasswordCorrect) {
            return user
          } else {
            throw new Error('incorrect password')
          }
        } catch (err: any) {
          throw new Error(err)
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        // we can also set this information in session
        token._id = user._id?.toString()
        token.isVerified = user.isVerified
        token.isAcceptingMessages = user.isAcceptingMessages
        token.username = user.username
      }
      return token
    },
    async session ({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString()
        session.user.isVerified = token.isVerified
        session.user.isAcceptingMessages = token.isAcceptingMessages
        session.user.username = token.username
      }
      return session
    }
  },
  pages: { signIn: '/sign-in' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions