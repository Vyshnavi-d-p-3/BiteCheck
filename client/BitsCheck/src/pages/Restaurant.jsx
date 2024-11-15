import React from 'react';
import { Box, Typography, Button, Grid2, Card, CardMedia, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { getRestaurantDetails, getPhotoUrl } from '../services/restaurantService';

const RestaurantPage = () => {
  const { name } = useParams();
  const [restaurant, setRestaurant] = React.useState(null);

  React.useEffect(() => {
    // Fetch restaurant details based on name
    getRestaurantDetails(name).then((data) => {
      if (data && data.name) {
        setRestaurant(data);
      } else {
        setRestaurant(null); // Handle invalid data
      }
    });
  }, [name]);

  if (!restaurant) {
    return <Typography>Invalid restaurant name.</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Restaurant Main Info Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {restaurant.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating name="read-only" value={restaurant.rating} readOnly sx={{ marginLeft: '10px' }} />
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>({restaurant.user_ratings_total} reviews)</Typography>
        </Box>
      </Box>

      {/* Image Carousel Section */}
      <Grid2 container spacing={2} sx={{ marginBottom: '20px' }}>
        {restaurant.photos?.map((photo, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={getPhotoUrl(photo.photo_reference)}
                alt="Restaurant Image"
              />
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Restaurant Details Section */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address</Typography>
        <Typography>{restaurant.formatted_address}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>Phone Number</Typography>
        <Typography>{restaurant.formatted_phone_number}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>Website</Typography>
        <Button variant="contained" color="primary" href={restaurant.website} target="_blank">
          Visit Website
        </Button>
      </Box>

      {/* Popular Dishes Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Menu - Popular Dishes</Typography>
      <Grid2 container spacing={2} sx={{ marginBottom: '20px' }}>
        {restaurant.popular_dishes?.map((dish, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={dish.image}
                alt={dish.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{dish.name}</Typography>
                <Typography variant="body2">{dish.price}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Reviews Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Reviews</Typography>
      <Grid2 container spacing={2}>
        {restaurant.reviews?.map((review, index) => (
          <Grid2 item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.author_name}</Typography>
                <Rating name="read-only" value={review.rating} readOnly sx={{ marginBottom: '10px' }} />
                <Typography variant="body2">{review.text}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default RestaurantPage;