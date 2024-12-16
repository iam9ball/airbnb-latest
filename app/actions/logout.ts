"use server";
import { signOut } from "@/auth";
export default async function Logout() {
  try {
    await signOut({
        redirect: false
    });
    
    return { success: "Logged out" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}
