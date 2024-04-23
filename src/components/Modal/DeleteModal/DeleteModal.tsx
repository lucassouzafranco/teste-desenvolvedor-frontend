import React, { useEffect } from 'react';
import './DeleteModal.css';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  ItemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onSubmit, ItemName }) => {
  const handleSubmit = async () => {
    await onSubmit();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as HTMLElement;
        const modal = document.querySelector('.DeleteModalContent') as HTMLElement;
        if (!modal.contains(target)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="DeleteModal">
          <div className="DeleteModalContent">
            <p>TEM CERTEZA QUE DESEJA EXCLUIR {ItemName}?</p>
            <div className="ButtonContainerDeleteModal">
              <button className="CancelButtonDeleteModal" onClick={onClose}>Cancelar</button>
              <button className="SubmitButtonDeleteModal" onClick={handleSubmit}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
