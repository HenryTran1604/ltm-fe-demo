import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';

const Header = () => {
    const { IP } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    return (
        <header className='z-10 fixed top-0 w-full bg-white'>
            <div className='flex justify-between items-center  shadow-[0px_2px_10px_#00000014] px-10 py-2'>
                <div className='flex items-center'>
                    <div className='text-xl font-bold'>
                        Lập trình mạng 2024
                    </div>
                    <div className='flex ml-10 gap-x-10'>
                        <Link to={'/'}>Danh sách IP</Link>
                        <Link to={'/exercises'}>Đề bài</Link>
                        <Link to={'/scoreboard'}>Bảng xếp hạng</Link>
                        <Link to={'/log'}>Log</Link>
                    </div>
                </div>

                <div>
                    <div>
                        <span>
                            IP:
                        </span>
                        <span className='float-right font-bold'>
                            {IP}
                        </span>
                    </div>
                    <div>
                        <span>
                            Info: 
                        </span>
                        <span className='ml-2 float-right font-bold'>
                            {user.uid?.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;