import React, { createContext, useEffect, useState } from 'react';
import { getIP } from '../services/UserServices';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Sửa thành true để hiển thị "Loading..." khi ứng dụng khởi động
    const [IP, setIP] = useState('Detecting...');

    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
        }
        fetchIP();
    }, []);

    const loginAuth = (utils) => {
        setUser(utils.userDto);
        setAccessToken(utils.accessToken);
        setRefreshToken(utils.refreshToken);
        localStorage.setItem('ltm', JSON.stringify(utils));
    }

    useEffect(() => {
        const foundUtils = localStorage.getItem('ltm');
        if (foundUtils) {
            const utils = JSON.parse(foundUtils);
            setUser(utils.userDto);
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
