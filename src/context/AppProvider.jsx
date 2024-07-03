import React, { createContext, useEffect, useState } from 'react';
import { getIP } from '../services/UserServices';

export const AppContext = createContext()

const AppProvider = ({children}) => {
    const [IP, setIP] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
            setIsLoading(false);
        }
        fetchIP();
    }, [])
    return (
        <AppContext.Provider value={ {IP} }>
            {isLoading ? <div>Loading...</div> : children}
        </AppContext.Provider>
    );
};

export default AppProvider;