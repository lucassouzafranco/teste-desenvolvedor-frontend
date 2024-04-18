import React, { useState } from 'react';
import './Search.css';
import CSVExporter from '../CSVExporter/CSVExporter';
import { TableData } from '../Table/Table';

interface SearchProps {
  onSearch: (searchTerm: string, data: TableData[]) => void;
  data: TableData[]; // Adicionando a propriedade data
}

const Search: React.FC<SearchProps> = ({ onSearch, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Aguardar 1.2 segundos antes de chamar a função de busca
    setTimeout(() => {
      onSearch(value, data); // Passando os dados para a função onSearch
    }, 1200);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm, data); // Passando os dados para a função onSearch
    }
  };

  return (
    <div className="SearchContainer">
      <div className="SearchBox">
        <input
          type="text"
          placeholder="Nome do produto ou laboratório"
          className="SearchInput"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <CSVExporter data={data}/>
    </div>
  );
};

export default Search;
