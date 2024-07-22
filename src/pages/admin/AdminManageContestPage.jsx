import React from 'react';
import Header from '../../layouts/Header';
import AdminManageContest from '../../components/admin/AdminManageContest';

const AdminManageContestPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminManageContest/>
            </div>
        </div>
    );
};

export default AdminManageContestPage;