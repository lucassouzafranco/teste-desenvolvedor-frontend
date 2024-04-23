import React, { useState, useEffect } from 'react';
import './EditModal.css';
import { TableData } from '../../../types/TableData';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEdit: (data: TableData) => Promise<void>;
  ErrorMessage?: string;
  ItemName: string;
  initialData: TableData | null;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmitEdit,
  ErrorMessage,
  ItemName,
  initialData,
}) => {
  const [editedData, setEditedData] = useState<TableData | null>(initialData);

  useEffect(() => {
    setEditedData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData) return;
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!editedData) return;
    try {
      await onSubmitEdit(editedData); 
    } catch (error) {
      console.error(error);
    }
  };

  // Event listener para fechar o modal quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const modal = document.querySelector('.EditModalContent') as HTMLElement;
      if (!modal.contains(target)) {
        onClose(); // Fecha o modal
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="EditModal">
          <div className="EditModalContent">
            <h3>{`Editar ${ItemName}`}</h3>
            {ErrorMessage && <p className="ErrorMessage">{ErrorMessage}</p>}
            {editedData !== null && (
              <div className="InputContainer">
                <label>
                  <h5>Nome do produto:</h5>
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="Input"
                />

                <label>
                  <h5>Empresa:</h5>
                </label>
                <input
                  type="text"
                  name="company"
                  value={editedData.company} 
                  onChange={handleInputChange}
                  className="Input"
                />
              </div>
            )}
            <div className="ButtonContainer">
              <button className="CancelButtonEditModal" onClick={onClose}>Cancelar</button>
              <button className="SubmitButtonEditModal" onClick={handleSubmit}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
