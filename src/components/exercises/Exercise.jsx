import React from 'react';

const Exercise = (props) => {
    const assignedExercise = props.exercise;
    
    return (
        <div className='flex items-center px-6 py-8'>
            <div className='rounded-md bg-white px-6 py-4 w-full'>
                <div className='text-xl font-bold'>{assignedExercise.exercise.alias}</div>
                <div className='text-lg whitespace-pre-line leading-10'>
                    <div>Mã bài tập <strong>{assignedExercise.alias}</strong></div>
                    {
                        assignedExercise.exercise.content.split('\\n').map((e, id) => <p key={id}>{e}</p>)
                    }   
                </div>
                <div className='float-right'>
                    Status: {assignedExercise.ac ? 
                    <span className='text-green-500'> "Hoàn thành" </span>: 
                    <span className=''>Chưa hoàn thành</span>}
                </div>
            </div>
        </div>
    );
};

export default Exercise;