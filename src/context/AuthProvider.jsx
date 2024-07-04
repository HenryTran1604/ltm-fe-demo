import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIP } from '../services/UserServices';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [IP, setIP] = useState('Detecting...')
    
    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
        }
        fetchIP();
    }, [])
    
    const navigate = useNavigate()
    // const register = () => {
        
    // }

    useEffect(() => {
        const foundUser = localStorage.getItem('ltm');
        if(foundUser) {
            const jsonUser = JSON.parse(foundUser)
            if(jsonUser.ip !== IP) {
                toast.error('Mã sinh viên và IP không trùng khớp!', {
                    autoClose: 2000
                })
                localStorage.removeItem('ltm')
                navigate('/register')
            }
            else {
                setUser(jsonUser)
            }
            setIsLoading(false)
        } else {
            setIsLoading(false)
            navigate('/register')
        }

    }, [navigate, IP])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
