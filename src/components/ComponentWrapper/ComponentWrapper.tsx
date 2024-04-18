import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table, { TableData } from '../Table/Table';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../page/PaginationContext';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString();
  return formattedDate;
}

function ComponentWrapper() {
  const [data, setData] = useState<TableData[]>([]);
  const [originalData, setOriginalData] = useState<TableData[]>([]);
  const { currentPage } = usePagination();

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await api.get(`data?_page=${pageNumber}`);
      const responseData = response.data.data;
      const formattedData = responseData.map((item: TableData) => ({
        ...item,
        published_at: formatDate(item.published_at),
      }));
      
      setData(formattedData); 
      setOriginalData(formattedData); // Salva os dados originais ao receber a resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleSearch = (searchTerm: string) => {
    // Verificar se o termo de busca está vazio
    if (!searchTerm.trim()) {
      // Se estiver vazio, exibir todos os dados originais
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <div className="GeneralContainer">
      <div className="ContentWrapper">
        <div className="ComponentWrapper">
          <Header />
          <hr />
          <Search onSearch={handleSearch} />
          <Table data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default ComponentWrapper;
