import { api } from './api';
import { TableData } from '../types/TableData';

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

export async function removeItem(itemId: string): Promise<void> {
  try {
    console.log('Removing item with ID:', itemId);
    
    await api.delete(`data/${itemId}`);
    console.log('Item removed successfully.');
  } catch (error) {
    console.error('Error removing item:', error);
    throw new Error('Failed to remove item.');
  }
}
