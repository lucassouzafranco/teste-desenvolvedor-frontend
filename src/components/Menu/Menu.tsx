import React, { useState } from "react";
import "./Menu.css";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import medical_cross_img from "../../assets/medical_cross_img.png";
import { TbFileTypeCsv } from "react-icons/tb";
import CSVExporter from "../CSVExporter/CSVExporter";
import { FaRegPlusSquare } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TableData } from "../../types/TableData";

interface MenuProps {
  filteredData: () => TableData[];
  openCreateModal: () => void;
}
function Menu({ openCreateModal }: MenuProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExportCSV = () => {
    // Obter dados filtrados chamando a função filteredData
    const dataToExport = filteredData();
    console.log("Dados filtrados:", dataToExport);
    // Passa os dados filtrados diretamente para o CSVExporter
    // e aciona a exportação CSV
    CSVExporter(dataToExport);
  };

  const handleCreateItem = () => {
    openCreateModal();
  };

  return (
    <div className="MenuContainer">
      {sidebarOpen && (
        <div className="Sidebar">
          <button className="SideBarButton" onClick={toggleSidebar}>
            <HiMenuAlt2 className="WhiteIcon" />
          </button>
          <button
            className="CSVButton"
            title="Exportar CSV"
            onClick={handleExportCSV}
          >
            <TbFileTypeCsv className="CSVIcon" />
          </button>
          <button className="PlusButton" onClick={handleCreateItem}>
            <FaRegPlusSquare className="PlusIcon" />
          </button>
          <button className="DashboardButton">
            <RxDashboard className="DashboardIcon" />
          </button>
        </div>
      )}
      <div className={`MenuContent ${sidebarOpen ? "SidebarOpen" : ""}`}>
        <button className="SideBarButton" onClick={toggleSidebar}>
          {!sidebarOpen && (
            <HiMenuAlt2
              className={`MenuIcon ${sidebarOpen ? "WhiteIcon" : ""}`}
            />
          )}
        </button>
        <div className="TitleAndLogo">
          Pharma.Lib
          <img src={medical_cross_img} alt="medical cross" className="Logo" />
        </div>
        <IoPerson className="MenuIcon" />
      </div>
    </div>
  );
}

export default Menu;
