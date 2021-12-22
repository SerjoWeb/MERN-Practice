import { createContext } from "react";

export const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    token: null,
    userId: null,
    isAuth: false
});