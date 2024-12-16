

// export async function verifyEmail(verificationCode: string) {
//   const tempUser = await prisma.tempUser.findFirst({
//     where: {
//       verificationCode,
//       expiresAt: {
//         gte: new Date(),
//       },
//     },
//   });

//   if (!tempUser) {
//     throw new Error("Invalid or expired verification code");
//   }

//   const { email, name, hashedPassword } = tempUser;

//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       hashedPassword,
//       emailVerified: true,
//     },
//   });

//   await prisma.tempUser.delete({
//     where: { id: tempUser.id },
//   });

//   return user;
// }

// export async function cleanupExpiredTempUsers() {
//   await prisma.tempUser.deleteMany({
//     where: {
//       expiresAt: {
//         lt: new Date(),
//       },
//     },
//   });
// }

// // Example usage in an API route (e.g., pages/api/auth/register.ts)
// import type { NextApiRequest, NextApiResponse } from "next";
// import { createTempUser } from "../../../services/userService";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { email, name, password } = req.body;
//       const tempUser = await createTempUser(email, name, password);
//       res
//         .status(200)
//         .json({ message: "Verification email sent. Please check your inbox." });
//     } catch (error) {
//       res.status(400).json({ error: "Registration failed" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Example usage in an API route (e.g., pages/api/auth/verify.ts)


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { verificationCode } = req.body;
//       const user = await verifyEmail(verificationCode);
//       res.status(200).json({ message: "Email verified successfully", user });
//     } catch (error) {
//       res.status(400).json({ error: "Verification failed" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
