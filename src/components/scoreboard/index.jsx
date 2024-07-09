import React, { useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL, SOCKET_URL } from '../../constants';

const ScoreBoard = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            console.log(data)
            setUsers(data)
        }
        fetchAllUsers();
        const client = Stomp.over(() => new SockJS(SOCKET_URL))

        client.connect({}, () => {
            client.subscribe('/topic/scoreboard', (msg) => {
                const submittedUser = JSON.parse(msg.body);
                console.log(submittedUser)
                setUsers((prevUsers) => {
                    const oldUserIndex = prevUsers.findIndex(obj => obj.id === submittedUser.id);
                    if (oldUserIndex !== -1) {
                        // Update the existing user
                        const updatedUsers = [...prevUsers];
                        updatedUsers[oldUserIndex] = submittedUser;
                        return updatedUsers;
                    } else {
                        // Add the new user
                        return [...prevUsers, submittedUser];
                    }
                });
            });
        }, (err) => {
            console.log(err)
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [])
    const isThisUser = (cmpUser) => {
        return user.id === cmpUser.id && user.ip === cmpUser.ip;
    }
    return (
        <div className='bg-white rounded-md p-4'>
            <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                <thead className='border-b-2 border-solid border-black'>
                    <tr>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500 ">Mã sinh viên</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Score</th>
                        {
                            Array.from({ length: 4 }).map((_, i) =>
                                <th key={i} className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"> {i}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((currentUser, id) => (
                            <tr key={id} className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm ${isThisUser(currentUser) && `!bg-[#99d8f7]`}`}>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{id + 1}</td>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                                    <div className='text-lg'>{currentUser.id.toUpperCase()}</div>
                                    <div className='text-sm text-[dimgrey]'>{currentUser.ip}</div>
                                </td>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{currentUser.score}</td>
                                {
                                    currentUser.exercises?.map((exercise, index) => (
                                        <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>
                                            <div className={`${exercise.tryCount > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac ? `!bg-[#60e760]` : ''} min-h-12 max-w-16 m-auto`}>
                                                {exercise.tryCount !== 0 && `${exercise.tryCount} Try`}
                                            </div>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;