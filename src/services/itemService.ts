import { api } from './api';
import TableData from '../types/TableData';

export async function removeItem(itemId: string): Promise<void> {
  try {
    console.log('Removing item with ID:', itemId);
    
    // Faz uma solicitação DELETE para remover o item com o ID especificado
    await api.delete(`data/${itemId}`);
    
    console.log('Item removed successfully.');
  } catch (error) {
    console.error('Error removing item:', error);
    throw new Error('Failed to remove item.');
  }
}

export async function editItem(itemId: string, newData: TableData): Promise<TableData> {
  try {
    console.log('Editing item with ID:', itemId);
    console.log('New data:', newData);
    
    const response = await api.put(`data/${itemId}`, newData);
    console.log('Edit response:', response);
    
    return response.data;
  } catch (error) {
    console.error('Error editing item:', error);
    throw new Error('Failed to edit item.');
  }
}

// Função para gerar um ID único
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const createItem = async (itemData: any): Promise<void> => {
  try {
    if (!itemData.name || !itemData.company || !itemData.active_principles) {
      throw new Error('Nome, laboratório e princípio ativo são campos obrigatórios.');
    }

    // Define valores padrão para os campos não obrigatórios
    const newItemData = {
      id: generateUUID(), // Gera um ID único
      name: itemData.name,
      published_at: formatDate(new Date()), // Data de publicação atual
      company: itemData.company,
      documents: [], // Valor padrão para documentos
      active_principles: [
        {
          id: generateUUID(),
          name: itemData.active_principles
        }
      ]
    };

    console.log("Creating new item:", newItemData);
    // Chamada à API para criar o novo item
    await api.post('data', newItemData);
    console.log("New item created successfully!");
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error('Failed to create item.');
  }
};

// Função para formatar a data no formato desejado
const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
};
