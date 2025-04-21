import React, { ReactNode } from 'react'
import ModalHeader from './ModalHeader'

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    
        <dialog open className=''>
            <div className="">
            
                <ModalHeader closeModal={closeModal} />
               
                {children}
            
            </div>

        </dialog>
  )
  
}

export default Modal
