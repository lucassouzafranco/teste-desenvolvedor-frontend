import { usePagination } from '../../contexts/PaginationContext';
import './Pagination.css'

const Pagination: React.FC = () => {
  const { goToPage } = usePagination();

  return (
    <div className="paginationContainer">
      <div className="paginationNumbers">
        <button className='paginationNumber' onClick={() => { goToPage(1); console.log('Page 1 clicked') }}>1</button>
        <button className='paginationNumber' onClick={() => { goToPage(2); console.log('Page 2 clicked') }}>2</button>
        <button className='paginationNumber' onClick={() => { goToPage(3); console.log('Page 3 clicked') }}>3</button>
      </div>
    </div>
  );
};

export default Pagination;
