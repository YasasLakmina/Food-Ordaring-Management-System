import React from 'react';
import { XIcon } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
            <XIcon size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>;
};
export default Modal;