import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Header = () => {
    const { user, IP, logout } = useContext(AuthContext)
    return (
        <header className='z-10 fixed top-0 w-full bg-white h-16 shadow-[0px_2px_10px_#00000014] flex justify-between items-center   px-10 py-2'>
            <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full  '>
                    <img className='w-full h-full' src="/static/images/icons/Logo_PTIT_University.png" alt="" />
                </div>
                <div className='text-xl font-bold'>
                    Lập trình mạng 2024
                </div>
                {
                    user?.role === 'ROLE_USER' && <div className='flex ml-10 gap-x-10'>
                        <Link to={'/practice/exercises'}>Luyện tập</Link>
                        <Link to={'/contests'}>Cuộc thi</Link>
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

            <div className='flex items-center gap-x-6'>
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
                <button className='w-6' title='Đăng xuất' onClick={logout}>
                    <img src="/static/images/icons/logout.png" alt="" />
                </button>
            </div>
        </header>
    );
};

export default Header;