// Table.tsx
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
}

const Table: React.FC<TableProps> = ({ data }) => {
  const { pageData } = useContext(DataContext);
  const [tableData, setTableData] = useState<Data[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setTableData(pageData);
    } else {
      setTableData(data);
    }
  }, [data, pageData]);

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
                <ActionIcons />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActionIcons: React.FC = () => {
  return (
    <div className="ActionIcons">
      <MdEdit className="EditIcon" />
      <IoMdTrash className="TrashIcon" />
    </div>
  );
};

export default Table;
