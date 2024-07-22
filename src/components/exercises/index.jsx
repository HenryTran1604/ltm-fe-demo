import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import Exercise from './Exercise';
import { useParams } from 'react-router-dom';

const Exercises = () => {
    const { contestId } = useParams()
    const [exercises, setExercises] = useState([])
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${API_URL}/user-exercise-contest/detail?userId=${user.id}&contestId=${contestId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response)
            if(response.ok) {
                const result = await response.json();
                if(result.status === 200) {
                    setExercises(result.data.items);
                }
            }
            
        };
        fetchExercises()
    }, [accessToken, user.id])
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

export default Exercises;