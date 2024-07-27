import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL } from '../../constants/endpoints';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const { accessToken } = useContext(AuthContext);
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users/all`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.data.items)
                }
            } catch(error) {
                // handle
            } 

        }
        fetchAllUsers()
    }, [accessToken])
    return (
        <div className='bg-white p-5'>
            <div class="flex justify-center items-center mb-5">
                <a href="./listContest.html">
                    <h1 class="text-2xl font-bold">Danh sách người dùng</h1>
                </a>
            </div>

            <table class="w-full border-collapse mb-5">
                <thead>
                    <tr>
                        <th class="border px-4 py-2 text-center bg-gray-100">STT</th>
                        <th class="border px-4 py-2 bg-gray-100">UID</th>
                        <th class="border px-4 py-2 bg-gray-100">Mã Sinh Viên</th>
                        <th class="border px-4 py-2 bg-gray-100">IP</th>
                        <th class="border px-4 py-2 bg-gray-100">Thời gian đăng ký</th>
                        <th class="border px-4 py-2 bg-gray-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, id) => (
                            <tr key={id} class="even:bg-gray-50 hover:bg-gray-200">

                                <td class="border px-4 py-2 text-center">{id}</td>
                                <td class="border px-4 py-2 text-center">{user.id}</td>
                                <td class="border px-4 py-2">{user.username}</td>
                                <td class="border px-4 py-2">{user.ip}</td>
                                <td class="border px-4 py-2">{user.createdAt}</td>
                                <td class="border px-4 py-2 flex justify-evenly">
                                    <button className='bg-green-500 px-4 py-1 rounded-md'>Sửa</button>
                                    <button className='bg-orange-400 px-4 py-1 rounded-md'>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    );
};

export default AdminUserList;