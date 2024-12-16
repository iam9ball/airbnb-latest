'use server'
import { NextResponse } from "next/server";
import { Resend } from "resend";


export const sendVerificationEmail = async (email: string, code: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const verificationToken = code;
    
try{
   await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Copy and paste this code to verify your email address:${' '} <strong>${verificationToken}</strong></p>`,
  })
    return NextResponse.json({status: 200})
  
} catch(error){
   console.error(error);

   return NextResponse.json({status: 500})
}

}
 


