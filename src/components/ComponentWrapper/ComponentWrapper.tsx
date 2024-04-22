import React, { useState, useEffect } from "react";
import "./ComponentWrapper.css";
import Header from "../Header/Header";
import Table from "../Table/Table";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import { DataContext } from "../../context/DataContext";
import { TableData } from "../../types/TableData";
import { usePagination } from "../../context/PaginationContext";
import Menu from "../Menu/Menu";
import EditModal from "../Modal/EditModal";
import CreateModal from "../Modal/CreateModal";
import DeleteModal from "../Modal/DeleteModal";

interface ComponentWrapperProps {}

const ComponentWrapper: React.FC<ComponentWrapperProps> = () => {
  const { fetchPageData, pageData } = React.useContext(DataContext);
  const { currentPage, goToPage, totalPages } = usePagination();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [selectedOption, setSelectedOption] = useState("DD/MM/YYYY");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [itemDataToEdit, setItemDataToEdit] = useState<TableData | null>(null);

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
    console.log("Search term:", searchTerm);
    console.log("Page data:", pageData);

    if (!searchTerm) {
      console.log("Fetching page data...");
      fetchPageData(currentPage);
    }
  }, [searchTerm, currentPage, fetchPageData]);

  useEffect(() => {
    filterAndSortData(); // Filtra e ordena os dados quando a opção selecionada ou o termo de pesquisa mudar
  }, [searchTerm, selectedOption, pageData]); // Executa quando o termo de pesquisa, a opção selecionada ou os dados mudam

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (option: string) => {
    setSelectedOption(option);
  };

  const filterAndSortData = () => {
    // Filtra os dados com base no termo de pesquisa
    const filtered = pageData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordena os dados com base na opção selecionada
    if (selectedOption === "DD/MM/YYYY") {
      const sortedData = [...filtered].sort((a, b) => {
        const dateA = new Date(a.published_at);
        const dateB = new Date(b.published_at);
        return dateB.getTime() - dateA.getTime();
      });
      setFilteredData(sortedData);
    } else if (selectedOption === "ABC") {
      const sortedData = [...filtered].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setFilteredData(sortedData);
    }
    console.log("Filtered data:", filteredData);
  };

  const handleGoToPage = (pageNumber: number) => {
    goToPage(pageNumber);
  };

  const handleSubmitEdit = async (editedData: TableData) => {
    try {
      // Chame a função editItem para enviar os dados editados para o backend
      await editItem(selectedItemId!, editedData);
      console.log("Edit submitted");
    } catch (error) {
      console.error("Error submitting edit:", error);
    }
  };

  const findItemById = (itemId: string) => {
    return filteredData.find((item) => item.id === itemId);
  };

  return (
    <div className="GeneralContainer">
      <Menu filteredData={filteredData} />
      <div className="ContentWrapper">
        <div className="ComponentWrapper">
          <Header />
          <hr />
          <Search
            onSearch={handleSearch}
            data={pageData}
            onSort={handleSortChange}
          />
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
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onSubmit={() => console.log("Delete submitted")}
            ItemName="Item to be deleted"
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={closeModals}
            onSubmit={handleSubmitEdit}
            initialData={itemDataToEdit}
            ItemName={itemDataToEdit?.name || ""}
          />

          <CreateModal
            isOpen={isCreateModalOpen}
            onClose={closeModals}
            onSubmit={() => console.log("Create submitted")}
            ErrorMessage="Error message here"
            UpdateWalletData={() => console.log("Update wallet data")}
            ItemName="New item"
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentWrapper;
