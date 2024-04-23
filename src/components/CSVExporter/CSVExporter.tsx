import React, { useEffect } from 'react';
import { TableData } from '../../types/TableData';
import './CSVExporter.css'; 

interface CSVExporterProps {
  data: TableData[]; // Certifique-se de que os dados correspondem à interface TableData
}

const CSVExporter: React.FC<CSVExporterProps> = ({ data }) => {
  useEffect(() => {
    exportToCSV(data);
  }, [data]);

  const exportToCSV = (dataToExport: TableData[]) => {
    console.log("Dados a serem exportados:", dataToExport);
    // Converte os dados da tabela em formato CSV
    const csvContent = "data:text/csv;charset=utf-8," + dataToExport.map(row => Object.values(row).join(",")).join("\n");
    console.log("Conteúdo CSV:", csvContent);
    // Codifica o conteúdo em URI
    const encodedUri = encodeURI(csvContent);
    console.log("URI Codificada:", encodedUri);
    // Cria um link para download
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    // Adiciona o link ao corpo do documento e aciona o download
    document.body.appendChild(link);
    console.log("Link criado:", link);
    link.click();
  };

  return (
    <button className='ExportCSVButton'>Exportar CSV</button>
  );
};

export default CSVExporter;
