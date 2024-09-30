import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails";
import { ApiResponse } from "@/types/ApiResponseType";
import React from 'react'

export const sendVerificationEmail = async (
    email:string,
    username:string,
    verifyCode:string,
):Promise<ApiResponse> => {
   
    try{
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'mystery message | Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:'failed to send verification email successfully'}
    }
    catch(emailError){
        console.error("error sending verification email",emailError)
        return {success:false,message:'failed to send verification email'}
    }
}
