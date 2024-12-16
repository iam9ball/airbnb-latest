
import { prisma } from "@/app/libs/prismadb";
import { sendVerificationEmail } from "@/app/providers/mail";
import bcrypt from "bcryptjs";
import UniqueToken from "@/app/libs/utils/Uuid";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
   const body = await request.json();
   const { email, name, password } = body;
   console.log(email);
   console.log(name);
   console.log(password);

   console.log("Received request for email:", email);
   const hashedPassword = await bcrypt.hash(password, 12);
   const token = UniqueToken();
   

   const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
   const tokenExpiryTime = new Date(Date.now() + 3 * 60 * 1000);



  try {
   
    // Check for existing verified user
    const existingVerifiedUser = await prisma.user.findUnique({
      where: { email },
    });

    // Check for existing unverified user
    const existingUnverifiedUser = await prisma.unverifiedUser.findUnique({
      where: { email },
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

   

    // Create unverified user and verification token
    

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, token);

    if (emailResponse?.status === 500) {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    } 

   else if (emailResponse?.status === 200) {

      if (existingUnverifiedUser) {
         console.log(hashedPassword);
        await prisma.unverifiedUser.update({
          where: { email },
          data: {
            name: name,
            hashedPassword: hashedPassword,
            expiresAt: expiresAt,
          },
        });

        await prisma.verificationToken.create({
          data: {
            email,
            token,
            tokenExpiryTime,
          },
        });
      }
      else if (!existingUnverifiedUser){
        console.log(hashedPassword);
        await prisma.unverifiedUser.create({
          data: {
            email,
            name,
            hashedPassword,
            expiresAt,
          },
        });
        await prisma.verificationToken.create({
          data: {
            email,
            token,
            tokenExpiryTime,
          },
        });
      }

      return NextResponse.json({
        message: "Verification email sent",
        email,
        status: 200,
      });

      }
       

  
  return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
      catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
































