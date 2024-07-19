import React from 'react';
import Header from '../../layouts/Header';
import AdminUserList from '../../components/admin/AdminUserList';

const AdminUserListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <AdminUserList/>
            </div>
        </div>
    );
};

export default AdminUserListPage;