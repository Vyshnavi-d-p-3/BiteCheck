import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Moved the 'libraries' definition outside the component
const libraries = ['places'];

const MapContainer = ({ places, setPlaces }) => {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center to San Francisco
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
          console.error('Error getting user location', error);
        }
      );
    }
  }, []);

  const handleLoad = (map) => {
    mapRef.current = map;
  };

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
          console.log('Nearby places found:', results);
          setPlaces(results);
        } else {
          console.error('PlacesService Status Error:', status);
        }
      });
    }
  };

  const getLocation = (location) => {
    return {
      lat: typeof location.lat === 'function' ? location.lat() : location.lat,
      lng: typeof location.lng === 'function' ? location.lng() : location.lng,
    };
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyDewJC5STCF9FQRfe1EAVnU8kJvfsRhLPU' libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        center={center}
        zoom={12}
        onLoad={handleLoad}
      >
        {places.map((place) => {
          const position = getLocation(place.geometry.location);
          if (position.lat && position.lng) {
            return (
              <Marker
                key={place.place_id}
                position={position}
                onClick={() => setSelectedPlace(place)}
              />
            );
          }
          return null;
        })}
        {selectedPlace && (
          <InfoWindow
            position={getLocation(selectedPlace.geometry.location)}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
              <p>{selectedPlace.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
