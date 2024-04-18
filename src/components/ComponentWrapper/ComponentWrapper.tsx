import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table, { TableData } from '../Table/Table';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../page/PaginationContext';
import { parseISO, format } from 'date-fns'; 

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
  
      // Formatar a data de publicação e adicionar ao objeto de dados
      const formattedData = responseData.map((item: TableData) => {
        const formattedItem = {
          ...item,
          published_at: formatApiDate(item.published_at),
        };
        return formattedItem;
      });
  
      console.log('Dados antes da ordenação:', formattedData);
  
      // Ordenar os dados pela data de publicação antes de definir o estado
      const sortedData = formattedData.sort((a, b) => {
        const dateA = new Date(a.published_at);
        const dateB = new Date(b.published_at);
      
        console.log('Date A:', dateA);
        console.log('Date B:', dateB);
      
        console.log('Comparison:', dateA.getTime() - dateB.getTime());
      
        return dateA.getTime() - dateB.getTime();
      });
  
      console.log('Dados após a ordenação:', sortedData);
  
      setData(sortedData);
      setOriginalData(sortedData); // Salva os dados originais ao receber a resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Função para formatar a data da API
  function formatApiDate(dateString: string): string {
    // Primeiro, analisamos a string da data no formato ISO
    const parsedDate = parseISO(dateString);
    // Em seguida, formatamos a data no formato desejado
    const formattedDate = format(parsedDate, 'dd/MM/yyyy, HH:mm:ss');
    return formattedDate;
  }
   
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

  console.log(data);
  return (
    <div className="GeneralContainer">
      <div className="ContentWrapper">
        <div className="ComponentWrapper">
          <Header />
          <hr />
          <Search onSearch={handleSearch} data={data} />
          <Table data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default ComponentWrapper;
