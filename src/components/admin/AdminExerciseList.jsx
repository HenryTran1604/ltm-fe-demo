import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';

const AdminExerciseList = () => {
    const [exercises, setExercises] = useState([]);
    const { accessToken } = useContext(AuthContext);
    useEffect(() => {
        const fetchAllExercises = async () => {
            try {
                const response = await fetch(`${API_URL}/exercises/all`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setExercises(data.data.items)
                }
            } catch(error) {
                // handle
            } 

        }
        fetchAllExercises()
    }, [accessToken])
    return (
        <div className='bg-white p-5'>
            <div className='relative'>
                <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách bài tập</h1>
                <div className='absolute top-4 right-2'>
                    <Link to={'/app/admin/exercises/add'} className='ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                        Thêm bài tập
                    </Link>
                </div>

            </div>

            <table className="w-full border-collapse mb-5 text-center">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-center bg-gray-100">STT</th>
                        <th className="border px-4 py-2 bg-gray-100">Tên bài tập</th>
                        <th className="border px-4 py-2 bg-gray-100">Alias</th>
                        <th className="border px-4 py-2 bg-gray-100">Thời gian đăng ký</th>
                        <th className="border px-4 py-2 bg-gray-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.map((exercise, id) => (
                            <tr className="even:bg-gray-50 hover:bg-gray-200">
                                <td className="border px-4 py-2 text-center">{exercise.id}</td>
                                <td className="border px-4 py-2">{exercise.name}</td>
                                <td className="border px-4 py-2">{ exercise.aliases.map(alias => alias.code).join(', ')}</td>
                                <td className="border px-4 py-2">{exercise.createdAt}</td>
                                <td className="border px-4 py-2 flex justify-evenly">
                                    <Link to={`/app/admin/exercises/${exercise.id}/detail`} className='bg-green-500 px-4 py-1 rounded-md'>Sửa</Link>
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

export default AdminExerciseList;