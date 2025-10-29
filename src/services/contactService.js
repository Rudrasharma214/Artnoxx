import api from './api'

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact/contact', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchContactMessages = async () => {
  try {
    const response = await api.get('/contact/contact');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const response = await api.delete(`/contact/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
