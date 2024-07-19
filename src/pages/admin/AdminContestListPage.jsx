import React from 'react';
import Header from '../../layouts/Header';
import AdminContestList from '../../components/admin/AdminContestList';

const AdminContestListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20 p-8'>
                <AdminContestList/>
            </div>
        </div>
    );
};

export default AdminContestListPage;