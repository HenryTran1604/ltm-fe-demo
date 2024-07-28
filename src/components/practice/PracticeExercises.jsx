import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants/endpoints';
import { AuthContext } from '../../context/AuthProvider';
import Exercise from '../exercises/Exercise';
import { Link, useParams } from 'react-router-dom';
import { PRACTICE_SCOREBOARD } from '../../constants/routes';

const PracticeExercises = () => {
    const { contestId } = useParams()
    const [exercises, setExercises] = useState([])
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`${API_URL}/practice-user-exercise/detail?userId=${user.id}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.status === 200) {
                        setExercises(result.data.items);
                    }
                }
            } catch(error) {
                // handle
            }
            

        };
        fetchExercises()
    }, [accessToken, user.id, contestId])
    return (
        <div className=''>
            <div className='flex items-center justify-between px-6'>
                <h2 className='text-2xl font-bold'>Danh sách bài luyện tập</h2>
                <div className=''>
                    <Link className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700' to={PRACTICE_SCOREBOARD}>Kết quả</Link>
                </div>
            </div>
            <div>

                {
                    exercises.map((exercise, index) =>
                        <Exercise key={index} exercise={exercise} />
                    )
                }
            </div>
        </div>
    );
};

export default PracticeExercises;