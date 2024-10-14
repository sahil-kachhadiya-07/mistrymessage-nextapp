import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import UserModel from "@/model/User";

var bcrypt = require('bcryptjs');
import dbConnect from "@/lib/dbConnect";

export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id:"credentials",
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
              },

              async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try{
                  const user =  await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                   
                    if(!user)
                    {
                        throw new Error("user not found")
                    }
                    if(!user.isVerified)
                    {
                        throw new Error("user not verified")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect)
                    {
                        return user
                    }else{
                        throw new Error("incorrect password")
                    }
                }catch(err:any)
                {
                    throw new Error(err)
                }
              }
        })
    ],
    callbacks:{
        async session({ session, user, token }) {
            return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
            return token
          }
    },
    pages:{signIn:'/sign-in'},
    session:{strategy:"jwt"},
    secret:process.env.NEXTAUTH_SECRET
}
