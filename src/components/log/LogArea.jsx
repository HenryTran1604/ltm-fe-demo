import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL, SOCKET_URL } from '../../constants';

const LogArea = (props) => {
    const filterValue = props.filterValue;

    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const fetchHistoryLog = async () => {
            try {
                const response = await fetch(`${API_URL}/client-logs`);
                const data = await response.json();
                setMessages(data.data.reverse());
            } catch (err) {

            }
        };

        fetchHistoryLog();


        const client = Stomp.over(() => new SockJS(SOCKET_URL));

        client.connect({}, () => {
            client.subscribe('/topic/log', (msg) => {
                // console.log(msg.body)
                setMessages((prevMessages) => [msg.body, ...prevMessages]);
            });
        }, (err) => {
            console.log(err)
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
                <div key={index} className='text-ellipsis overflow-hidden whitespace-nowrap'>{message}</div>
            ))}
        </div>
    );
};

export default LogArea;