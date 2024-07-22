import React from 'react';
import Header from '../../layouts/Header';
import AdminContestDetail from '../../components/admin/AdminContestDetail';

const AdminContestDetailPage = () => {
    return (
        <div className=''>
            <Header />
            <div className='mt-20 p-8'>
                <AdminContestDetail />
            </div>
        </div>
    );
};

export default AdminContestDetailPage;