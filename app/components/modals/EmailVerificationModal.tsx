'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import Heading from '../Heading';
import Input, { RegisterType } from "../Input";

import {
  VerifyEmailFieldValues,
  VerifyEmailSchema,
} from "../../../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import useVerificationModal from '@/app/hooks/useVerificationModal';
import axios from "axios";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useUnverifiedUser from "@/app/hooks/useUnverifiedUser";
import resendMail from '@/app/actions/resendMail';
 



export default function EmailVerificationModal() {
   const unverifiedUser = useUnverifiedUser();
       
    const [isLoading, setIsLoading] = useState(false);
    const verificationModal = useVerificationModal();
  const loginModal = useLoginModal();

  

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterType>({
      resolver: zodResolver(VerifyEmailSchema),
      defaultValues: {
        token: "",
        email: unverifiedUser.user,
      },
    });

     const onSubmit: SubmitHandler<
       VerifyEmailFieldValues
     > = (
       data: VerifyEmailFieldValues
     ) => {
       setIsLoading(true);
      // data.email = unverifiedUser.user;
    console.log(true);
    setIsLoading(true);
    axios
      .post("/api/auth/emailverification", {
        ...data,
        email: unverifiedUser.user,
        
      })
      .then((data) => {
        setIsLoading(false);
        if (data?.status === 200) {
           unverifiedUser.deleteUser();
          verificationModal.onClose();
          toast.success("Email verification successful");
          loginModal.onOpen();
        }
      })
      .catch((data) => {
        if (data?.status === 404 || data?.status === 401) {
          setIsLoading(false);
          toast.error("Invalid verification code");
        }
        if (data?.status === 500) {
          setIsLoading(false);
          toast.error("An error occured , please try later");
        }
      });
  };
     
     

      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Verify your email"
            subtitle="Please check your inbox for the verification code."
          />
          <Input
            id="token"
            label="Verify email"
            disabled={isLoading}
            errors={errors}
            required
            register={register}
          />
        </div>
      );

      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="justify-center flex flex-row items-center gap-2">
              <div className="">Click here to</div>
              <div className="text-neutral-800 cursor-pointer hover:underline"
                onClick={() => {
               resendMail(unverifiedUser.user).then((res) => {
                 if (res.success) {
                   toast.success("Verification code has been resent");
                 } else if (res.error) {
                   toast.error("Failed to resend verification code");
                 }
               })
            }}
            
              >
                Resend verification code
              </div>
            </div>
          </div>
        </div>
      )
     
    

  return (
    <Modal
      disabled={isLoading}
      isOpen={verificationModal.isOpen}
      title="Verify your email"
      actionLabel="Verify"
      onClose={verificationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}






  

  
 
 