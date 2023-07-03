import { LatLngExpression } from 'leaflet';
import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterMapProps {
  location: LatLngExpression | null;
}

const RecenterMap: FC<RecenterMapProps> = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location);
    }
  }, [location, map]);

  return <div>RecenterMap</div>;
};

export default RecenterMap;
