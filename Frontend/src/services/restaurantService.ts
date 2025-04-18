import { getAuthToken, removeAuthToken } from "./authService";

const API_URL = "http://localhost:5000/api";

// Helper function for API calls with authentication
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    });

    // Debug information
    console.log(`API call to ${endpoint}, status: ${response.status}`);

    // For debugging - log response details
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error response: ${errorText}`);

      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || `Error: ${response.status}`);
      } catch (e) {
        throw new Error(`Error: ${response.status}`);
      }
    }

    // Handle 401 Unauthorized specifically
    if (response.status === 401) {
      // Token is invalid or expired - remove it
      removeAuthToken();
      throw new Error("Your session has expired. Please log in again.");
    }

    return response.json();
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
};

// Restaurant profile services
export const getRestaurantProfile = () => {
  return fetchWithAuth("/restaurant/profile");
};

export const updateRestaurantProfile = (data: any) => {
  return fetchWithAuth("/restaurant/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Restaurant status service
export const updateOpenCloseStatus = (isOpen: boolean) => {
  return fetchWithAuth("/restaurant/status", {
    method: "PUT",
    body: JSON.stringify({ openCloseStatus: isOpen }),
  });
};

// Menu item services
export const getMenuItems = () => {
  return fetchWithAuth("/restaurant/menu");
};

// Ensure payload format matches backend expectations
export const addMenuItem = (data: any) => {
  // Make sure data has all required fields in the right format
  const payload = {
    name: data.name,
    description: data.description || "",
    price: Number(data.price),
    category: data.category,
    image: data.image || "",
    isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
  };

  console.log("Sending menu item data:", payload);

  return fetchWithAuth("/restaurant/menu", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateMenuItem = (id: string, data: any) => {
  return fetchWithAuth(`/restaurant/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteMenuItem = (id: string) => {
  return fetchWithAuth(`/restaurant/menu/${id}`, {
    method: "DELETE",
  });
};

// Order services
export const getRestaurantOrders = () => {
  return fetchWithAuth("/order");
};

export const updateOrderStatus = (id: string, status: string) => {
  return fetchWithAuth(`/order/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};
