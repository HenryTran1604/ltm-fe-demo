import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL, SOCKET_URL } from '../../constants';
import UserExercises from './UserExercises';

const ScoreBoard = () => {
    const [scoreBoards, setScoreBoards] = useState([])
    const [exercises, setExercises] = useState([])
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch(`${API_URL}/scoreboard`);
            const data = await response.json();
            console.log(data.data)
            setScoreBoards(data.data.sort((a, b) => b.score - a.score))
        }
        fetchAllUsers();
        const socket = () => {
            return new SockJS(SOCKET_URL);
        }
        const client = Stomp.over(socket)

        client.connect({}, () => {
            client.subscribe('/topic/scoreboard', (msg) => {
                const sortedScoreBoards = JSON.parse(msg.body).sort((a, b) => b.score - a.score)
                setScoreBoards(sortedScoreBoards)
                console.log(sortedScoreBoards)
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

    useEffect(() => {
        const fetchAllExercises = async () => {
            const response = await fetch(`${API_URL}/exercises/all`);
            const data = await response.json();
            // console.log(data)
            setExercises(data.data.items)
        }
        fetchAllExercises();
    }, [])

    return (
        <div className='bg-white rounded-md p-4'>
            <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                <thead className='border-b-2 border-solid border-black'>
                    <tr>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500 ">Mã sinh viên</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Score</th>
                        {
                            exercises.map((_, id) =>
                                <th key={id} className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"> {id}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        scoreBoards.map((scoreBoard) => (
                            <UserExercises key={scoreBoard.id} scoreBoard={scoreBoard} exQuantity={exercises.length} />
                        ))
                    }
                </tbody>

            </table>
        </div>
    );
};

export default ScoreBoard;