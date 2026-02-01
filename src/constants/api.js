// API Configuration Constants
export const API_BASE_URL = "https://grid-backend-r3va.onrender.com";

// API Endpoints
export const API_ENDPOINTS = {
  FRONTPAGE: `${API_BASE_URL}/api/frontpage/`,
  LOGIN: `${API_BASE_URL}/api/login`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  SMARTBAG: (userId) => `${API_BASE_URL}/api/smartbag/${userId}/`,
  ORDERS: (userId) => `${API_BASE_URL}/api/orders/${userId}`,
  PRODUCTS: (productId) => `${API_BASE_URL}/products/${productId}`,
};