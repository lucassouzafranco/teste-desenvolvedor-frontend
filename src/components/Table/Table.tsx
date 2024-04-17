import "./Table.css";

// interface TableData para descrever a estrutura dos dados da tabela
export interface TableData {
  name: string;
  published_at: string;
  company: string;
  active_principles: { name: string }[]; // Atualizado para refletir a estrutura dos princípios ativos
}

function Table({ data }: { data: TableData[] }) {
  return (
    <div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th className="Name">Nome</th>
            <th className="Date">Data</th>
            <th className="Lab">Laboratório</th>
            <th className="Principle">Princípio Ativo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.published_at}</td>
              <td>{item.company}</td>
              <td>
                {/* Renderiza o nome do princípio ativo */}
                {item.active_principles[0].name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
