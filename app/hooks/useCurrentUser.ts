import {User} from "@prisma/client";
import {create} from "zustand";
import { persist } from "zustand/middleware";


type State = {
    user?: User | null | undefined ;
    isUser?: boolean;
}

type Action = {
    setUser: (user: User | null | undefined) => void;
    deleteUser: () => void;
}

const useCurrentUser = create<State & Action>()(
  persist(
    (set) => ({
    user: undefined,
    isUser: false,

    setUser: (user) => {
      set({ user: user, isUser: true });
    },

    deleteUser: () => {
      set({ user: undefined, isUser: false });
    },
  }),{
    name: "user-storage"
  }
)
);

export default useCurrentUser;