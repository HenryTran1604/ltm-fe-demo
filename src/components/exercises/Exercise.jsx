import React from 'react';

const Exercise = (props) => {
    const exercise = props.exercise;
    
    return (
        <div className='flex items-center px-6 py-8'>
            <div className='rounded-md bg-white px-6 py-4 w-full'>
                <div className='text-xl font-bold'>{exercise.exerciseContestDto.exerciseDto.alias}</div>
                <div className='text-lg whitespace-pre-line leading-10'>
                    {
                        exercise.exerciseContestDto.exerciseDto.content.split('\\n').map((e, id) => <p key={id}>{e}</p>)
                    }   
                </div>
                <div>
                    Status: {exercise.ac ? "Completed" : "Nope"}
                    {
                        console.log(exercise.ac)
                    }
                </div>
            </div>
        </div>
    );
};

export default Exercise;