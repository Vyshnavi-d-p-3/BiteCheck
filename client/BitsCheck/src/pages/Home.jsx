// src/pages/User/Home.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import MapContainer from '../components/Map';
import { Container,Grid2 } from '@mui/material';
import { getNearbyRestaurants, searchRestaurants } from '../services/restaurantService';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  // Fetch user's current location and nearby restaurants
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);

          // Fetch nearby restaurants
          getNearbyRestaurants(location.lat, location.lng).then((results) => {
            setPlaces(results); // Assuming results is an array of places
          });
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    }
  }, []);

  // Handle search query
  const handleSearch = (query) => {
    if (query) {
      searchRestaurants(query).then((results) => {
        setPlaces(results); // Update the state with search results
      }).catch((error) => {
        console.error("Error during restaurant search:", error);
      });
    } else {
      console.warn("Search query is empty. Please enter a valid query.");
    }
  };

  return (
    <Container maxWidth="lg">
      <SearchBar onSearch={handleSearch} />
      <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
        <Grid2 xs={12} md={8}>
          {places.map((restaurant) => (
            <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
          ))}
        </Grid2>
        <Grid2 xs={12} md={4}>
        <MapContainer places={places} setPlaces={setPlaces} />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Home;
