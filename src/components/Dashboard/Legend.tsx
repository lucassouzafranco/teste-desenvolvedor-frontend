import React, { useState, useEffect } from "react";

const Legend = ({ chartData }) => {
  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    if (!chartData) return;

    const labels = chartData.labels || [];
    const backgroundColors = chartData.datasets?.[0]?.backgroundColor || [];

    const legendItems = labels.map((label, index) => ({
      label,
      color: backgroundColors[index] || "",
    }));

    setLegendData(legendItems);
  }, [chartData]);

  return (
    <div className="legend">
      {Array.isArray(legendData) &&
        legendData.map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
    </div>
  );
};

export default Legend;
