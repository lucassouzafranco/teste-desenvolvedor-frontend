import React, { useState } from "react";
import "./Search.css";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  onSort: (option: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("DD/MM/YYYY");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSort(option);
  };

  return (
    <div className="SearchContainer">
      <div className="SearchBox">
        <input
          type="text"
          placeholder="Nome do produto ou laboratório"
          className="SearchInput"
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <select
          className="Dropdown"
          value={selectedOption}
          onChange={handleSortChange}
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="ABC">ABC</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
