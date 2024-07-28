import React from 'react';
const LogArea = ({filterValue, messages}) => {
    return (
        <div className='mt-4 border-t-2 border-[#DDDDE3] border-solid h-[90%] p-4 overflow-y-scroll'>
            {messages.filter((value, _) => value.content?.includes(filterValue)).map((message, index) => (
                <div key={index} className='text-ellipsis overflow-hidden whitespace-nowrap flex gap-x-10'>
                    <div className='w-44'>{message.createdAt}</div>
                    <div className='ml-4'>{message.content}</div>
                </div>
            ))}
        </div>
    );
};

export default LogArea;