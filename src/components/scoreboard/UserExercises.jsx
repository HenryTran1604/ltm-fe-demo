import React from 'react';

const UserExercises = (props) => {
    const scoreBoard = props.scoreBoard;
    console.log(scoreBoard)

    return (
        <tr className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm`}>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{scoreBoard.id}</td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                <div className='text-lg'>{scoreBoard?.username?.toUpperCase()}</div>
                <div className='text-sm text-[dimgrey]'>{scoreBoard.ip}</div>
            </td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{scoreBoard.score}</td>
            {
                scoreBoard?.userExerciseContests?.map((exercise, index) => (
                    <td key={index} className='px-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center'>
                        {
                            exercise !== null ? <div className={`${exercise.attemptCount > 0 ? `bg-[#e87272]` : ''}  ${exercise.ac ? `!bg-[#60e760]` : ''} min-h-12 max-w-16 m-auto`}>
                                {exercise.attemptCount !== 0 && `${exercise.attemptCount} Try`}
                            </div> :
                            <div className='min-h-12 max-w-16 m-auto'>
                            </div>
                        }
                    </td>
                ))
            }
        </tr>
    );
};

export default UserExercises;