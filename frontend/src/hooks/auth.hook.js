import { useState, useCallback, useEffect } from "react";

/**
 * Client Auth UI Functionality
 */
export const useAuth = () => {
    /**
     * Init States
     */
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    /**
     * Local storage
     */
    const storage = 'UserData';

    /**
     * Function Login
     */
    const login = useCallback((id, jwtToken) => {
        setUserId(id);
        setToken(jwtToken);

        localStorage.setItem(storage, JSON.stringify({
            userId: id,
            token: jwtToken
        }));
    }, []);

    /**
     * Function Logout
     */
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storage);
    }, []);

    /**
     * Check if data = login
     */
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storage));

        if (data && data.token) {
            login(data.userId, data.token);
        }
    }, [login]);

    return {
        login,
        logout,
        token,
        userId
    };
};