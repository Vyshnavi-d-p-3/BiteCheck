import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = ({ places, setPlaces }) => {
  const [center, setCenter] = useState(null); // Set as null initially
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          handleNearbySearch(userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Use default fallback
          setCenter({
            lat: 37.7749, // Example: San Francisco
            lng: -122.4194,
          });
          handleNearbySearch({
            lat: 37.7749,
            lng: -122.4194,
          });
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  }, []);
  
  

  const handleNearbySearch = (location) => {
    if (window.google && mapRef.current) {
      const service = new window.google.maps.places.PlacesService(mapRef.current);
      const request = {
        location,
        radius: 3000,
        type: 'restaurant',
      };
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log('Nearby Search Results:', results);
          setPlaces(results);
        } else {
          console.error('PlacesService Status Error:', status);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyDewJC5STCF9FQRfe1EAVnU8kJvfsRhLPU' libraries={['places']} onError={(error) => {
      console.error('Error loading Google Maps script:', error);
    }}>
      {center && (
        <GoogleMap
          mapContainerStyle={{ height: '500px', width: '100%' }}
          center={center}
          zoom={12}
          onLoad={(map) => (mapRef.current = map)}
        >
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.geometry.location}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{selectedPlace.name}</h4>
                <p>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapContainer;
