// src/pages/User/Home.jsx
import React, { useState, useEffect } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import SearchBar from '../../components/SearchBar';
import MapContainer from '../../components/MapContainer';
import RestaurantCard from '../../components/RestaurantCard';
import { Container } from '@mui/material';
import { getNearbyRestaurants, searchRestaurants } from '../../api/restaurantService';

const Home = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState([
    { place_id: 1, name: 'Dummy Restaurant', vicinity: '123 Fake St', rating: 4.5 },
    { place_id: 2, name: 'Another Restaurant', vicinity: '456 Fake Ave', rating: 3.8 },
  ]);
  
  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);

          // Get nearby restaurants using Google Places API
          getNearbyRestaurants(location).then((results) => {
            setPlaces(results);
          });
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    }
  }, []);

  const handleSearch = (query) => {
    // Use the search service to find restaurants based on the search query
    searchRestaurants(query).then((results) => {
      setPlaces(results);
    });
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
