import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const LogArea = (props) => {
    const filterValue = props.filterValue;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/log', (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg.body]);
            });
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    return (
        <div className='mt-4 border-t-2 border-[#DDDDE3] border-solid h-[90%] p-4 overflow-y-scroll'>
            {messages.filter((value, _) => value.includes(filterValue)).map((message, index) => (
                <div key={index}>{message}</div>
            ))}
        </div>
    );
};

export default LogArea;