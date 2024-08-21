import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';

const MainLayout = ({ children }) => {
    const [activeTab, setActiveTab] = useState(3);
    const [isExpandSide, setIsExpandSide] = useState(true);
    const [isExpandTasks, setIsExpandTasks] = useState(false);

    return (
        <>
            <Header />
            <main className='mt-16'>
                <SideBar activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isExpandSide={isExpandSide}
                    setIsExpandSide={setIsExpandSide}
                />
                <div className={`absolute ${isExpandSide ? `left-[246px]` : `left-20`} `}>
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;