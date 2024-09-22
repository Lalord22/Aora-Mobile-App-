import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setIsLoggedIn(true);
          setUser(currentUser);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);

        // Handle missing scope error (user is not authenticated)
        if (error.message.includes("missing scope (account)")) {
          console.log("Guest user - not logged in.");
        }

        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false); // Stop loading after checking
      }
    }

    checkUserSession();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLoggedIn,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;