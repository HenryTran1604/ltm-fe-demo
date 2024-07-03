import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    // const register = () => {
        
    // }

    useEffect(() => {
        const foundUser = localStorage.getItem('ltm');
        if(foundUser) {
            setUser(JSON.parse(foundUser))
            setIsLoading(false)
        } else {
            setIsLoading(false)
            navigate('/register')
        }

    }, [navigate])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
