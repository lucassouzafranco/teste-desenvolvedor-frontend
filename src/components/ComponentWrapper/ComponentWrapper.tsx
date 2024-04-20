import React, { useState, useEffect } from 'react';
import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table from '../Table/Table';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { DataContext } from '../../context/DataContext';
import { usePagination } from '../../context/PaginationContext';
import { TableData } from '../../types/TableData'; 

// Restante do código


interface ComponentWrapperProps {}

const ComponentWrapper: React.FC<ComponentWrapperProps> = () => {
  const { fetchPageData } = React.useContext(DataContext);
  const { currentPage } = usePagination();
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPageData(currentPage);
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchPageData, currentPage]);

  const handleSearch = () => {
    // Lógica de pesquisa 
  };

  return (
    <div className="GeneralContainer">
      <div className="ContentWrapper">
        <div className="ComponentWrapper">
          <Header />
          <hr />
          <Search onSearch={handleSearch} data={tableData} />
          <Table data={tableData} currentPage={currentPage} fetchPageData={fetchPageData} />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ComponentWrapper;
