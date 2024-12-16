"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import Logout from "@/app/actions/logout";
import toast from "react-hot-toast";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";







export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const currentUser = useCurrentUser();
  const rentModal = useRentModal();
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  
 const onRent = useCallback(() => {
  console.log(currentUser.user)
   if (!currentUser.isUser) {
     return loginModal.onOpen();
   }
   rentModal.onOpen();
 }, [currentUser, loginModal, rentModal]);
   
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser.isUser ? (
              <>
                {console.log(currentUser.isUser)}
                <MenuItem onClick={() => {router.push("/trips")}} label="My trips" />
                <MenuItem onClick={() => {router.push("/favorites");}} label="My favorites" />
                <MenuItem onClick={() => {router.push("/reservations")}} label="My reservations" />
                <MenuItem onClick={() => {router.push("/properties");}} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    Logout().then((data) => {
                      if (data.success) {
                        toggleOpen();
                        window.location.reload();
                        toast.success("Logged out successfully");
                      }

                      if (data.error) {
                        toast.error(data.error);
                      }
                    });
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                {console.log(currentUser.isUser)}
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
