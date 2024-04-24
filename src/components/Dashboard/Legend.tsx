// Importe o useState e useEffect
import React, { useState, useEffect } from "react";

// Defina o componente Legend
const Legend = ({ chartData }) => {
  // Use o useState para armazenar os dados da legenda
  const [legendData, setLegendData] = useState([]);

  // Use o useEffect para atualizar os dados da legenda sempre que chartData mudar
  useEffect(() => {
    // Verifica se chartData está definido
    if (!chartData) return;

    // Extrai os rótulos e cores do chartData
    const labels = chartData.labels || [];
    const backgroundColors = chartData.datasets?.[0]?.backgroundColor || [];

    // Cria um array de objetos representando os dados da legenda
    const legendItems = labels.map((label, index) => ({
      label,
      color: backgroundColors[index] || "",
    }));

    // Define os dados da legenda
    setLegendData(legendItems);
  }, [chartData]);

  // Renderiza a legenda
  return (
    <div className="legend">
      {legendData.map((item, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
          ></span>
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
