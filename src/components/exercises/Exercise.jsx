import React, { useEffect, useState } from 'react';

const Exercise = (props) => {
    const exName = props.exName;
    const [fileContent, setFileContent] = useState({})
    useEffect(() => {
        console.log(exName)
        fetch(`/static/exercises/${exName}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setFileContent(data)
            })
            .catch(err => console.log('cannot find exercise!'))
    }, [exName])
    return (
        <div className='flex items-center px-6 py-8'>
            <div className='rounded-md bg-white px-6 py-4 w-full'>
                <div className='text-xl font-bold'>{fileContent.name}</div>
                <div className='text-lg whitespace-pre-line leading-10'>
                    {fileContent.content}
                </div>
            </div>
        </div>
    );
};

export default Exercise;