import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '900px',
        margin: '20px auto',
        borderRadius: '30px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Restaurants, cuisine, or address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          ),
          sx: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
            borderRadius: '30px 0 0 30px',
            paddingLeft: '15px',
            paddingRight: '15px',
          },
        }}
        sx={{
          flexGrow: 1,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          height: '56px',
          minWidth: '60px',
          borderRadius: '0 30px 30px 0',
          backgroundColor: '#d32323',
          '&:hover': {
            backgroundColor: '#b81e1e',
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
