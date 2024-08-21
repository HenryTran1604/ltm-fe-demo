import React, { useRef, useState } from 'react';
import { FaRankingStar, FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { PiFileLight } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import { BiMenuAltRight, BiMenu } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const SideBar = ({activeTab, setActiveTab, isExpandSide, setIsExpandSide}) => {
    const [isExpandTasks, setIsExpandTasks] = useState(false);

    const inputRef = useRef()

    const handleSearch = () => {
        setIsExpandSide(true);
        inputRef.current.focus()
    }

    return (
        <div className={`fixed left-0 bottom-0 top-16 bg-[#11101d] px-3.5 py-1.5 rounded-r-lg ${isExpandSide ? `w-60` : `w-[72px]`} transition-all ease-in-out duration-500`}>
            <div className={`relative flex items-center h-12 text-white`}>
                <div className={`text-xl font-normal ${!isExpandSide && `hidden`}`}>Menu</div>
                <i className={`transition-all ease-in-out duration-500 cursor-pointer absolute ${isExpandSide ? `left-[85%]` : `left-1/2 -translate-x-1/2`}`} onClick={() => setIsExpandSide(!isExpandSide)}>
                    {
                        isExpandSide ?
                            <BiMenuAltRight size={28} /> :
                            <BiMenu size={28} />
                    }
                </i>
            </div>
            <ul className='flex flex-col gap-y-4 relative mt-5'>
                <li className='relative group w-full gap-x-4 lead-[48px] h-12'>
                    <div className='whitespace-nowrap items-center cursor-pointer rounded-xl'>
                        <i className='flex items-center justify-center absolute text-white leading-[48px] min-w-12 h-12 text-center rounded-xl z-10 transition-all duration-500 ease-in-out hover:bg-[#F2F2F2] hover:text-[#1D1B31]'
                            onClick={handleSearch}>
                            <CiSearch size={24} />
                        </i>
                        <input type="text" placeholder='Tìm kiếm...' className='bg-[#1D1B31] absolute left-0 top-0 h-full w-full rounded-xl outline-none pl-12 text-lg text-white'
                            onFocus={() => setIsExpandTasks(true)} ref={inputRef} />
                    </div>
                    <span className={`hidden ${!isExpandSide && `group-hover:block absolute top-1/2 left-32 -translate-x-1/2 -translate-y-1/2 rounded-md h-8 w-32 bg-white leading-8 shadow-[0_5px_10px_rgba(0,0,0,0.2)] text-center`}`}>Search</span>
                </li>
                <li className='relative group w-full gap-x-4 lead-[48px] h-12'>
                    <div className={`absolute left-0 flex whitespace-nowrap items-center cursor-pointer rounded-xl transition-all duration-[0.4s] ease-out ${activeTab == 1 ? `bg-white text-[#11101d] rounded-r-none right-[-14px]` : `hover:text-[#11101d] hover:bg-[#F2F2F2] right-0 text-white`}`}
                        onClick={() => setActiveTab(1)}>
                        <i className='flex items-center justify-center leading-[48px] min-w-12 h-12 text-center rounded-xl z-10'><FaRankingStar size={24} /></i>
                        <span className={`${!isExpandSide ? `opacity-0` : 'opacity-100'}`}>Kết quả</span>
                    </div>
                    <span className={`hidden ${!isExpandSide ? `group-hover:block absolute top-1/2 left-32 -translate-x-1/2 -translate-y-1/2 rounded-md h-8 w-32 bg-white leading-8 shadow-[0_5px_10px_rgba(0,0,0,0.2)] text-center` : ``}`}>Kết quả</span>
                </li>

                <li className='relative group w-full gap-x-4 lead-[48px] h-12'>
                    <div className={`absolute left-0 flex whitespace-nowrap items-center cursor-pointer rounded-xl transition-all duration-[0.4s] ease-out ${activeTab == 2 ? `bg-white text-[#11101d] rounded-r-none right-[-14px]` : `hover:text-[#11101d] hover:bg-[#F2F2F2] right-0 text-white`}`}
                        onClick={() => setActiveTab(2)}>
                        <i className='flex items-center justify-center leading-[48px] min-w-12 h-12 text-center rounded-xl z-10'><PiFileLight size={24} /></i>
                        <span className={`${!isExpandSide ? `opacity-0` : 'opacity-100'}`}>Log giao tiếp</span>
                    </div>
                    <span className={`hidden ${!isExpandSide ? `group-hover:block absolute top-1/2 left-32 -translate-x-1/2 -translate-y-1/2 rounded-md h-8 w-32 bg-white leading-8 shadow-[0_5px_10px_rgba(0,0,0,0.2)] text-center` : `hidden`}`}>Log giao tiếp</span>
                </li>
                <li className='relative group w-full gap-x-4 lead-[48px] h-12'>
                    <div className= {`absolute left-0 flex whitespace-nowrap items-center cursor-pointer rounded-xl transition-all duration-[0.4s] ease-in-out z-10 ${activeTab == 3 ? `bg-white text-[#11101d] rounded-r-none right-[-14px]` : `hover:text-[#11101d] hover:bg-[#F2F2F2] right-0 text-white`} ${isExpandTasks && isExpandSide? `rounded-bl-none` : ``}`}
                        onClick={() => setActiveTab(3)}>
                        <i className='flex items-center justify-center leading-[48px] min-w-12 h-12 text-center rounded-xl z-10'><FaTasks size={24} /></i>
                        <span className={`${!isExpandSide ? `opacity-0` : 'opacity-100 '} transition-all ease-out duration-700`}>Danh sách bài tập</span>
                        <i className={`ml-1 p-1 hover:bg-[#11101d] hover:text-white rounded-full ${isExpandSide ? `block` : `hidden`}`}
                            onClick={() => setIsExpandTasks(!isExpandTasks)}>
                            {
                                isExpandTasks ?
                                    <FaChevronDown /> :
                                    <FaChevronRight />
                            }
                        </i>
                    </div>
                    <span className={`hidden ${!isExpandSide ? `group-hover:block absolute top-1/2 left-32 -translate-x-1/2 -translate-y-1/2 rounded-md h-8 w-32 bg-white leading-8 shadow-[0_5px_10px_rgba(0,0,0,0.2)] text-center` : ``}`}>Bài tập</span>
                    <div dir='rtl' className={`${isExpandTasks && isExpandSide ? 'opacity-100' : 'max-h-0 opacity-0'} absolute top-12 left-0 right-0 rounded-bl-lg overflow-hidden transition-all duration-500 ease-in-out bg-pink-50 mr-[-14px]`}>
                        <ul className='p-2 overflow-auto max-h-80 '>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                            <li className={`leading-10`}>Bài 1</li>
                        </ul>

                    </div>
                </li>

            </ul>




        </div>
    );
};

export default SideBar;