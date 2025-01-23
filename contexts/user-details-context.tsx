import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserDetails {
  email: string;
  name: string;
  picture: string;
  _id: string;
}

interface UserDetailsContextType {
  userDetails: UserDetails | null;
  setUserDetails: (userDetails: UserDetails | null) => void;
}

export const UserDetailsContext = createContext<UserDetailsContextType>({
  userDetails: null,
  setUserDetails: () => {},
});

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
      console.log("storedUserDetails", storedUserDetails);
      if (storedUserDetails) {
        setUserDetails(storedUserDetails);
      } else {
        setUserDetails(null);
      }
    }
  }, []);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  return useContext(UserDetailsContext);
};
