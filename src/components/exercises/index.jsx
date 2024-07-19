import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import Exercise from './Exercise';

const Exercises = () => {
    const [exercises, setExercises] = useState([])
    const { accessToken, user } = useContext(AuthContext)
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(`${API_URL}/user-exercise-contest/detail/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if(response.ok) {
                const pageResponse = await response.json();
                console.log(pageResponse)
                if(pageResponse.status === 200) {
                    setExercises(pageResponse.data.items);
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