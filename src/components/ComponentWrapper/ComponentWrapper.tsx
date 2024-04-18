import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table, { TableData } from '../Table/Table';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '../../page/PaginationContext'; // Importe o hook usePagination

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  // Formata a data ("dd--MM--aaaa, HH:mm:ss")
  const formattedDate = date.toLocaleString();
  return formattedDate;
}

function ComponentWrapper() {
  const [data, setData] = useState<TableData[]>([]);
  const { currentPage } = usePagination(); // Obtenha o estado atual da página usando o hook usePagination
  
  useEffect(() => {
    const fetchData = async (pageNumber: number) => { // Adicione pageNumber como parâmetro
      try {
        const response = await api.get(`data?_page=${pageNumber}`); // Use o pageNumber na solicitação da API
        console.log('Dados da API:', response.data);
    
        // Acesse a propriedade 'data' para obter os itens
        const responseData = response.data.data;
    
        // Formate a data antes de definir no estado
        const formattedData = responseData.map((item: TableData) => ({
          ...item,
          published_at: formatDate(item.published_at)
        }));
        setData(formattedData);
        console.log('Dados recebidos:', formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData(currentPage); // Chame a função fetchData com currentPage como argumento
  }, [currentPage]); // Adicione currentPage como dependência do useEffect

  console.log('Dados a serem renderizados:', data);

  return (
    <div className='GeneralContainer'>
      <div className='ContentWrapper'>
        <div className='ComponentWrapper'>
          <Header />
          <hr />
          <Search />
          <Table data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default ComponentWrapper;
