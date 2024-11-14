import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import SearchBar from './SearchBar';

const AppHeader = ({ onSearch }) => {
  // Filter states
  const [cuisineType, setCuisineType] = useState('');
  const [foodType, setFoodType] = useState('');
  const [priceLevel, setPriceLevel] = useState('');
  const [rating, setRating] = useState('');

  // Handle search with filters
  const handleSearch = (query) => {
    const filters = {
      cuisineType,
      foodType,
      priceLevel,
      rating,
    };
    onSearch(query, filters);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: 'none',
        borderBottom: '1px solid #d8d8d8',
        paddingY: 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ marginRight: 1 }}>
            <BakeryDiningIcon sx={{ color: '#d32323', fontSize: 40 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: '#000', fontWeight: 'bold', fontSize: 24 }}
          >
            Bite Check
          </Typography>
        </Box>

        {/* Filters Section */}
        <Box sx={{ display: 'flex', gap: 2, marginX: 4 }}>
          {/* Cuisine Type Filter */}
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Cuisine</InputLabel>
            <Select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              label="Cuisine"
            >
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="French">Mexican</MenuItem>
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="Chinese">Chinese</MenuItem>
              <MenuItem value="French">Thai</MenuItem>
            </Select>
          </FormControl>

          {/* Food Type Filter */}
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Food Type</InputLabel>
            <Select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              label="Food Type"
            >
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Vegan">Gluten-Free</MenuItem>
              <MenuItem value="Vegan">Organic</MenuItem>
              <MenuItem value="Vegan">Seafood</MenuItem>
              <MenuItem value="Vegan">Non-Veg</MenuItem>
            </Select>
          </FormControl>

          {/* Price Level Filter */}
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Price</InputLabel>
            <Select
              value={priceLevel}
              onChange={(e) => setPriceLevel(e.target.value)}
              label="Price"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          {/* Rating Filter */}
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value={1}>1 Star</MenuItem>
              <MenuItem value={2}>2 Stars</MenuItem>
              <MenuItem value={3}>3 Stars</MenuItem>
              <MenuItem value={4}>4 Stars</MenuItem>
              <MenuItem value={5}>5 Stars</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Search Section */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            maxWidth: '600px',
            marginX: 4,
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </Box>

        {/* Auth Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            sx={{ textTransform: 'none', fontSize: 16, marginRight: 2 }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontSize: 16,
              backgroundColor: '#d32323',
              '&:hover': { backgroundColor: '#b81e1e' },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
