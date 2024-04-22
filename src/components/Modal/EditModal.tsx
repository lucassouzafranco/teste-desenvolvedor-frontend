import React from "react";
import Modal from "./Modal";
import { ModalProps } from "./Modal";
import "./Modal.css";

interface EditModalProps extends ModalProps {
  ItemName: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  ErrorMessage,
  UpdateWalletData,
  ItemName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      ErrorMessage={ErrorMessage}
      UpdateWalletData={UpdateWalletData}
      Title={`Editar ${ItemName}`}
    >
      <div className="InputContainer">
        <label><h5>Nome do produto:</h5></label>
        <input type="text" placeholder={ItemName} className="Input"/>

        <label><h5>Empresa:</h5></label>
        <input type="text" placeholder={ItemName} className="Input"/>

        <label><h5>Princípio Ativo:</h5></label>
        <input type="text" placeholder={ItemName} className="Input"/>

      </div>
    </Modal>
  );
};

export default EditModal;
