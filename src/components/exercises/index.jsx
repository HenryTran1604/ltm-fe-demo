import React from 'react';
import Exercise from './Exercise';

const Exercises = () => {
    const exercises = ['bai1.json']
    return (
        <div>
            {
                exercises.map((exercise, index) => 
                    <Exercise key={index} exName={exercise} />
                )
            }
        </div>
    );
};

export default Exercises;