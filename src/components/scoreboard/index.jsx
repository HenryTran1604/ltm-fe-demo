import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import UserSubmissions from './UserSubmissions';

const ScoreBoard = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            console.log(data)
            setUsers(data)
        }
        fetchAllUsers();
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
                            Array.from({ length: 4 }).map((_, i) =>
                                <th key={i} className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"> {i}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((currentUser, id) => (
                            <UserSubmissions user={currentUser} />
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;