import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/axios';

export interface Data {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: Document[];
  active_principles: ActivePrinciple[];
}

interface Document {
  id: string;
  expedient: string;
  type: string;
  url: string;
}

export interface ActivePrinciple {
  id: string;
  name: string;
}

export interface DataContextType {
  pageData: Data[];
  fetchData: () => Promise<void>;
  fetchPageData: (pageNumber: number) => Promise<void>;
}

export const DataContext = createContext<DataContextType>({
  pageData: [],
  fetchData: async () => {},
  fetchPageData: async () => {},
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pageData, setPageData] = useState<Data[]>([]);

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get<Data[]>('data');
      setPageData(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPageData = async (pageNumber: number) => {
    try {
      const response = await api.get<Data[]>(`data?_page=${pageNumber}`);
      setPageData(prevData => {
        // Verificando se os novos dados são diferentes dos dados existentes
        return JSON.stringify(prevData) === JSON.stringify(response.data) ? prevData : response.data;
      });
    } catch (error) {
      console.error('Error fetching page data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ pageData, fetchData, fetchPageData }}>
      {children}
    </DataContext.Provider>
  );
};
