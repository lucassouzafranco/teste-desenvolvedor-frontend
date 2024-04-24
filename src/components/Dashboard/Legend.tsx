import React, { useState, useEffect } from "react";
import { ChartData } from "chart.js";

interface LegendItem {
  label: string;
  color: string;
}

interface Props {
  chartData: ChartData;
}

const Legend: React.FC<Props> = ({ chartData }) => {
  const [legendData, setLegendData] = useState<LegendItem[]>([]);

  useEffect(() => {
    if (!chartData) return;

    const labels = chartData.labels || [];
    const backgroundColors = chartData.datasets?.[0]?.backgroundColor || [];

    const legendItems: LegendItem[] = labels.map((label, index) => ({
      label,
      color: backgroundColors[index] || "",
    }));

    setLegendData(legendItems);
  }, [chartData]);

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
