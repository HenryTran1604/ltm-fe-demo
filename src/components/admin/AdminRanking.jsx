import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';

const AdminRanking = () => {
    const [rankings, setRankings] = useState([])
    const { accessToken } = useContext(AuthContext)
    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch(`${API_URL}/scoreboard/all?contestId=1`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data)
                if (data.status === 200) {
                    setRankings(data.data.sort((a, b) => b.score - a.score))
                }
            }
        }

        fetchAllUsers();

    }, [accessToken])

    return (
        <div className='bg-white rounded-md p-4'>
            <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                <thead className='border-b-2 border-solid border-black'>
                    <tr>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500 ">Mã sinh viên</th>
                        <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Score</th>
                        {
                            rankings[0]?.userExerciseContests?.map((exercise, id) =>
                                <th key={id} className="px-6 py-3 text-center text-md font-medium text-gray-500 dark:text-neutral-500"> {id}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rankings?.map((ranking, id) => (
                            <tr className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm`}>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{ranking.id}</td>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                                    <div className='text-lg'>{ranking?.username?.toUpperCase()}</div>
                                    <div className='text-sm text-[dimgrey]'>{ranking.ip}</div>
                                </td>
                                <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{ranking.score}</td>
                                {
                                    ranking?.userExerciseContests?.map((exercise, index) => (
                                        <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>

                                            {
                                                exercise !== null ? <div className={`${exercise.attemptCount > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac ? `!bg-[#60e760]` : ''} min-h-12 max-w-16 m-auto`}>
                                                    {exercise.exerciseContestDto.exerciseDto.alias}
                                                    {exercise.attemptCount !== 0 && `${exercise.attemptCount} Try`}
                                                </div> :
                                                    <div className='min-h-12 max-w-16 m-auto'>
                                                        {exercise.exerciseContestDto.exerciseDto.alias}
                                                    </div>
                                            }
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

export default AdminRanking;