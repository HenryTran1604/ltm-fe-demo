import React from 'react';
import Header from '../layouts/Header';
import Exercises from '../components/exercises/index';

const ExercisesPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <Exercises/>
            </div>
        </div>
    );
};

export default ExercisesPage;