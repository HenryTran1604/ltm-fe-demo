import React from 'react';

const SearchBar = ({ filterValue, setFilterValue }) => {

    return (
        <div className='flex items-center h-10 p-2 border-[#DDDDE3] border-solid border-2 w-full'>
            <div className='p-2 flex-1'>
                <input className='border-none outline-none rounded-sm w-full' type="text" placeholder='Lọc theo từ khóa ...'
                    value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
            </div>
            <div className='px-2 flex gap-x-4'>
                {
                    filterValue.length !== 0 &&
                    <button onClick={(e) => setFilterValue('')}>
                        <img className='w-5' src="/static/images/icons/closed.png" alt="" />
                    </button>
                }

                <img className='w-5' src="/static/images/icons/search.png" alt="" />
            </div>
        </div>
    );
};

export default SearchBar;