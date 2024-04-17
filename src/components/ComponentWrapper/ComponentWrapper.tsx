import { useEffect, useState } from 'react';
import axios from 'axios';
import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table, { TableData } from '../Table/Table';
import Search from '../Search/Search';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  // Formata a data ("dd--MM--aaaa, HH:mm:ss")
  const formattedDate = date.toLocaleString();
  return formattedDate;
}

function ComponentWrapper() {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_DATA_ENDPOINT}`);
        console.log('Dados da API:', response.data);
        // Formate a data antes de definir no estado
        const formattedData = response.data.map((item: TableData) => ({
          ...item,
          published_at: formatDate(item.published_at)
        }));
        setData(formattedData);
        console.log('Dados recebidos:', formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Dados a serem renderizados:', data);

  return (
    <div className='GeneralContainer'>
      <div className='ContentWrapper'>
        <div className='ComponentWrapper'>
          <Header />
          <hr />
          <Search />
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}

export default ComponentWrapper;
