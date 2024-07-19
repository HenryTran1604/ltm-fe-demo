import React, { useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL, SOCKET_URL } from '../../constants';
import UserExercises from './UserExercises';
import { AuthContext } from '../../context/AuthProvider';

const ScoreBoard = () => {
    const [scoreBoard, setScoreBoard] = useState({})
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/scoreboard?contestId=1&userId=${user.id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data)
                    if (data.status === 200) {
                        setScoreBoard(data.data)
                    }
                }
            } catch (error) {
                // hanlde
            }

        }
        fetchAllUsers();
        const socket = () => {
            return new SockJS(SOCKET_URL);
        }
        const client = Stomp.over(socket)

        client.connect({}, () => {
            client.subscribe(`/topic/scoreboard/${user.id}`, (msg) => {
                const result = JSON.parse(msg.body)
                setScoreBoard(result.data)
            });
        }, (err) => {
            console.log(err)
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, [accessToken, user.id])

    return (
        <div className='bg-white rounded-md p-4'>
            <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                <thead className='border-b-2 border-solid border-black'>
                    <tr>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500 ">Mã sinh viên</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Score</th>
                        {
                            scoreBoard?.userExerciseContests?.map((exercise, id) =>
                                <th key={id} className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"> {exercise.exerciseContestDto.exerciseDto.alias}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    <UserExercises key={scoreBoard.id} scoreBoard={scoreBoard} />
                </tbody>

            </table>
        </div>
    );
};

export default ScoreBoard;