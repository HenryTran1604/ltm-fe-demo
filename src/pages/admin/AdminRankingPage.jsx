import React from 'react';
import AdminRanking from '../../components/admin/AdminRanking';
import Header from '../../layouts/Header';

const AdminRankingPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminRanking/>
            </div>
        </div>
    );
};

export default AdminRankingPage;