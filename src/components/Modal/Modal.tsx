import React, { ReactNode, MouseEvent } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  ErrorMessage?: string;
  children: ReactNode;
  Title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, children, ErrorMessage, Title }) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="Modal" onClick={handleClose}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <h2>{Title}</h2>
            {children}
            {ErrorMessage && <p className="Error">{ErrorMessage}</p>}
            <div className="ButtonContainer">
              <button className="CancelButton" onClick={handleClose}>Cancelar</button>
              <button className="SubmitButton" onClick={handleSubmit}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
