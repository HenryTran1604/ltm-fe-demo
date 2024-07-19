import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import Header from '../layouts/Header';

const WaitingPage = () => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const { startTime, isContestOpen } = useContext(AppContext)
    console.log(startTime)
    useEffect(() => {
        if (startTime ) {
          const interval = setInterval(() => {
            const currentTime = new Date();
            const difference = startTime - currentTime;
    
            if (difference <= 0) {
              clearInterval(interval);
            } else {
              const hours = Math.floor(difference / (1000 * 60 * 60));
              const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
              setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
            }
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [startTime]);
    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
            <Header/>
            <div className='flex items-center justify-center h-full text-white text-4xl'>
                Contest sẽ diễn ra trong { timeRemaining }
            </div>
            {
                isContestOpen && <Link to={`/exercies`}>Đến contest</Link>
            }
        </div>
    );
};

export default WaitingPage;