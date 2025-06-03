import { createContext, useState } from "react";

export const IDContext = createContext({});

export function IDContextProvider({ children }) {
    const [ID, setID] = useState(window.sessionStorage.getItem('ID') || '');

    return (
        <IDContext.Provider value={{ ID, setID }}>
            {children}
        </IDContext.Provider>
    );
}