import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getIP, storeUserToLocalStorage, validateStudentCode } from '../../services/UserServices';
import { API_URL } from '../../constants';

const Register = () => {
    const [studentCode, setStudentCode] = useState('')
    const [IP, setIP] = useState('Detecting...')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
        }
        fetchIP();
    }, [])

    const registerUser = async () => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studentCode": studentCode,
                "ip": IP
            })
        });

        if(!response.ok) {
            if (response.status === 400) {
                toast.error('Mã sinh viên đã được đăng ký!', {
                    autoClose: 2000
                })
            } else if(response.status !== 200) {
                toast.error('Đã có lỗi xảy ra!', {
                    autoClose: 2000
                })
            }
        } else {
            const user = await response.json();
            storeUserToLocalStorage("ltm", user);
            toast.success("Đăng kí thành công!", {
                autoClose: 2000
            })
            navigate("/")
        }
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        if (IP === 'Detecting...') {
            toast.error('Vui lòng chờ detect IP!', {
                autoClose: 2000
            })
        }
        else if (validateStudentCode(studentCode)) {
            if (studentCode !== '' && IP !== '') {
                registerUser()
            }
        } else {
            setMessage('Mã sinh viên phải đúng định dạng, ví dụ: B20DCCN999')
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
                        placeholder='Nhập mã sinh viên' required onChange={(e) => setStudentCode(e.target.value)} />
                </div>
            </div>
            <div className='text-sm text-orange-400 float-right'>
                {message}
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
            <div className='flex justify-end mt-8'>
                <button className={`${studentCode.length !== 0 && IP.length !== 0 ? `bg-[#0A68FF]` : `bg-[#808089]`}  px-4 py-2 rounded-md text-white outline-none`}
                    onClick={handleAddUser}
                >Đăng ký</button>
            </div>
        </form >
    );
};

export default Register;