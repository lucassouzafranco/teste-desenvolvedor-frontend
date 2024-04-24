import { useState, useContext } from "react";
import "./Menu.css";
import { TbFileTypeCsv } from "react-icons/tb";
import { FaRegPlusSquare } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import Cross from "../../assets/medical_cross_img.png";
import { DataContext } from "../../contexts/DataContext";
import { HiMenuAlt2 } from "react-icons/hi";

interface MenuProps {
  filterAndSortData: () => void;
  openCreateModal: () => void;
  toggleDashboard: () => void;
}

function Menu({ openCreateModal, toggleDashboard }: MenuProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { allData } = useContext(DataContext);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateItem = () => {
    openCreateModal();
  };

  const handleDashboardButtonClick = () => {
    console.log("Dashboard button clicked");
    toggleDashboard();
  };

  const handleExportCSV = () => {
    console.log("Export CSV button clicked");
    console.log("Dados filtrados:", allData);
    const csvContent = "data:text/csv;charset=utf-8," + allData.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");

    // Verifica se o navegador suporta o atributo 'download'
    if ('download' in link) {
      // Usa o método nativo de download de arquivos
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Para navegadores que não suportam o atributo 'download', redireciona para o arquivo
      window.open(encodedUri, '_blank');
    }
  };

  return (
    <div className="MenuContainer">
      {sidebarOpen && (
        <div className="Sidebar">
          <button className="CSVButton" onClick={handleExportCSV}>
            <TbFileTypeCsv className="CSVIcon" />
          </button>
          <button className="CreateButton" onClick={handleCreateItem}>
            <FaRegPlusSquare className="PlusIcon" />
          </button>
          <button className="DashboardButton" onClick={handleDashboardButtonClick}>
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
