// src/components/RestaurantCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={restaurant.photos ? restaurant.photos[0].getUrl() : 'default.jpg'}
        alt={restaurant.name}
      />
      <CardContent>
        <Typography component="h5" variant="h5">
          {restaurant.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {restaurant.vicinity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {restaurant.rating || 'N/A'} ({restaurant.user_ratings_total} reviews)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
