// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for restaurants, cuisine, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
