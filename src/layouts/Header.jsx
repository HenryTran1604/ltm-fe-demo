import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { AppContext } from '../context/AppProvider';

const Header = () => {
    const { isContestOpen } = useContext(AppContext);
    const { user, IP } = useContext(AuthContext)
    return (
        <header className='z-10 fixed top-0 w-full bg-white'>
            <div className='flex justify-between items-center  shadow-[0px_2px_10px_#00000014] px-10 py-2'>
                <div className='flex items-center'>
                    <div className='text-xl font-bold'>
                        Lập trình mạng 2024
                    </div>
                    {
                        user?.role === 'ROLE_USER' && <div className='flex ml-10 gap-x-10'>
                            <Link to={'/practice/exercises'}>Luyện tập</Link>
                            <Link to={'/contests'}>Cuộc thi</Link>
                            <Link to={'/log'}>Log</Link>

                        </div>
                    }
                    {
                        user?.role === 'ROLE_ADMIN' && <div className='flex ml-10 gap-x-10'>
                            <Link to={'/admin/contests  '}>Danh sách contests</Link>
                            <Link to={'/admin/users'}>Danh sách người dùng</Link>
                            <Link to={'/admin/exercises'}>Danh sách bài tập</Link>
                            <Link to={'/log'}>Log</Link>

                        </div>
                    }

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
                    {
                        user && <div>
                            <span>
                                Info:
                            </span>
                            <span className='ml-2 float-right font-bold'>
                                {user.username?.toUpperCase()}
                            </span>
                        </div>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;