import React from 'react'
import { X } from 'lucide-react'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'
      onClick={onClose}
    >
      <div 
        className='bg-blue text-white p-6 rounded-lg w-80 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className='absolute top-2 right-2'>
          <X />
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal