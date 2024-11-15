import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import MapContainer from '../components/Map';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { getNearbyRestaurants, searchRestaurants } from '../services/restaurantService';
import AppHeader from '../components/Header';
import Footer from '../components/Footer';

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
    const { lat, lng } = userLocation;

    if (!lat || !lng) {
      console.warn('User location is not available. Please enable location services.');
      return;
    }

    if (query) {
      searchRestaurants(query, lat, lng).then((results) => {
        setPlaces(results); // Update the state with search results
      }).catch((error) => {
        console.error("Error during restaurant search:", error);
      });
    } else {
      console.warn("Search query is empty. Please enter a valid query.");
    }
  };

  return (
    <>
      {/* Header Component */}
      <AppHeader onSearch={handleSearch} />

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          padding: '0 16px',
        }}
      >
        {/* Sidebar Filters */}
        <Box
          sx={{
            width: '15%',
            padding: '16px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Box>
            <Typography variant="subtitle1">Category</Typography>
            <FormControlLabel control={<Checkbox />} label="New American" />
            <FormControlLabel control={<Checkbox />} label="Italian" />
            <FormControlLabel control={<Checkbox />} label="French" />
            <FormControlLabel control={<Checkbox />} label="Steakhouses" />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Features</Typography>
            <FormControlLabel control={<Checkbox />} label="Outdoor Seating" />
            <FormControlLabel control={<Checkbox />} label="Good for Lunch" />
            <FormControlLabel control={<Checkbox />} label="Good for Kids" />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Distance</Typography>
            <FormControlLabel control={<Checkbox />} label="Driving (5 mi)" />
            <FormControlLabel control={<Checkbox />} label="Biking (2 mi)" />
            <FormControlLabel control={<Checkbox />} label="Walking (1 mi)" />
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Restaurants in the current map area
            </Typography>
          </Box>
          {/* Restaurant List */}
          <Box
            sx={{
              maxHeight: '100%',
              overflowY: 'auto',
              paddingRight: 2,
            }}
          >
            {places.map((restaurant) => (
              <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
            ))}
          </Box>
        </Box>

        {/* Map Container */}
        <Box
          sx={{
            width: '30%',
            position: 'sticky',
            top: '120px',
            height: 'calc(100vh - 140px)',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
          }}
        >
          <MapContainer places={places} userLocation={userLocation} />
        </Box>
      </Box>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Home;
