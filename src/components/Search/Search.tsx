import React, { useState } from 'react';
import './Search.css';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Aguardar 1.2 segundos antes de chamar a função de busca
    setTimeout(() => {
      onSearch(value);
    }, 1200);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
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
        <div className="DropDown">
          <button className="DropButton">Filtrar por</button>
          <div className="DropDownContent">
            <a href="#">Data de publicação</a>
            <a href="#">Ordem alfabética</a>
          </div>
        </div>
      </div>
      <div className="NewMedicationBtnContainer">
        <button
          className="NewMedicationButton"
          onClick={() => onSearch(searchTerm)}
        >
          Novo Medicamento
        </button>
      </div>
    </div>
  );
};

export default Search;
