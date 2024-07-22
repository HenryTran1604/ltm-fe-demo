import React, { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getIP, validateStudentCode } from '../../services/UserServices';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [IP, setIP] = useState('Detecting...')
    const [invalidStudentCode, setInvalidStudentCode] = useState(false)
    const { loginAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
        }
        fetchIP();
    }, [])

    const login = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "ip": IP,
                    "password": password
                })
            });

            const result = await response.json()
            if (!response.ok) {
                toast.error(result.message, {
                    autoClose: 2000
                })
            } else {
                if (result.status === 200) {
                    toast.success("Đăng nhập thành công!", {
                        autoClose: 2000
                    })
                    loginAuth(result.data)
                    if (result.data.user.role === 'ROLE_USER')
                        navigate("/app/contests")
                    else navigate("/app/admin/contests")
                } else {
                    toast.error(result.message, {
                        autoClose: 2000
                    })
                }

            }
        } catch (error) {
            // handle
        }

    }
    const handleLoginUser = (e) => {
        e.preventDefault();
        if (IP === 'Detecting...') {
            toast.error('Vui lòng chờ detect IP!', {
                autoClose: 2000
            })
        }
        else if (validateStudentCode(username)) {
            if (username !== '' && IP !== '' && password !== '') {
                login()
                setInvalidStudentCode(false);
            }
        } else {
            setInvalidStudentCode(true);
        }
    }

    return (
        <form className='bg-white w-[450px] p-8 rounded-lg  shadow-[0px_2px_10px_#00000014]'>
            <div className='text-center text-xl font-bold mb-4'>Thông tin của bạn</div>
            <div className='flex items-center gap-x-4'>
                <div className='w-10 bg-white'>
                    <img src="/static/images/icons/user.png" alt="" />
                </div>
                <div className='flex-1 '>
                    <input type="text" className='w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF]'
                        placeholder='Nhập mã sinh viên' required onChange={(e) => setUsername(e.target.value)} />
                </div>
            </div>
            {
                invalidStudentCode && <div className='text-sm text-orange-400 float-right'>
                    <p>Mã sinh viên phải đúng định dạng, ví dụ: B20DCCN999</p>
                </div>
            }
            <div className='flex items-center gap-x-4 mt-6'>
                <div className='w-10 bg-white'>
                    <img src="/static/images/icons/password.png" alt="" />
                </div>
                <div className='flex-1 '>
                    <input type="password" className='w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF]'
                        placeholder='Nhập mật khẩu' required onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className='flex items-center gap-x-4 mt-8'>
                <div className='w-10 bg-white ro'>
                    <img src="/static/images/icons/ip-address.png" alt="" />
                </div>
                <div className='flex-1'>
                    <input type="text" className='w-full px-4 py-2 rounded-md border-2 border-black border-solid outline-none focus:border-[#0A68FF] cursor-not-allowed'
                        placeholder='IP của bạn' disabled value={IP} />
                </div>
            </div>
            <div className='flex justify-between items-center mt-8'>
                <Link to={`/register`}>Đăng ký</Link>
                <button className={`${username?.length !== 0 && IP?.length !== 0 ? `bg-[#0A68FF]` : `bg-[#808089]`}  px-4 py-2 rounded-md text-white outline-none`}
                    onClick={handleLoginUser}
                >Đăng nhập</button>
            </div>
        </form >
    );
};

export default Login;