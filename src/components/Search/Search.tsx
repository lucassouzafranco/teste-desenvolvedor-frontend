import React, { useState } from 'react';
import './Search.css';

interface Props {
  onSearch: (searchTerm: string) => void;
  onNewMedication: () => void; 
}

const Search: React.FC<Props> = ({ onSearch, onNewMedication }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        <button className="NewMedicationButton" onClick={onNewMedication}>
          Novo Medicamento
        </button>
      </div>
    </div>
  );
};

export default Search;
