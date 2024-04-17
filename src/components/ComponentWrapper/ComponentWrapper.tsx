import './ComponentWrapper.css';
import Header from '../Header/Header';
import Table, { TableData } from '../Table/Table';
import Search from '../Search/Search';

function ComponentWrapper() {
  // Dados de exemplo para a tabela
  const data: TableData[] = [ 
    { nome: 'Produto 1', descricao: 'Descrição do Produto 1', preco: 10.99 },
    { nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 15.99 },
    
  ];

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