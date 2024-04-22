import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api";
import { Data } from "../types/TableData";

export interface ActivePrinciple {
  id: string;
  name: string;
}

export interface DataContextType {
  allData: Data[];
  pageData: Data[];
  fetchData: () => Promise<void>;
  fetchPageData: (pageNumber: number) => Promise<void>;
}

export const DataContext = createContext<DataContextType>({
  allData: [],
  pageData: [],
  fetchData: async () => {},
  fetchPageData: async (pageNumber = 1) => {}, // Definindo o valor padrão para pageNumber como 1
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allData, setAllData] = useState<Data[]>([]);
  const [pageData, setPageData] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await api.get<Data[]>("data");

      // Mapeando os dados da resposta para extrair apenas as informações relevantes
      const extractedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        published_at: formatDate(item.published_at),
        company: item.company,
        active_principle_name: item.active_principles?.[0]?.name || "", // Se houver ativo, pegue o nome; caso contrário, use uma string vazia
      }));

      // Armazenando os dados
      setAllData(extractedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPageData = async (pageNumber: number): Promise<void> => {
    try {
      const response = await api.get<Data[]>(`data?_page=${pageNumber}`);

      // Verificar se response.data é um objeto com a propriedade 'data'
      const responseData = response.data;
      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        // Acessar a propriedade 'data' para obter o array de objetos
        const dataArray = responseData.data;

        // Agora você pode iterar sobre 'dataArray' para extrair as informações necessárias
        const extractedPageData = dataArray.map((item) => ({
          id: item.id,
          name: item.name,
          published_at: formatDate(item.published_at),
          company: item.company,
          active_principle_name: item.active_principles?.[0]?.name || "",
        }));

        // Armazenando os dados da página atual
        setPageData(extractedPageData);
      } else {
        console.error("Invalid response data:", responseData);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    // Remova a parte '.000Z' do final da string de data
    return dateString.replace(".000Z", "");
  };

  return (
    <DataContext.Provider
      value={{ allData, pageData, fetchData, fetchPageData }}
    >
      {children}
    </DataContext.Provider>
  );
};
