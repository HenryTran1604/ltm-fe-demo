import React from 'react';

const UserExercises = ({ username, id, score, ip, exercises }) => {
    return (
        <tr className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm`}>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{id}</td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                <div className='text-lg'>{username?.toUpperCase()}</div>
                <div className='text-sm text-[dimgrey]'>{ip}</div>
            </td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{score}</td>
            {
                exercises.map((exercise, index) => (
                    <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>
                        <div className={`${exercise.attemptCount > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac ? `!bg-[#60e760]` : ''} min-h-12 max-w-16 m-auto`}>
                            <strong>{exercise.alias}</strong>
                            <div>
                                {exercise.attemptCount !== 0 && `${exercise.attemptCount} Try`}
                            </div>
                        </div>
                    </td>
                ))
            }
        </tr>
    );
};

export default UserExercises;