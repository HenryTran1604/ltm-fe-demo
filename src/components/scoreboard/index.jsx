import React, { useContext, useEffect, useState } from 'react';
import { getRealTimeAllDocument } from '../../firebase/Services';
import { AuthContext } from '../../context/AuthProvider';

const ScoreBoard = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const unsubcribe = getRealTimeAllDocument('users', (realtimeUsers) => {
            realtimeUsers.forEach((user, _) => {
                user['score'] = user.exercises.reduce((a, b) => a + b.ac, 0);
            })
            const sortedUser = realtimeUsers.sort((a, b) => {
                return b.score - a.score;
            })
            setUsers(sortedUser)
            console.log(sortedUser)
        })
        return () => unsubcribe()
    }, [])
    const isThisUser = (cmpUser) => {
        return user.uid === cmpUser.uid && user.ip === cmpUser.ip;
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
                                    <div className='text-lg'>{currentUser.uid.toUpperCase()}</div>
                                    <div className='text-sm text-[dimgrey]'>{currentUser.ip}</div>
                                </td>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{currentUser.score}</td>
                                {
                                    currentUser.exercises?.map((exercise, index) => (
                                        <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>
                                            <div className={`${exercise.try > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac !== 0 ? `!bg-[#60e760]` : ''} min-h-12 w-16 m-auto`}>
                                                {exercise.try !== 0 && `${exercise.try} Try`}
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