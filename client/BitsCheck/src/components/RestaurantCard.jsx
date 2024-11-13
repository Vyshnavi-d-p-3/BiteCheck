import React, { useEffect, useState } from 'react';
import { getPhotoUrl } from '../services/restaurantService';
import { Card, CardContent, CardActions, Button, Typography, Rating, Grid } from '@mui/material';

const RestaurantCard = ({ restaurant }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    // Fetch the photo URL using the photoReference from the restaurant data
    if (restaurant.photos && restaurant.photos.length > 0) {
      const photoReference = restaurant.photos[0].photo_reference;

      getPhotoUrl(photoReference).then((url) => {
        if (url) {
          setPhotoUrl(url);
        } else {
          setPhotoUrl('https://via.placeholder.com/400'); // Set placeholder if photo is not available
        }
      });
    } else {
      setPhotoUrl('https://via.placeholder.com/400'); // Set placeholder if no photo is available
    }
  }, [restaurant.photos]);

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Image Section */}
          <Grid item xs={12} sm={4}>
            <img
              src={photoUrl}
              alt={restaurant.name}
              width="100%"
              height="auto"
              style={{ borderRadius: 4 }}
            />
          </Grid>

          {/* Restaurant Details Section */}
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h6"
              component="a"
              href={restaurant.link}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
              {restaurant.cuisine}
            </Typography>
            <Rating name="read-only" value={restaurant.rating} readOnly sx={{ marginRight: 1 }} />
            <Typography variant="body2" component="span">
              {restaurant.rating} ({restaurant.reviews} reviews)
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              {restaurant.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" href={restaurant.websiteLink}>
          View Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
