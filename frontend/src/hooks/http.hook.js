import { useCallback, useState } from "react";

/**
 * Http request hook
 * @returns 
 */
export const useHttp = () => {
    /**
     * Init states
     */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Init request inside useCallback
     * This allows us to isolate resource intensive functions so that they will not automatically run on every render.
     */
    const request = useCallback(async (url, method = "GET", body = "null", headers = {}) => {
        setLoading(true);
        
        try {
            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Server Http error");
            }

            setLoading(false);

            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);

            throw error;
        }
    }, []);

    const  clearError = useCallback(() =>  setError(null), []);

    return {
        loading,
        request,
        error,
        clearError
    };
};