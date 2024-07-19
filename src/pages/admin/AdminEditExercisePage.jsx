import React from 'react';
import Header from '../../layouts/Header';
import AdminEditExercise from '../../components/admin/AdminEditExercise';

const AdminEditExercisePage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminEditExercise/>
            </div>
        </div>
    );
};
export default AdminEditExercisePage;