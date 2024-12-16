'use client'

import axios from "axios";
import {  useState } from "react";
import {AiFillGithub} from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"; 
import { SubmitHandler, useForm} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input, { RegisterType } from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import ProviderLogin from "@/app/actions/providerLogin";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useVerificationModal from "@/app/hooks/useVerificationModal";
import useUnverifiedUser from "@/app/hooks/useUnverifiedUser";
import { signIn } from "next-auth/react";



export default function RegisterModal() {
  const unverifiedUser = useUnverifiedUser();
    const registerModal = useRegisterModal();
    const verificationModal = useVerificationModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
     const fieldValues = {
       name: "",
       email: "",
       password: "",
       confirmPassword: "",
       code: "", // This is optional
     };


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterType>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        ...fieldValues,
        name: "",
        email: "",
        password: "",
      },
    });

    const onSubmit: SubmitHandler<RegisterType> = (data) => {
      setIsLoading(true);

      axios
        .post("/api/auth/register", data)
        .then((response) => {
          if (response?.status === 200) {
            verificationModal.onOpen();
            registerModal.onClose();
            unverifiedUser.setUser(response.data.email);
            console.log(response.data.email);
            toast.success("Verification email sent successfully");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error?.response) {
            if (error.response.status === 400) {
              toast.error("Email already in use");
            } else if (error?.status === 500) {
              toast.error("Something went wrong while registering");
            } else {
              toast.error("An unexpected error occurred");
            }
          } else if (error.request) {
            toast.error("Please check your internet connection");
          } else {
            toast.error("An error occured whule sending the request");
          }
        });
    };
          

      
        
    const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />
         <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
        <Input
          id="confirmPassword"
          label="Confirm password"
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
        {/* <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => {ProviderLogin("google").then((data)=> {
              if(data?.error){
                toast.error(data.error)
              }
             })
            }}
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => {
            ProviderLogin("github").then((data) => {
              if (data?.error) {
                toast.error(data.error);
              }
            });
          }}
        /> */}
        

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
            <p>Already have an account?</p>
            <div 
             onClick={()=>{registerModal.onClose(); loginModal.onOpen();}}
            className=" text-neutral-800 cursor-pointer hover:underline">Log in</div>
          </div>
        </div>
      </div>
    );
  return (
    <Modal
      onOpen
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
