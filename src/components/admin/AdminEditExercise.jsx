import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/endpoints';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditExercise = () => {
    const { exerciseId } = useParams();
    const navigate = useNavigate()
    const endpoint = `${API_URL}/exercises/${exerciseId ? `update?id=${exerciseId}` : `add`}`;
    const method = exerciseId ? 'PUT' : 'POST';

    const [activeTab, setActiveTab] = useState('exercise');
    const [addTopicCount, setAddTopicCount] = useState(0);
    const [exercise, setExercise] = useState({
        name: '',
        content: '',
        createdAt: '',
        topicId: ''
    });
    const [topic, setTopic] = useState({
        name: '',
        content: ''
    });
    const [topics, setTopics] = useState([]);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        if (exerciseId) {
            const fetchExercise = async () => {
                try {
                    const response = await fetch(`${API_URL}/exercises/detail/${exerciseId}`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        const result = await response.json();
                        console.log(result)
                        if (result.status === 200) {
                            const { topic, ...rest } = result.data;  // Lấy ra topic và phần còn lại của đối tượng result.data
                            setExercise({
                                ...rest,
                                topicId: topic.id  // Thay thế topic bằng topicId
                            });

                        }
                    }
                } catch (error) {
                    console.error('Error loading:', error);
                }
            };
            fetchExercise();
        }
    }, [accessToken, exerciseId]);

    useEffect(() => {
        const fetchAllTopics = async () => {
            try {
                const response = await fetch(`${API_URL}/topics/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.status === 200) {
                        setTopics(result.data.items);
                    } else {
                        toast.error(result.message, { autoClose: 2000 });
                    }
                } else {
                    toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
                }
            } catch (error) {
                console.error('Error loading topics:', error);
                toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
            }
        };
        fetchAllTopics();
    }, [accessToken, addTopicCount]);

    const handleExerciseChange = (event) => {
        const { name, value } = event.target;
        setExercise(prevExercise => ({ ...prevExercise, [name]: value }));
    };


    const handleTopicChange = (event) => {
        const { name, value } = event.target;
        setTopic(prevTopic => ({ ...prevTopic, [name]: value }));
    };

    const handleExerciseSubmit = async (e) => {
        e.preventDefault();
        console.log(exercise)
        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(exercise)
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                if (!exerciseId && result.status === 201) {
                    toast.success("Thêm bài tập thành công!", {
                        autoClose: 2000
                    })
                    setExercise({
                        name: '',
                        content: '',
                        createdAt: '',
                        topicId: ''
                    })
                } else if (exerciseId && result.status === 200) {
                    toast.success("Cập nhật bài tập thành công!", {
                        autoClose: 2000
                    })
                    navigate('/admin/exercises')
                }
                else {
                    toast.error(result.message, {
                        autoClose: 2000
                    })
                }
            } else {
                toast.error(result.message, { autoClose: 2000 });
            }
        } catch (error) {
            console.error('Error adding exercise:', error);
            toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
        }
    };

    const handleTopicSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/topics/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(topic)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === 201) {
                    toast.success("Thêm chủ đề thành công!", { autoClose: 2000 });
                    setAddTopicCount(addTopicCount + 1);
                    setTopic({ name: '', content: '' });
                } else {
                    toast.error(result.message, { autoClose: 2000 });
                }
            } else {
                toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
            }
        } catch (error) {
            console.error('Error adding topic:', error);
            toast.error("Đã có lỗi xảy ra", { autoClose: 2000 });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <div className="tabs flex justify-between">
                <button
                    className={`tab-button ${activeTab === 'exercise' ? 'active' : ''}`}
                    onClick={() => setActiveTab('exercise')}
                >
                    {exerciseId ? 'Cập nhật bài tập' : 'Thêm Bài Tập'}
                </button>
                <button
                    className={`tab-button ${activeTab === 'topic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('topic')}
                >
                    Thêm Chủ Đề
                </button>
            </div>
            {activeTab === 'exercise' && (
                <div className="tab-content">
                    <h2 className="text-2xl font-bold mb-4">{exerciseId ? 'Cập nhật bài tập' : 'Thêm Bài Tập'}</h2>
                    <form onSubmit={handleExerciseSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Tên Bài Tập</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={exercise?.name}
                                onChange={handleExerciseChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Nội Dung</label>
                            <textarea
                                id="content"
                                name="content"
                                value={exercise?.content}
                                onChange={handleExerciseChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="topicId" className="block text-gray-700 text-sm font-semibold mb-2">Chủ Đề</label>
                            <select
                                id="topicId"
                                name="topicId"
                                value={exercise?.topicId}
                                onChange={handleExerciseChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Chọn Chủ Đề</option>
                                {topics.map(topic => (
                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {exerciseId ? 'Cập nhật bài tập' : 'Thêm Bài Tập'}
                        </button>
                    </form>
                </div>
            )}
            {activeTab === 'topic' && (
                <div className="tab-content">
                    <h2 className="text-2xl font-bold mb-4">Thêm Chủ Đề</h2>
                    <form onSubmit={handleTopicSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Tên Chủ Đề</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={topic.name}
                                onChange={handleTopicChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Nội Dung</label>
                            <textarea
                                id="content"
                                name="content"
                                value={topic.content}
                                onChange={handleTopicChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Thêm Chủ Đề
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminEditExercise;
