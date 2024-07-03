import React from 'react';

const LogArea = (props) => {
    const filterValue = props.filterValue;

    return (
        <div className='mt-4 border-t-2 border-[#DDDDE3] border-solid px-4'>
            <div>
                {filterValue}
            </div>
        </div>
    );
};

export default LogArea;