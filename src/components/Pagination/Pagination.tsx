// Pagination.tsx

import React from 'react';
import { usePagination } from '../../page/PaginationContext';

const Pagination: React.FC = () => {
  const { currentPage, nextPage, prevPage, goToPage } = usePagination();

  console.log('Current page:', currentPage);

  return (
    <div>
      <button onClick={() => { prevPage(); console.log('Prev page clicked') }} disabled={currentPage === 1}>Previous</button>
      <button onClick={() => { goToPage(1); console.log('Page 1 clicked') }}>1</button>
      <button onClick={() => { goToPage(2); console.log('Page 2 clicked') }}>2</button>
      <button onClick={() => { goToPage(3); console.log('Page 3 clicked') }}>3</button>
      <button onClick={() => { nextPage(); console.log('Next page clicked') }}>Next</button>
    </div>
  );
};

export default Pagination;
