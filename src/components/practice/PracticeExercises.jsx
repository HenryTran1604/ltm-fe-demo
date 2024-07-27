import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants/endpoints';
import { AuthContext } from '../../context/AuthProvider';
import Exercise from '../exercises/Exercise';
import { useParams } from 'react-router-dom';

const PracticeExercises = () => {
    const { contestId } = useParams()
    const [exercises, setExercises] = useState([])
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${API_URL}/practice-user-exercise/detail?userId=${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if(response.ok) {
                const result = await response.json();
                console.log(result)
                if(result.status === 200) {
                    setExercises(result.data.items);
                }
            }
            
        };
        fetchExercises()
    }, [accessToken, user.id, contestId])
    return (
        <div>
            {
                exercises?.map((exercise, index) => 
                    <Exercise key={index} exercise={exercise} />
                )
            }
        </div>
    );
};

export default PracticeExercises;