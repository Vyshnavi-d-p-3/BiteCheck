// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid2 } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <Grid2 container spacing={2} alignItems="center">
      <Grid2 item xs={10}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for restaurants, cuisine, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid2>
      <Grid2 item xs={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SearchBar;
