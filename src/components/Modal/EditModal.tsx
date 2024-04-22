import React from "react";
import Modal from "./Modal";
import { ModalProps } from "./Modal";
import { TableData } from "../../types/TableData";

interface EditModalProps extends ModalProps {
  ItemName: string;
  onSubmitEdit: (data: TableData) => Promise<void>;
  initialData: TableData | null;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSubmitEdit,
  ErrorMessage,
  UpdateWalletData,
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
      onSubmit();
      UpdateWalletData();
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
            value={editedData.name} // Ajuste aqui para acessar o campo de nome
            onChange={handleInputChange}
            className="Input"
          />

          <label>
            <h5>Empresa:</h5>
          </label>
          <input
            type="text"
            name="company"
            value={editedData.company} // Ajuste aqui para acessar o campo de empresa
            onChange={handleInputChange}
            className="Input"
          />

          <label>
            <h5>Princípio Ativo:</h5>
          </label>
          <input
            type="text"
            name="active_principle_name"
            value={editedData.active_principle_name} // Ajuste aqui para acessar o campo do princípio ativo
            onChange={handleInputChange}
            className="Input"
          />
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
