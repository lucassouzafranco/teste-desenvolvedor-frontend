import { useState } from 'react';
import './Menu.css';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import medical_cross_img from '../../assets/medical_cross_img.png';
import { FaTable } from "react-icons/fa";
import { BsFiletypePdf } from "react-icons/bs";
import CSVExporter from '../CSVExporter/CSVExporter';


function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='MenuContainer'>
      {sidebarOpen && (
        <div className="Sidebar">
          <button className='SideBarButton' onClick={toggleSidebar}>
            <HiMenuAlt2 className='WhiteIcon' />
          </button>
          <button className='TableButton'>
            <FaTable className='TableIcon'/>
          </button>
        </div>
      )}
      <div className={`MenuContent ${sidebarOpen ? 'SidebarOpen' : ''}`}>
        <button className='SideBarButton' onClick={toggleSidebar}>
          {!sidebarOpen && <HiMenuAlt2 className={`MenuIcon ${sidebarOpen ? 'WhiteIcon' : ''}`}/>}
        </button>
        <div className='TitleAndLogo'>
          Pharma.Lib 
          <img 
            src={medical_cross_img} 
            alt='medical cross' 
            className='Logo'
          />
        </div>
        <IoPerson className='MenuIcon'/>
      </div>
    </div>
  );
}

export default Menu;
