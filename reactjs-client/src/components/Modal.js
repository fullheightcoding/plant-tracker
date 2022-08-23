import React, {useEffect} from 'react';

export default function Modal({modalContent, closeModal}) {
    useEffect(() => {
        setTimeout(() => {
            // console.log('before close modal');
            closeModal();
            // console.log('after close modal');
        }, 5000);
    });

    return (
        <div className='modal'>
            <p>{modalContent}</p>
        </div>
    )
}