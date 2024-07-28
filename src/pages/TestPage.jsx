import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const TestPage = () => {
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [privateStompClient, setPrivateStompClient] = useState(null); // Thêm biến state cho client thứ hai
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Kết nối WebSocket cho kênh công khai
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/log', (msg) => {
                console.log(msg.body);
                setMessages((prevMessages) => [...prevMessages, msg.body]);
            });
        });

        setStompClient(client);

        // Kết nối WebSocket cho kênh riêng
        const privateSocket = new SockJS('http://localhost:8080/ws');
        const privateClient = Stomp.over(privateSocket);

        privateClient.connect({ }, () => {
            privateClient.subscribe('user/queue/practice', (msg) => {
                console.log(msg.body);
                setMessages((prevMessages) => [...prevMessages, msg.body]);
            });
        });

        setPrivateStompClient(privateClient);

        // Cleanup
        return () => {
            if (client) {
                client.disconnect();
            }
            if (privateClient) {
                privateClient.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            stompClient.send('/app/log', {}, message);
            setMessage('');
        }
    };

    const sendPrivateMessage = () => { // Sửa hàm sendMessage2 thành sendPrivateMessage
        if (privateStompClient) {
            privateStompClient.send('/app/practice', {}, message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>WebSocket Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={sendPrivateMessage}>Send Private</button> {/* Thêm nút gửi tin nhắn riêng */}
        </div>
    );
};

export default TestPage;
