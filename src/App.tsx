import { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import RecenterMap from './components/RecenterMap';

function App() {
  const [geolocation, setGeolocation] = useState<LatLngExpression | null>(null);
  const markerRef = useRef<any>(null);

  const eventHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker) {
          const position = marker.getLatLng();
          setGeolocation(position);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log('Your device is not available geolocation');
    }
  }, []);

  if (!geolocation) {
    return (
      <div>
        <h1>Upp Something Wrong...</h1>
      </div>
    );
  }

  return (
    <section
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <MapContainer
        center={geolocation}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: '100%',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker ref={markerRef} position={geolocation} draggable={true} eventHandlers={eventHandler}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <RecenterMap location={geolocation} />
      </MapContainer>
    </section>
  );
}

export default App;
