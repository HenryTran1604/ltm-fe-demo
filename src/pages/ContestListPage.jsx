import React from 'react';
import ContestList from '../components/contestlist';
import Header from '../layouts/Header';

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