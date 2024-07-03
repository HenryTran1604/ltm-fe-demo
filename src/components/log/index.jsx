import React, { useState } from 'react';
import SearchBar from './SearchBar';
import LogArea from './LogArea';

const Log = () => {
    const [filterValue, setFilterValue] = useState('')

    return (
        <div className='bg-white rounded-lg p-4 h-full shadow-[0px_2px_10px_#00000014] overflow-hidden'>
            <SearchBar filterValue={filterValue} setFilterValue={setFilterValue} />
            <LogArea filterValue={filterValue} />
        </div>

    );
};

export default Log;