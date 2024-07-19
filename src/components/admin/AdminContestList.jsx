import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';

const AdminContestList = () => {
    const [contests, setContests] = useState([])
    const { accessToken } = useContext(AuthContext)
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`${API_URL}/contests/all`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    if (result.status === 200) {
                        setContests(result.data);
                    }
                }
            } catch(error) {
                console.error('Error loading:', error);
            }
            

        };
        fetchExercises()
    }, [accessToken])

    const handleAddContest = () => {

    }

    return (
        <div className='bg-white rounded-lg'>
            <div className='relative'>
                <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách contest</h1>
                <div className='absolute top-4 right-2'>
                    <Link to={'/app/admin/contests/add'} className='ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
                        onClick={handleAddContest}>
                        Thêm contest
                    </Link>
                </div>

            </div>
            <div className='p-5'>
                <table className="w-full border-collapse text-center">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 bg-gray-100">STT</th>
                            <th className="border px-4 py-2 bg-gray-100">Tên contest</th>
                            <th className="border px-4 py-2 bg-gray-100">Thời gian bắt đầu contest</th>
                            <th className="border px-4 py-2 bg-gray-100">Thời gian kết thúc contest</th>
                            <th className="border px-4 py-2 bg-gray-100">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, id) => (
                                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border px-4 py-2">{contest.id}</td>
                                    <td className="border px-4 py-2">
                                        <div className="text-blue-500 hover:text-blue-700">{contest.title}</div>
                                    </td>
                                    <td className="border px-4 py-2">{contest.startTime}</td>
                                    <td className="border px-4 py-2">{contest.endTime}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        <Link to={`/app/admin/contests/manage`} className='bg-blue-400 px-4 py-1 rounded-md'>Xem</Link>
                                        <Link to={`/app/admin/contests/detail/${contest.id}`} className='bg-green-500 px-4 py-1 rounded-md'>Sửa</Link>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminContestList;