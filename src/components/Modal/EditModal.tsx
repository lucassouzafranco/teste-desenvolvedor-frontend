import React from "react";
import Modal from "./Modal";
import { ModalProps } from "./Modal";
import { TableData } from "../../types/TableData";

interface EditModalProps extends ModalProps {
  ItemName: string;
  onSubmitEdit: (data: TableData) => Promise<void>;
  initialData: TableData | null;
  onSubmitEdit: (data: TableData) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSubmitEdit,
  ErrorMessage,
  ItemName,
  initialData,
}) => {
  const [editedData, setEditedData] = React.useState<TableData | null>(initialData);

  React.useEffect(() => {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      ErrorMessage={ErrorMessage}
      Title={`Editar ${ItemName}`}
    >
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
    </Modal>
  );
};

export default EditModal;
