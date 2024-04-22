import React from 'react';
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

  return (
    <>
      {isOpen && (
        <div className="DeleteModal">
          <div className="DeleteModalContent">
            <p>Tem certeza que deseja excluir {ItemName}?</p>
            <div className="ButtonContainer">
              <button className="CancelButton" onClick={onClose}>Cancelar</button>
              <button className="SubmitButton" onClick={handleSubmit}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
