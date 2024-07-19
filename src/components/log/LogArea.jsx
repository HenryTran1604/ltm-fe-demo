import React, { useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL, SOCKET_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';

const LogArea = (props) => {
    const filterValue = props.filterValue;

    const [messages, setMessages] = useState([]);
    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        const fetchHistoryLog = async () => {
            const response = await fetch(`${API_URL}/client-logs`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if(response.ok) {
                const data = await response.json();
                setMessages(data.data.items.reverse());
            }
            
        };

        fetchHistoryLog();


        const client = Stomp.over(() => new SockJS(SOCKET_URL));

        client.connect({}, () => {
            client.subscribe('/topic/log', (msg) => {
                const newMessage = JSON.parse(msg.body)
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
    }, [accessToken]);

    return (
        <div className='mt-4 border-t-2 border-[#DDDDE3] border-solid h-[90%] p-4 overflow-y-scroll'>
            {messages.filter((value, _) => value.content?.includes(filterValue)).map((message, index) => (
                <div key={index} className='text-ellipsis overflow-hidden whitespace-nowrap flex gap-x-10'>
                    <div className='w-44'>{message.createdAt}</div>
                    <div className='ml-4'>{message.content}</div>
                </div>
            ))}
        </div>
    );
};

export default LogArea;