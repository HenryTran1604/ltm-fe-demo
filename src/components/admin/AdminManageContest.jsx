import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminManageContest = () => {
    const [exercises, setExercises] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const { accessToken } = useContext(AuthContext);
    const contestId = 1;

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${API_URL}/exercises/all`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                if (result.status === 200) {
                    setExercises(result.data.items);
                }
            }
        };
        fetchExercises();
    }, [accessToken]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch(`${API_URL}/users/all`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const result = await response.json();
                if (result.status === 200) {
                    setUsers(result.data.items);
                }
            }
        };
        fetchAllUsers();
    }, [accessToken]);

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleExerciseSelect = (exerciseId) => {
        setSelectedExercises((prevSelected) =>
            prevSelected.includes(exerciseId)
                ? prevSelected.filter((id) => id !== exerciseId)
                : [...prevSelected, exerciseId]
        );
    };

    const handleAddUsers = async () => {
        const response = await fetch(`${API_URL}/user-contest/add-all`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contestId: contestId,
                userIds: selectedUsers
            })
        });
        if (response.ok) {
            console.log("Users added successfully");
        } else {
            console.error("Failed to add users");
        }
    };

    const handleAddExercises = async () => {
        try {
            const response = await fetch(`${API_URL}/exercise-contest/add-all`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contestId: contestId,
                    exerciseIds: selectedExercises
                })
            });
            if (response.ok) {
                console.log("Exercises added successfully");
            } else {
                console.error("Failed to add exercises");
            }
        } catch (error) {

            // handle
        }

    };

    const handleAssignExerciseToUser = async () => {
        try {
            const response = await fetch(`${API_URL}/contests/assign?id=${contestId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            console.log(result)
            if (response.ok) {

                if (result.status === 200) {
                    toast.success("Tạo đề thành công", {
                        autoClose: 2000
                    })
                } else {
                    toast.error(response.message, {
                        autoClose: 2000
                    })
                }
            } else {
                toast.error("Đã có lỗi xảy ra", {
                    autoClose: 2000
                })
            }
        } catch(error) {
            // hanlde
        }
        
    }
    const handleSelectAllUsers = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
    };

    const handleSelectAllExercises = () => {
        if (selectedExercises.length === exercises.length) {
            setSelectedExercises([]);
        } else {
            setSelectedExercises(exercises.map(exercise => exercise.id));
        }
    };

    return (
        <div className='bg-white'>
            <div className='relative'>

                <h1 className="text-2xl font-bold mx-5 pt-5">Thêm người dùng vào contest 1</h1>
                <div className='absolute top-4 right-2'>
                    <Link to={'/admin/contests/detail/1'} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>Chi tiết</Link>
                    <button className='ml-2 mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
                        onClick={handleAssignExerciseToUser}>
                        Tạo đề
                    </button>
                </div>

            </div>
            <div className="flex justify-between shadow-lg p-5 rounded-lg">
                <div className="w-1/2 pr-2">
                    <h2 className="text-xl font-semibold mb-3">Danh sách sinh viên</h2>
                    <table className="w-full border-collapse mb-3 text-center">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === users.length}
                                        onChange={handleSelectAllUsers}
                                    />
                                </th>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, id) => (
                                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleUserSelect(user.id)}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.username.toUpperCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-1/2 pl-2">
                    <h2 className="text-xl font-semibold mb-3">Danh sách bài tập</h2>
                    <table className="w-full border-collapse mb-3 text-center">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedExercises.length === exercises.length}
                                        onChange={handleSelectAllExercises}
                                    />
                                </th>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Tên bài</th>
                                <th className="border px-4 py-2">Định danh</th>
                                <th className="border px-4 py-2">Topic</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise, id) => (
                                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedExercises.includes(exercise.id)}
                                            onChange={() => handleExerciseSelect(exercise.id)}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{id}</td>
                                    <td className="border px-4 py-2">{exercise.name}</td>
                                    <td className="border px-4 py-2">{exercise.alias}</td>
                                    <td className="border px-4 py-2">{exercise.topic.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    className="mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleAddUsers}
                >
                    Add Selected Users
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleAddExercises}
                >
                    Add Selected Exercises
                </button>
            </div>
        </div>
    );
};

export default AdminManageContest;
