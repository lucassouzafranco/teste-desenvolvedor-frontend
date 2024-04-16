import './Menu.css';
import { HiMenuAlt2 } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import medical_cross_img from '../../assets/medical_cross_img.png';

function Menu() {
  return (
    <div className='MenuContainer'>
      <div className='MenuContent'>
        <button className='SideBarButton'>
          <HiMenuAlt2 className='MenuIcon'/>
        </button>
        <div className='TitleAndLogo'>
          PHARMA.LIB 
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