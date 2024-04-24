import React, { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import "./Table.css";
import { DataContext } from "../../contexts/DataContext";
import { Data } from "../../types/TableData";

interface TableProps {
  data?: Data[];
  openEditModal: (id: string) => void;
  openDeleteModal: (id: string) => void;
  currentPage: number;
}

const Table: React.FC<TableProps> = ({
  data,
  openEditModal,
  openDeleteModal,
}) => {
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
    console.log("Edit button clicked for id:", id);
    const rowData = tableData.find((item) => item.id === id);
    console.log("Row data:", rowData);
    openEditModal(id);
  };

  const handleDeleteClick = (id: string) => {
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
              <td>{item.active_principle_name || 'N/A'}</td>
              <td>
                <div className="ActionIcons">
                  <MdEdit
                    className="EditIcon"
                    onClick={() => handleEditClick(item.id)}
                  />
                  <IoMdTrash
                    className="TrashIcon"
                    onClick={() => handleDeleteClick(item.id)}
                  />
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
