import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const UserExercises = (props) => {
    const scoreBoard = props.scoreBoard;
    const exQuantity = props.exQuantity;
    const { user } = useContext(AuthContext);

    const convertToAllExercises = (exs) => {
        const exerciseArray = new Array(exQuantity).fill(null);
        exs.forEach(exercise => {
            const index = exercise.exerciseId - 1; // Giả sử exerciseId bắt đầu từ 1
            exerciseArray[index] = exercise;
        });
        return exerciseArray;
    }
    const exercises = convertToAllExercises(scoreBoard.userExercises)

    const isThisUser = (cmpUser) => {
        return user.id === cmpUser.id && user.ip === cmpUser.ip;
    }
    return (
        <tr className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 border-y-2 border-black border-solid rounded-sm ${isThisUser(scoreBoard) && `!bg-[#99d8f7]`}`}>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{1}</td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>
                <div className='text-lg'>{scoreBoard.studentCode.toUpperCase()}</div>
                <div className='text-sm text-[dimgrey]'>{scoreBoard.ip}</div>
            </td>
            <td className='px-6 whitespace-nowrap text-sm font-medium text-gray-800'>{scoreBoard.score}</td>
            {
                exercises.map((exercise, index) => (
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