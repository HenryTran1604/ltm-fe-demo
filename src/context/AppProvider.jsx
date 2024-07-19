// AppProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants';
import WaitingPage from '../pages/WaitingPage';
import { AuthContext } from './AuthProvider'; // Đảm bảo import đúng AuthProvider

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [startTime, setStartTime] = useState(null);
    const [isContestOpen, setIsContestOpen] = useState(false);
    const contestId = 1;

    const { user, accessToken } = useContext(AuthContext); // Sử dụng AuthContext

    useEffect(() => {
        const fetchContest = async () => {
            if (accessToken) {
                const response = await fetch(`${API_URL}/contests/detail/${contestId}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.ok)
                if (response.ok) {
                    const responseJson = await response.json();
                    if (responseJson.status === 200) {
                        setStartTime(new Date(responseJson.data.startTime));
                    }
                }
            }
        };
        fetchContest();
    }, [accessToken, contestId]);

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const difference = startTime - currentTime;

                if (difference <= 0) {
                    setIsContestOpen(true);
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startTime]);

    return (
        <AppContext.Provider value={{ isContestOpen, startTime }}>
            {!user || user?.role === 'ROLE_ADMIN' || isContestOpen ? children : <WaitingPage/>}
        </AppContext.Provider>
    );
};

export default AppProvider;
