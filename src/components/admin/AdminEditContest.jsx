import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditContest = () => {
    const { contestId } = useParams();

    const endpoint = `${API_URL}/contests/${contestId ?  `update?id=${contestId}` : `add`}`;
    const method = contestId ? 'PUT' : 'POST';

    const [contest, setContest] = useState({
        title: '',
        startTime: '',
        endTime: ''
    })

    const { accessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (contestId) {
            const fetchContest = async () => {
                try {
                    const response = await fetch(`${API_URL}/contests/detail/${contestId}`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        const result = await response.json();
                        if (result.status === 200) {
                            setContest(result.data);
                        }
                    }
                } catch (error) {
                    console.error('Error loading:', error);
                }
            }
            fetchContest()

        }
    }, [accessToken, contestId])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContest(preContest => ({ ...preContest, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(contest)
            });

            if (response.ok) {
                const result = await response.json();
                if (!contestId && result.status === 201) {
                    toast.success("Thêm contest thành công!", {
                        autoClose: 2000
                    })
                    navigate(`/admin/contests`)
                } else if(contestId && result.status === 200)  {
                    toast.success("Cập nhật contest thành công!", {
                        autoClose: 2000
                    })
                    navigate(`/admin/contests`)
                }
                else {
                    toast.error(result.message, {
                        autoClose: 2000
                    })
                }
                // Xử lý khi thành công, ví dụ: reset form hoặc hiển thị thông báo
            } else {
                toast.error("Đã có lỗi xảy ra", {
                    autoClose: 2000
                })
                // Xử lý khi thất bại, ví dụ: hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error adding contest:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{contestId ? `Cập nhật` : `Thêm Contest`}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Tên Contest</label>
                    <input
                        type="text"
                        contestId="title"
                        name="title"
                        value={contest.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-gray-700 text-sm font-semibold mb-2">Thời gian bắt đầu</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={contest.startTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endTime" className="block text-gray-700 text-sm font-semibold mb-2">Thời gian kết thúc</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={contest.endTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {contestId ? `Cập nhật` : `Thêm Contest`}
                </button>
            </form>
        </div>
    );
};

export default AdminEditContest;
