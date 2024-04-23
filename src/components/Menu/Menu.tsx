import React, { useState, useContext } from "react";
import "./Menu.css";
import { TbFileTypeCsv } from "react-icons/tb";
import CSVExporter from "../CSVExporter/CSVExporter";
import { FaRegPlusSquare } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TableData } from "../../types/TableData";
import Cross from "../../assets/medical_cross_img.png";
import { IoPerson } from "react-icons/io5";
import { DataContext } from "../../contexts/DataContext";

interface MenuProps {
  filterAndSortData: () => void;
  openCreateModal: () => void;
}

function Menu({ openCreateModal }: MenuProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { allData } = useContext(DataContext);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExportCSV = () => {
    console.log("Export CSV button clicked");
    const dataToExport = allData;
    console.log("Dados filtrados:", dataToExport);
    // Renderiza o componente CSVExporter com os dados para exportação
    return <CSVExporter data={dataToExport} />;
  };

  const handleCreateItem = () => {
    openCreateModal();
  };

  return (
    <div className="MenuContainer">
      {sidebarOpen && (
        <div className="Sidebar">
          <button className="CSVButton" onClick={handleExportCSV}>
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
          <img src={Cross} alt="medical cross" className="Logo" />
        </div>
        <IoPerson className="MenuIcon" />
      </div>
    </div>
  );
}

export default Menu;
