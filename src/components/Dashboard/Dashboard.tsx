import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { TableData } from "../../types/TableData";

interface DashboardProps {
  allData: TableData[]; 
}

const Dashboard: React.FC<DashboardProps> = ({ allData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    if (!allData) return;

    const countItems = (data: TableData[]) => {
      const itemCounts: { [key: string]: number } = {}; 
      data.forEach((item) => {
        const itemName = item.name.split(" ")[0];
        if (itemCounts[itemName]) {
          itemCounts[itemName]++;
        } else {
          itemCounts[itemName] = 1;
        }
      });
      return itemCounts;
    };

    const formatDataForChart = (itemCounts: {
      [key: string]: number;
    }) => {
      const labels = Object.keys(itemCounts);
      const data = Object.values(itemCounts);
      return {
        labels: labels,
        datasets: [
          {
            label: "Quantidade",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
          },
        ],
      };
    };

    const itemCounts = countItems(allData);
    const chartData = formatDataForChart(itemCounts);
    setChartData(chartData);
  }, [allData]);

  return (
    <div
      className="dashboard-container"
      style={{
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // Desativar a legenda padrão
              },
              tooltip: {
                callbacks: {
                  label: function (
                    tooltipItem: any,
                    data: any
                  ) {
                    const label = data.labels[tooltipItem.index];
                    const value = data.datasets[0].data[tooltipItem.index];
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          }}
        />
        <div style={{ marginLeft: "5em" }}>
          {chartData.labels &&
            chartData.labels.map((label: string, index: number) => (
              <div key={index} style={{}}>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                    marginRight: "5px",
                  }}
                ></span>
                <span>{label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
