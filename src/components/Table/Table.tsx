import React, { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import './Table.css';
import { DataContext } from '../../context/DataContext';
import { Data } from '../../types/TableData';

interface TableProps {
  data?: Data[]; // Torna a propriedade data opcional
  currentPage?: number; // Adiciona currentPage como uma propriedade opcional
  fetchPageData?: (pageNumber: number) => Promise<void>; // Adiciona fetchPageData como uma propriedade opcional
  openEditModal: (id: string) => void; // Adiciona a função openEditModal como uma propriedade obrigatória
  openDeleteModal: (id: string) => void; // Adiciona a função openDeleteModal como uma propriedade obrigatória
}

const Table: React.FC<TableProps> = ({ data, openEditModal, openDeleteModal }) => {
  const { pageData } = useContext(DataContext);
  const [tableData, setTableData] = useState<Data[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setTableData(pageData);
    } else {
      setTableData(data);
    }
  }, [data, pageData]);

  const handleEditClick = (id: string) => {
    console.log('Edit button clicked for id:', id);
    openEditModal(id);
  };

  const handleDeleteClick = (id: string) => {
    console.log('Delete button clicked for id:', id);
    openDeleteModal(id);
  };

  return (
    <div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th className="Name">Nome</th>
            <th className="Date">Data</th>
            <th className="Lab">Laboratório</th>
            <th className="Principle">Princípio Ativo</th>
            <th className="Actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: Data) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.published_at}</td>
              <td>{item.company}</td>
              <td>
                {item.active_principle_name ? (
                  <span>{item.active_principle_name}</span>
                ) : (
                  <span>N/A</span>
                )}
              </td>
              <td>
                <div className="ActionIcons">
                  <MdEdit className="EditIcon" onClick={() => handleEditClick(item.id)} />
                  <IoMdTrash className="TrashIcon" onClick={() => handleDeleteClick(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
