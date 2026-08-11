import { db } from '../db';
import { Pet, SpeciesType, PetColorPalette, PetFeatures } from '../models/Pet';

export class PetService {
  async createPet(userId: string, data: { name: string; species: SpeciesType; colors: PetColorPalette; features: PetFeatures }): Promise<Pet> {
    const pet: Pet = {
      id: `pet-${Date.now()}`,
      userId,
      name: data.name,
      species: data.species,
      colors: data.colors,
      features: data.features,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.pets.set(pet.id, pet);
    return pet;
  }

  async getPetsByUser(userId: string): Promise<Pet[]> {
    return Array.from(db.pets.values()).filter(pet => pet.userId === userId);
  }

  async getPetById(petId: string): Promise<Pet | null> {
    return db.pets.get(petId) || null;
  }

  async updatePet(petId: string, userId: string, updates: Partial<Pet>): Promise<Pet> {
    const pet = db.pets.get(petId);
    if (!pet) throw new Error('Pet not found');
    if (pet.userId !== userId) throw new Error('Unauthorized');

    const updatedPet: Pet = {
      ...pet,
      ...updates,
      updatedAt: new Date()
    };

    db.pets.set(petId, updatedPet);
    return updatedPet;
  }

  async deletePet(petId: string, userId: string): Promise<boolean> {
    const pet = db.pets.get(petId);
    if (!pet) return false;
    if (pet.userId !== userId) throw new Error('Unauthorized');

    return db.pets.delete(petId);
  }
}

export const petService = new PetService();
