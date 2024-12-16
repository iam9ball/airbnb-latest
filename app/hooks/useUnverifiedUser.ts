import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: string  
  isUser?: boolean;
};

type Action = {
  setUser: (user: string) => void;
  deleteUser: () => void;
};

const useUnverifiedUser = create<State & Action>()(
  persist(
    (set) => ({
      user: "",
      isUser: false,

      setUser: (user) => {
        set({ user: user, isUser: true });
      },

      deleteUser: () => {
        set({ user: "", isUser: false });
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUnverifiedUser;
