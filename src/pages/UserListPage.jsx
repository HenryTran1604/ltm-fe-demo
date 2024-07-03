import React from 'react';
import Header from '../layouts/Header';
import UserList from '../components/userlist';

const UserListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20 flex items-center justify-center'>
                <UserList/>
            </div>
        </div>
    );
};

export default UserListPage;