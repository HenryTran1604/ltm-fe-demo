import React from 'react';
import Header from '../layouts/Header';
import ContestList from '../components/contest/contestlist';

const ContestListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <ContestList/>
            </div>
        </div>
    );
};

export default ContestListPage;