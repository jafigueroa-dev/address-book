import { createContext, useContext } from "react";

type ContactContent = {
  currentContact: number;
  setCurrentContact: React.Dispatch<React.SetStateAction<number>>;
};

export const ContactContext = createContext<ContactContent>({
  currentContact: 0,
  setCurrentContact: () => {},
});

export const useContactContext = () => useContext(ContactContext);
