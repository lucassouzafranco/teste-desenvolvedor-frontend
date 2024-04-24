import React, { useState, useEffect } from "react";
import "./ComponentWrapper.css";
import Header from "../Header/Header";
import Table from "../Table/Table";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import { DataContext } from "../../contexts/DataContext";
import { TableData } from "../../types/TableData";
import { usePagination } from "../../contexts/PaginationContext";
import Menu from "../Menu/Menu";
import EditModal from "../Modal/EditModal/EditModal";
import CreateModal from "../Modal/CreateModal/CreateModal";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import { editItem, removeItem } from "../../services/itemService";
import Dashboard from "../Dashboard/Dashboard"; 

interface ComponentWrapperProps {}

const ComponentWrapper: React.FC<ComponentWrapperProps> = () => {
  const { allData, fetchPageData, pageData, filterAndSortData } =
    React.useContext(DataContext);
  const { currentPage, goToPage, totalPages } = usePagination();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [selectedOption, setSelectedOption] = useState("DD/MM/YYYY");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [itemDataToEdit, setItemDataToEdit] = useState<TableData | null>(null);
  const [showDashboard, setShowDashboard] = useState(false); // Estado para controlar a exibição do Dashboard

  useEffect(() => {
    // Filtra e ordena os dados quando o termo de pesquisa, a opção selecionada ou os dados mudam
    const filteredData = filterAndSortData(
      searchTerm,
      selectedOption,
      pageData
    );
    setFilteredData(filteredData);
  }, [searchTerm, selectedOption, pageData, filterAndSortData]);

  const handleSubmitEdit = async (editedData: TableData) => {
    try {
      await editItem(selectedItemId!, editedData);
      console.log("Edit submitted");

      // Recarrega os dados da página após a edição
      fetchPageData(currentPage);
    } catch (error) {
      console.error("Error submitting edit:", error);
    }
  };

  const openEditModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsEditModalOpen(true);
    const currentItemData = filteredData.find((item) => item.id === itemId);
    setItemDataToEdit(currentItemData);
  };

  const openDeleteModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedItemId(null);
  };

  useEffect(() => {
    // Filtra e ordena os dados quando o termo de pesquisa ou a opção selecionada mudam
    const filteredData = filterAndSortData(
      searchTerm,
      selectedOption,
      allData // Use allData aqui para garantir que todos os dados sejam filtrados e ordenados corretamente
    );
    setFilteredData(filteredData);
  }, [searchTerm, selectedOption, allData, filterAndSortData]);

  
  // Atualiza os dados da página sempre que os dados filtrados mudam
  useEffect(() => {
    // Atualize os dados da página sempre que os dados filtrados mudarem
    fetchPageData(currentPage);
  }, [filteredData, currentPage, fetchPageData]);
  
  

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeItem(itemId);
      console.log("Item removed successfully");

      // Atualize a tabela após a remoção do item
      fetchPageData(currentPage);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleGoToPage = (pageNumber: number) => {
    goToPage(pageNumber);
  };

  const findItemById = (itemId: string) => {
    return filteredData.find((item) => item.id === itemId);
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="GeneralContainer">
      <Menu
        filterAndSortData={filterAndSortData}
        openCreateModal={openCreateModal}
        toggleDashboard={toggleDashboard}
      />

      <div className="ContentWrapper">
        <div className="ComponentWrapper">
          <Header />
          {showDashboard ? (
            <Dashboard allData={allData} /> // Renderiza o Dashboard se showDashboard for true
          ) : (
            <>
              <Search onSearch={handleSearch} onSort={handleSortChange} />
              <Table
                data={filteredData}
                currentPage={currentPage}
                fetchPageData={fetchPageData}
                openEditModal={openEditModal}
                openDeleteModal={openDeleteModal}
                openCreateModal={openCreateModal}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={handleGoToPage}
              />
            </>
          )}

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onSubmit={() => removeItem(selectedItemId!)}
            ItemName={
              selectedItemId
                ? findItemById(selectedItemId)?.name || "Item to be deleted"
                : "Item to be deleted"
            }
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={closeModals}
            onSubmitEdit={handleSubmitEdit}
            initialData={itemDataToEdit}
            ItemName={itemDataToEdit?.name || ""}
          />

          <CreateModal
            isOpen={isCreateModalOpen}
            onClose={closeModals}
            onSubmit={() => console.log("Create submitted")}
            ErrorMessage="Error message here"
            ItemName="New item"
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentWrapper;
