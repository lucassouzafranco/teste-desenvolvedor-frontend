import React, { useState, useEffect, useRef } from "react";
import "./CreateModal.css";
import { createItem, generateUUID } from "../../../services/itemService";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    active_principles: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Verifica se todos os campos estão preenchidos
      if (!formData.name || !formData.company || !formData.active_principles) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Gera um ID compatível com a API
      const id = generateUUID();

      // Chama a função do ItemService para criar o novo item
      await createItem({
        id, // ID gerado
        name: formData.name, // Nome do produto
        company: formData.company, // Empresa
        active_principles: formData.active_principles, // Princípio ativo
        published_at: new Date().toISOString(), // Data de publicação atual
        documents: [], // Documentos vazios como padrão
      });

      // Fecha o modal após a criação do item
      onClose();
    } catch (error) {
      console.error("Error creating item:", error);
      // Trate o erro conforme necessário
      alert("Erro ao criar o item. Verifique o console para mais detalhes.");
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="CreateModal">
          <div className="CreateModalContent" ref={modalRef}>
            <h2>Criar novo produto</h2>
            <div className="InputContainer">
              <label>
                <h5>Nome do produto:</h5>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="Input"
              />

              <label>
                <h5>Empresa:</h5>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="Input"
              />

              <label>
                <h5>Princípio ativo:</h5>
              </label>
              <input
                type="text"
                name="active_principles"
                value={formData.active_principles}
                onChange={handleChange}
                className="Input"
              />
            </div>
            <div className="ButtonContainerCreateModal">
              <button className="SubmitButtonCreateModal" onClick={handleSubmit}>
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
