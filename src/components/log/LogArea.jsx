import React from 'react';
const LogArea = ({ filterValue, messages, newMessage }) => {
    return (

        <div className="w-full mt-4 border-t-2 border-[#DDDDE3] border-solid h-[90%] p-4 overflow-y-scroll">
            <div className='flex h-10 font-bold'>
                <div className="flex-1 text-left">Thời gian</div>
                <div className="flex-1 text-left">Mã bài đã submit</div>
                <div className="flex-1 text-left">Trạng thái</div>
                <div className="flex-1 text-left">Message</div>
            </div>
            <div>
                {messages.filter((value) => value).map((message, index) => (
                    <div key={index} className={`flex  transition-all duration-500 ${message.id === newMessage?.id ? '!font-bold' : ''}`}>
                        <div className='flex-1'>{message.createdAt}</div>
                        <div className='flex-1'>{message.alias}</div>
                        <div className={`flex-1 ${message.code==='ACCEPTED' ? `text-green-500` : `text-red-500`}`}>{message.code}</div>
                        <div className='flex-1 '>{message.message}</div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default LogArea;