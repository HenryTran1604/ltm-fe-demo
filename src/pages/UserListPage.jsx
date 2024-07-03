import React from 'react';
import Header from '../layouts/Header';
import UserList from '../components/userlist';

const UserListPage = () => {
    return (
        <div>
            <Header/>
            <div className='mt-20'>
                <UserList/>
            </div>
        </div>
    );
};

export default UserListPage;