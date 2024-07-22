import React, { createContext, useEffect, useState } from 'react';
import { getIP } from '../services/UserServices';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Sửa thành true để hiển thị "Loading..." khi ứng dụng khởi động
    const [IP, setIP] = useState('Detecting...');

    // useEffect(() => {
    //     const fetchIP = async () => {
    //         const userIP = await getIP();
    //         setIP(userIP);
    //     }
    //     fetchIP();
    // }, []);
    useEffect(() => {
        const fetchIP = async () => {
            try {
                const userIP = await getIP();
                if (userIP) {
                    setIP(userIP);
                }
            } catch (error) {
                toast.error('Vui lòng kiếm tra kết nối mạng')
            }
        };

        fetchIP(); 

        const intervalId = setInterval(() => {
            if (!IP) {
                fetchIP();
            }
        }, 5000); 
        console.log(1)

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [IP]); 

    const loginAuth = (utils) => {
        setUser(utils.user);
        setAccessToken(utils.accessToken);
        setRefreshToken(utils.refreshToken);
        localStorage.setItem('ltm', JSON.stringify(utils));
    }

    useEffect(() => {
        const foundUtils = localStorage.getItem('ltm');
        if (foundUtils) {
            const utils = JSON.parse(foundUtils);
            setUser(utils.user);
            setAccessToken(utils.accessToken);
            setRefreshToken(utils.refreshToken);
        }
        setIsLoading(false); // Đặt isLoading thành false sau khi kiểm tra localStorage
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginAuth, accessToken, refreshToken, IP }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
