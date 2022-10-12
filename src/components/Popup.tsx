import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


interface Props{
    onClose?:()=>void
    open:boolean
}

export const Popup = ({onClose,open,children}:React.FC<Props>)=>{
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='absoulte flex justify-center items-center w-full h-full' onClick={(e)=>{
                // e.stopPropagation()
                // onClose()
            }}>
                {children}
            </div>
        </Modal>
    );
}