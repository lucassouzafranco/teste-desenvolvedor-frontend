import React, { useContext } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import './Table.css';
import { DataContext } from '../../context/DataContext';
import { Data, ActivePrinciple } from '../../context/DataContext';


const Table: React.FC = () => {
  const { pageData } = useContext(DataContext);
  const dataArray = pageData.data || []; // Acessar a propriedade 'data' ou inicializar um array vazio

  console.log('Type of pageData:', typeof pageData);
  console.log('Content of pageData:', pageData);

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
          {dataArray.map((item:Data) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.published_at}</td>
              <td>{item.company}</td>
              <td>
              {item.active_principles.map((principle: ActivePrinciple) => (

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
