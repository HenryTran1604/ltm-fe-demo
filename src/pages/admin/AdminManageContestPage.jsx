import React from 'react';
import Header from '../../layouts/Header';
import AdminManageContest from '../../components/admin/AdminManageContest';

const AdminManageContestPage = () => {
    return (
        <div className=''>
            <Header />
            <div className='mt-20 p-8'>
                <AdminManageContest />
            </div>
        </div>
    );
};

export default AdminManageContestPage;