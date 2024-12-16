'use server'
import { signIn } from "@/auth";
import { FieldValues } from "react-hook-form";



export  async function Login( data: FieldValues ) {
  console.log(data)
  try {
    const result = await signIn("credentials", {
      ...data,
      redirect: false
    });
    if(result.error) {
      return { error: "Invalid Credentials" };  // Handle error if signIn fails
    }
    return { success: "Logged in" };
  } catch (error) {
    console.log(error)
     return { error: "Something went wrong!" }; 
  }
  
}




