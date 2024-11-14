// Function to search restaurants by query using your Spring Boot backend
export const searchRestaurants = async (query, lat, lng, filters) => {
  try {
    // Destructure filters
    const { cuisineType, foodType, priceLevel, minRating } = filters;

    // Construct query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    if (cuisineType) queryParams.append('cuisineType', cuisineType);
    if (foodType) queryParams.append('foodType', foodType);
    if (priceLevel) queryParams.append('priceLevel', priceLevel);
    if (minRating) queryParams.append('minRating', minRating);

    const response = await fetch(`/api/search-restaurants?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results; // Assuming the API returns an array of restaurant objects
    } else {
      console.error(`Error from backend search API (${response.status}): ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error during restaurant search:', error);
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

export const getPhotoUrl = (photoReference) => {
  if (!photoReference) {
    console.error('No photo reference provided');
    return 'https://via.placeholder.com/400'; // Placeholder if no photo reference is provided
  }

  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
  const googlePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photoReference}&key=AIzaSyDewJC5STCF9FQRfe1EAVnU8kJvfsRhLPU`;

  return googlePhotoUrl;
};
