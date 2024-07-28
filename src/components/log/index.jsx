import React, { useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL, SOCKET_URL } from '../../constants/endpoints';
import SearchBar from './SearchBar';
import LogArea from './LogArea';
const Log = () => {
    const [filterValue, setFilterValue] = useState('')
    const [messages, setMessages] = useState([]);
    const { user, accessToken } = useContext(AuthContext)

    useEffect(() => {
        const fetchHistoryLog = async () => {
            try {
                const response = await fetch(`${API_URL}/practice/logs?userId=${user.id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.data.items.reverse());
                }
            } catch(error) {
                // handle
            }
            
        };

        fetchHistoryLog();


        const client = Stomp.over(() => new SockJS(SOCKET_URL));

        client.connect({}, () => {
            client.subscribe(`/topic/practice/${user.username}/logs`, (msg) => {
                const newMessage = JSON.parse(msg.body)
                console.log(newMessage)
                setMessages((prevMessages) => [newMessage, ...prevMessages]);
            });
        }, (err) => {
            console.log(err)
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [accessToken, user.id, user.username]);


    return (
        <div className='bg-white rounded-lg p-4 h-full shadow-[0px_2px_10px_#00000014] overflow-hidden'>
            <SearchBar filterValue={filterValue} setFilterValue={setFilterValue} />
            <LogArea filterValue={filterValue} messages={messages} />
        </div>

    );
};

export default Log;