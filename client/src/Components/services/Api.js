// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:12005/api/admin';

// Set up axios instance with credentials included
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies (auth_token) are sent with requests
});

// Fetch all food items (Public route)
export const fetchAllFoodItems = async () => {
  try {
    const response = await apiClient.get('/foods');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching food items: ${error.response?.data?.error || error.message}`);
  }
};

// Get count of all food items (Public route)
export const getFoodItemsCount = async () => {
  try {
    const response = await apiClient.get('/foods/count');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching food items count: ${error.response?.data?.error || error.message}`);
  }
};

export const addFoodItem = async (foodItem) => {
  const formData = new FormData();
  formData.append('name', foodItem.name);
  formData.append('category', foodItem.category);
  formData.append('price', foodItem.price);
  formData.append('image', foodItem.image); // Ensure the key matches your backend

  try {
    const response = await apiClient.post('/food', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error adding food item: ${error.response?.data?.error || error.message}`);
  }
};
// Admin: Delete a food item by ID
export const deleteFoodItem = async (id) => {
  try {
    const response = await apiClient.delete(`/food/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting food item: ${error.response?.data?.error || error.message}`);
  }
};

// Admin: Update a food item by ID
export const updateFoodItem = async (id, updatedItem) => {
  const formData = new FormData();
  formData.append('name', updatedItem.name);
  formData.append('category', updatedItem.category);
  formData.append('price', updatedItem.price);
  if (updatedItem.image) {
    formData.append('image', updatedItem.image);
  }

  try {
    const response = await apiClient.put(`/food/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating food item: ${error.response?.data?.error || error.message}`);
  }
};

// Admin: Fetch all users
export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.response?.data?.error || error.message}`);
  }
};

// Admin: Edit a user by ID
export const editUser = async (id, updatedUser) => {
  try {
    const response = await apiClient.put(`/user/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error(`Error editing user: ${error.response?.data?.error || error.message}`);
  }
};

// Admin: Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.response?.data?.error || error.message}`);
  }
};
