import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const mapStyles = {
  height: '100%',
  width: '100%',
};

function App() {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // Fonction pour obtenir la position actuelle
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getPosition();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyC64ABZ_lNDzmBKmrySKLY03P9ROyW3OKA">
      <MapContainer>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={currentPosition} // Utilisez la position actuelle comme centre de la carte
          zoom={10}
        >
          {currentPosition && (
            <Marker position={currentPosition} />
          )}
        </GoogleMap>
      </MapContainer>
    </LoadScript>
  );
}

export default App;
