import React from 'react';
import Header from '../layouts/Header';
import ScoreBoard from '../components/scoreboard';

const ScoreBoardPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20 p-8'>
                <ScoreBoard />
            </div>
        </div>
    );
};

export default ScoreBoardPage;
