import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


interface Props{
    onClose?:()=>void
    open:boolean
    children?:JSX.Element
}

export const Popup = ({onClose,open,children}:Props)=>{
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absoulte flex justify-center items-center w-full h-full"
          >
            {children}
          </div>
        </Box>
      </Modal>
    );
}