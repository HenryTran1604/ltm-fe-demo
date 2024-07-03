import React from 'react';
import Header from '../layouts/Header';
import Register from '../components/register';

const RegisterPage = () => {
    
    return (
        <div className='h-[100vh]'>
            <Header/>
            <div className='h-full flex justify-center items-center'>
                <Register/>
            </div>
        </div>
    );
};

export default RegisterPage;