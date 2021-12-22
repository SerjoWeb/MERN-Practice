import { useCallback } from "react";

/**
 * UI Messages
 * @returns 
 */
export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({ html: text });
        }
    }, []);
};