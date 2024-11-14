import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Set container style for the Google map container
const containerStyle = {
  width: '100%',
  height: '100%',
};

// Define Google Maps API libraries
const libraries = ['places'];

const MapContainer = ({ places, userLocation }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  const handleLoad = (map) => {
    mapRef.current = map;
  };

  // Utility function to get the correct lat and lng
  const getLocation = (location) => {
    return {
      lat: typeof location.lat === 'function' ? location.lat() : location.lat,
      lng: typeof location.lng === 'function' ? location.lng() : location.lng,
    };
  };

  return (
    <div
      style={{
        position: 'sticky',  
        height: '100%',
      }}
      className="map-container"
    >
      <LoadScript googleMapsApiKey='AIzaSyDewJC5STCF9FQRfe1EAVnU8kJvfsRhLPU' libraries={libraries}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
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
    </div>
  );
};

export default MapContainer;
