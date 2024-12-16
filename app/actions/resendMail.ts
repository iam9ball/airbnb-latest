'use server'
import { sendVerificationEmail } from "@/app/providers/mail";
import UniqueToken from "@/app/libs/utils/Uuid";
import { prisma } from "@/app/libs/prismadb";



export default async function resendMail(email: string) {
    const token = UniqueToken();
  try {
  const res = await sendVerificationEmail(email, token);
  if (res.status == 200) {

     const user = await prisma.unverifiedUser.findUnique({
       where: { email },
       include: {
         verificationToken: {
           orderBy: {
             createdAt: "desc",
           },
           take: 1,
         },
       },
     });
     if (user) {
      if (user.verificationToken.length > 0) {
        const lastTokenId = user.verificationToken[0].id;
        await prisma.verificationToken.update({
          where: { id: lastTokenId },
          data: {
            token: token,
            tokenExpiryTime: new Date(Date.now() + 3 * 60 * 1000),
          },
        });
      }
      
     }
     
    return { success: "Verification email sent" }
  }
  return { error: "Failed to send verification email"}
} catch (error){
    console.error(error);
    return { error: "Something went wrong"}

}
}