import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/endpoints';
import { AuthContext } from '../../../context/AuthProvider';

const ContestList = () => {
    const [userContests, setUserContests] = useState([])
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch(`${API_URL}/user-contest/all?userId=${user.id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.status === 200) {
                        setUserContests(result.data.items);
                    }
                }
            } catch (error) {
                console.error('Error loading:', error);
            }
        };
        fetchContests()
    }, [accessToken, user.id])

    const handleRegisterContest = async (contestId) => {
        try {
            const response = await fetch(`${API_URL}/user-contest/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "contestId": contestId,
                    "userId": user.id
                })
            });

            const result = await response.json();
            if (response.ok) {
                if (result.status === 200) {
                    setUserContests(userContests.map(userContest => 
                        userContest.contest.id === contestId ?
                        {...userContest, registered: true} :
                        userContest
                    ))
                    
                    toast.success("Đăng kí cuộc thi thành công!", { autoClose: 2000 });

                } else {
                    toast.error(result.message, { autoClose: 2000 });
                }
            } else {
                toast.error(result.message, { autoClose: 2000 });
            }
        } catch (error) {
            console.error('Error adding topic:', error);
            toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
        }
    }

    const renderAction = (userContest) => {
        const startTime = new Date(userContest.contest.startTime)
        const endTime = new Date(userContest.contest.endTime)
        const now = new Date()
        if (endTime < now) {
            return <button className='bg-gray-400 px-4 py-1 rounded-md'>Over</button>
        } else if (now > startTime) {
            if (userContest.registered) {
                return <Link to={`/contest/${userContest.contest.id}/exercises`} className='bg-green-400 px-4 py-1 rounded-md'>Vào thi</Link>
            } else {
                return <button className='bg-green-400 px-4 py-1 rounded-md cursor-not-allowed'>Đang diễn ra</button>
            }
        } else {
            if (userContest.registered) {
                return <button className='bg-green-400 px-4 py-1 rounded-md cursor-not-allowed'>Đã đăng kí</button>
            } else {
                return <button className='bg-blue-400 px-4 py-1 rounded-md'
                    onClick={() => handleRegisterContest(userContest.contest.id)}>
                    Đăng ký
                </button>
            }
        }

    }

    return (
        <div className='bg-white rounded-lg'>
            <div className='relative'>
                <h1 className="text-2xl font-bold mx-5 pt-5">Danh sách contest</h1>
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
                            userContests.map((userContest, id) => (
                                <tr key={id} className="even:bg-gray-50 hover:bg-gray-200">
                                    <td className="border px-4 py-2">{userContest.contest.id}</td>
                                    <td className="border px-4 py-2">
                                        <div className="text-blue-500 hover:text-blue-700">{userContest.contest.title}</div>
                                    </td>
                                    <td className="border px-4 py-2">{userContest.contest.startTime}</td>
                                    <td className="border px-4 py-2">{userContest.contest.endTime}</td>
                                    <td className="border px-4 py-2 flex justify-around">
                                        {renderAction(userContest)}
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

export default ContestList;