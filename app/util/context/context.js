import React, { createContext, useContext } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);
// export const useAuth = () => {
//     return useContext(AuthContext);
//   }