// src/api/restaurantService.js

// Function to search restaurants by query
export const searchRestaurants = async (query) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/restaurants/search?query=${encodeURIComponent(query)}`);
    
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error searching for restaurants:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    return [];
  }
};

// Function to get nearby restaurants using Google Places API
export const getNearbyRestaurants = async (location) => {
  const apiKey = 'AIzaSyDewJC5STCF9FQRfe1EAVnU8kJvfsRhLPU';
  const googlePlacesURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

  try {
    const url = `${googlePlacesURL}?location=${location.lat},${location.lng}&radius=3000&type=restaurant&key=${apiKey}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data.results; // Return the restaurant results
    } else {
      console.error('Error from Google Places API:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    return [];
  }
};
