import React from 'react';
import Header from '../../layouts/Header';
import AdminEditContest from '../../components/admin/AdminEditContest';

const AdminEditContestPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminEditContest/>
            </div>
        </div>
    );
};

export default AdminEditContestPage;