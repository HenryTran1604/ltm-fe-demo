import React, { useEffect, useState } from 'react';

import { addDocument, isExistedUser } from '../../firebase/Services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getIP, storeUserToLocalStorage, validateStudentCode } from '../../services/UserServices';

const Register = () => {
    const user  = {
        uid: '',
        ip: '',
        createdAt: '',
        exercises: [
            {
                name: '1',
                try: 0,
                ac: 0
            }, 
            {
                name: '2',
                try: 0,
                ac: 0
            },
            {
                name: '3',
                try: 0,
                ac: 0
            },
            {
                name: '4',
                try: 0,
                ac: 0
            }
        ]
    }
    const [uid, setUid] = useState('')
    const [IP, setIP] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchIP = async () => {
            const userIP = await getIP();
            setIP(userIP);
        }
        fetchIP();
    }, [])

    const handleAddUser = (e) => {
        e.preventDefault();
        if (validateStudentCode(uid)) {
            if (uid !== '' && IP !== '') {
                user['ip'] = IP;
                user['uid'] = uid;
                user['createdAt'] = new Date().toLocaleString().replace(',','');
                isExistedUser('users', user)
                    .then(response => {
                        // console.log(response)
                        if (response) {
                            toast.error('Mã sinh viên đã được đăng ký!', {
                                autoClose: 2000
                            })

                        } else {
                            addDocument('users', user);
                            storeUserToLocalStorage('ltm', user);
                            toast.success('Đã đăng kí thành công!', {
                                autoClose: 2000
                            })
                            navigate('/')
                        }
                    })
                    .catch(err => console.log(err))
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
                        placeholder='Nhập mã sinh viên' required onChange={(e) => setUid(e.target.value)} />
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
                <button className='bg-[#0A68FF] px-4 py-2 rounded-md text-white outline-none' 
                onClick={handleAddUser}>Đăng ký</button>
            </div>
        </form >
    );
};

export default Register;