import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { getAllDocuments } from '../../firebase/Services';
import { AuthContext } from '../../context/AuthProvider';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchAllUsers = async () => {
            const userList = await getAllDocuments('users');
            // console.log(userList)
            setUsers(userList);
        }
        fetchAllUsers()
    }, [])
    const isThisUser = (cmpUser) => {
        return Object.entries(user).sort().toString() === Object.entries(cmpUser).sort().toString()
    }
    return (
        <div className='flex items-center justify-center'>
            <div class="rounded-lg bg-white p-4">
                <table className='relative min-w-full divide-y divide-gray-200 dark:divide-neutral-700 '>
                    <thead className=''>
                        <tr>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">STT</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Mã sinh viên</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">IP</th>
                            <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Thời gian đăng ký</th>
                            {/* <th className="px-6 py-3 text-start text-md font-medium text-gray-500 dark:text-neutral-500">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((currentUser, id) => (
                                // console.log(currentUser === user)
                                <tr key={id} className={`odd:bg-white even:bg-gray-100 hover:bg-gray-200 rounded-sm ${isThisUser(currentUser) && `!bg-[#99d8f7]`}`}>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{id + 1}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{currentUser.uid}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{currentUser.ip}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>{currentUser.createdAt}</td>
                                    {/* <td className='px-6 py-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400'>
                                        <Link to={`/detail/$1`} className='rounded'>Sửa</Link>
                                    </td> */}
                                </tr>
                            ))
                        }
                        <tr className='odd:bg-white even:bg-gray-100 hover:bg-gray-200'>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>1</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>1</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>1</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 '>1</td>
                            {/* <td className='px-6 py-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400'>
                                <Link to={`/detail/$1`} className='rounded'>Sửa</Link>
                            </td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;