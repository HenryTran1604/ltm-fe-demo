import React from 'react';
import Header from '../../layouts/Header';
import AdminExerciseList from '../../components/admin/AdminExerciseList';

const AdminExerciseListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminExerciseList/>
            </div>
        </div>
    );
};

export default AdminExerciseListPage;