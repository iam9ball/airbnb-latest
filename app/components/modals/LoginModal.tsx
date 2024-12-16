"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input, { RegisterType } from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {Login} from "@/app/actions/login";
import { User } from "@prisma/client";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
 import { useLayoutEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { signIn } from "next-auth/react";
// import useUnverifiedUser from "@/app/hooks/useUnverifiedUser";






export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();
  const session = useSession();
  //  const unverifiedUser = useUnverifiedUser();
  
  

  useLayoutEffect(() => {
    if (session.status === "authenticated" && !currentUser.isUser) {
      const user = session.data?.user as User;
      currentUser.setUser(user);

      
    }
    if (
      session.status === "unauthenticated" &&
      currentUser.isUser 
    ) { 
      currentUser.deleteUser();

      
    }
  }, [session.status, currentUser, session.data]);
      

     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm<RegisterType>({
       resolver: zodResolver(LoginSchema),
       defaultValues: {
         email: "",
         password: "",
       },
     });

     const onSubmit: SubmitHandler<RegisterType> = (data) => {
       setIsLoading(true);

       Login(data).then((data) => {
         setIsLoading(false);

         if (data?.success) {
           window.location.reload();
           toast.success("Logged in successfully");
         }

         if (data?.error) {
           toast.error(data?.error);
         }
       });
     };
     

     const bodyContent = (
       <div className="flex flex-col gap-4">
         <Heading title="Welcome Back" subtitle="Login to your account" />
         
         <Input
           id="email" 
           label="Email"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
        
           
         />
         <Input
           id="password"
           label="Password"
           type="password"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
         />
       </div>
     );

     const footerContent = (
       <div className="flex flex-col gap-4 mt-3">
         <hr />
         <Button
           outline
           label="Continue with Google"
           icon={FcGoogle}
           onClick={ async () => {
             try {
             await signIn("google", {
              redirectTo: "/"
             })
            } catch (error) {
              toast.error("Failed to sign in with Google")
              console.log(error);
            }
           }}
         />
         <Button
           outline
           label="Continue with Github"
           icon={AiFillGithub}
           onClick={ async () => {
            try {
             await signIn("github", {
              redirectTo: "/"
             })
            } catch (error) {
              toast.error("Failed to sign in with Github")
              console.log(error);
            }
           }}
         />
         <div className="text-neutral-500 text-center mt-4 font-light">
           <div className=" justify-center flex flex-row items-center gap-2">
             <p>Dont have an account?</p>
             <div
               onClick={() => {
                 loginModal.onClose();
                 registerModal.onOpen();
               }}
               className=" text-neutral-800 cursor-pointer hover:underline"
             >
               Sign up
             </div>
           </div>
         </div>
       </div>
     );
     return (
       <Modal
         onOpen
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Login"
         actionLabel="Continue"
         onClose={loginModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
       />
     );
   }

