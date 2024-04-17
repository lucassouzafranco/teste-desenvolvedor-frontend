import './Table.css';

// interface TableData para descrever a estrutura dos dados da tabela
export interface TableData {
  nome: string;
  descricao: string;
  preco: number;
}

function Table({ data }: { data: TableData[] }) {
  return (
    <div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Laboratório</th>
            <th>Princípio Ativo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
