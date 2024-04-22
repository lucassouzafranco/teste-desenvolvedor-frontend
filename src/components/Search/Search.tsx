import React from "react";
import "./Search.css";
import CSVExporter from "../CSVExporter/CSVExporter";
import { TableData } from "../../types/TableData";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  data: TableData[]; // Adicione a propriedade data
  onSort: (option: string) => void; // Adicione a propriedade onSort
}

const Search: React.FC<SearchProps> = ({ onSearch, data, onSort }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSort(selectedOption); // Chama a função onSort com a opção selecionada
  };

  return (
    <div className="SearchContainer">
      <div className="SearchBox">
        <input
          type="text"
          placeholder="Nome do produto ou laboratório"
          className="SearchInput"
          onChange={(event) => onSearch(event.target.value)}
        />
        <select className="Dropdown" onChange={handleSortChange}>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="ABC">ABC</option>
        </select>
      </div>
      <CSVExporter data={data} />
    </div>
  );
};

export default Search;
