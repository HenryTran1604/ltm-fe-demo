import React from 'react';
import Header from '../layouts/Header';
import Log from '../components/log';

const LogPage = () => {
    return (
        <div className='h-[100vh]'>
            <Header/>
            <div className='pt-20 h-full px-8 py-4'>
                <Log/>
            </div>
        </div>
    );
};

export default LogPage;