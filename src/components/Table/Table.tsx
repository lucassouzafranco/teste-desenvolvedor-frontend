import React from 'react';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import './Table.css';

// interface TableData para descrever a estrutura dos dados da tabela
export interface TableData {
  id: string;
  name: string;
  published_at: string;
  company: string;
  active_principles: { id: string; name: string }[];
}

interface Props {
  data: TableData[];
}

const Table: React.FC<Props> = ({ data }) => {
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.published_at}</td>
              <td>{item.company}</td>
              <td>
                {item.active_principles.map((principle) => (
                  <span key={principle.id}>{principle.name}<br /></span>
                ))}
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
