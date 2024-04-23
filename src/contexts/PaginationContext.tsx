import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationContextType {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

interface PaginationProviderProps {
  children: ReactNode;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PaginationContext.Provider value={{ currentPage, nextPage, prevPage, goToPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

export { PaginationContext }; // Exportar o contexto, se necessário
