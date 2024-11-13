// src/api/restaurantService.js

// src/services/restaurantService.js

// Function to search restaurants by query using your Spring Boot backend
export const searchRestaurants = async (query) => {
  const url = `http://localhost:5000/api/search-restaurants?query=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results || [];
    } else {
      console.error(`Error from backend search API (${response.status}): ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    return [];
  }
};


// src/services/restaurantService.js

// Function to get nearby restaurants using the Spring Boot backend
export const getNearbyRestaurants = async (lat, lng) => {
  if (!lat || !lng) {
    console.error("Latitude and Longitude must be provided.");
    return [];
  }

  try {
    // Constructing the URL to call the backend with latitude and longitude
    const url = `http://localhost:5000/api/nearby-restaurants?location=${lat},${lng}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results || [];
    } else {
      console.error(`Error from backend API (${response.status}): ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    return [];
  }
};

export const getPhotoUrl = async (photoReference) => {
  try {
    const response = await fetch(`/api/photo?photoReference=${encodeURIComponent(photoReference)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Convert the response to a blob URL
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      console.error(`Error from backend photo API (${response.status}): ${response.statusText}`);
      return '';
    }
  } catch (error) {
    console.error('Error fetching photo:', error);
    return '';
  }
};
