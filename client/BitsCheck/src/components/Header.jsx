import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Typography } from '@mui/material';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import SearchBar from './SearchBar';

const AppHeader = ({ onSearch }) => {
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
          <SearchBar onSearch={onSearch} />
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
