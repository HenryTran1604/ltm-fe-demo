import React, { useContext, useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL, SOCKET_URL } from '../../constants';

const UserSubmissions = (props) => {
    const currentUser = props.user;
    const { user } = useContext(AuthContext);

    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        const fetchAllExercises = async () => {
            const response = await fetch(`${API_URL}/user/exercise?userId=${currentUser.id}`);
            const data = await response.json();
            console.log(data)
            setExercises(data)
        }
        fetchAllExercises();
        const socket = () => {
            return new SockJS(SOCKET_URL);
        }
        const client = Stomp.over(socket)

        client.connect({}, () => {
            client.subscribe('/topic/scoreboard', (msg) => {
                const newSubmission = JSON.parse(msg.body);
                const submittedUserId = newSubmission.userId;
                if (currentUser.id === submittedUserId) {
                    const exerciseId = newSubmission.exerciseId;
                    setExercises((prevExercises) => {
                        const oldExerciseIndex = prevExercises.findIndex(obj => obj.exerciseId === exerciseId);
                        if(oldExerciseIndex !== -1) {
                            const updatedExercises = [...prevExercises];
                            updatedExercises[oldExerciseIndex] = newSubmission;
                            return updatedExercises;
                        }
                        return prevExercises
                    });
                }

            });
        }, (err) => {
            console.log(err)
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [currentUser.id])
    const isThisUser = (cmpUser) => {
        return user.id === cmpUser.id && user.ip === cmpUser.ip;
    }
    return (
        <tr className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm ${isThisUser(currentUser) && `!bg-[#99d8f7]`}`}>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{1}</td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                <div className='text-lg'>{currentUser.studentCode.toUpperCase()}</div>
                <div className='text-sm text-[dimgrey]'>{currentUser.ip}</div>
            </td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{currentUser.score}</td>
            {
                exercises.map((exercise, index) => (
                    <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>
                        <div className={`${exercise.tryCount > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac ? `!bg-[#60e760]` : ''} min-h-12 max-w-16 m-auto`}>
                            {exercise.attemptCount !== 0 && `${exercise.attemptCount} Try`}
                        </div>
                    </td>
                ))
            }
        </tr>
    );
};

export default UserSubmissions;