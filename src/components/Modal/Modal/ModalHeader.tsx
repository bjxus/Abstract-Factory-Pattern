import React from 'react'

interface ModalProps {
    closeModal: () => void;
}

const ModalHeader: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Vista previa completa</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
  )
}

export default ModalHeader
