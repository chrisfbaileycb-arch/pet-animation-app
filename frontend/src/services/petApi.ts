import { ApiClient } from './apiClient';
import { Pet } from '../types';

export const petApi = {
  getPets: async (): Promise<{ pets: Pet[] }> => ApiClient.get('/pets'),
  createPet: async (petData: Partial<Pet>): Promise<{ pet: Pet }> => ApiClient.post('/pets', petData),
  updatePet: async (id: string, petData: Partial<Pet>): Promise<{ pet: Pet }> => ApiClient.put(`/pets/${id}`, petData)
};
