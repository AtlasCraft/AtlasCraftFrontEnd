import { useMap } from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';

export default function GeomanInit(){
    const map = useMap();

    map.pm.setGlobalOptions({
      limitMarkersToCount: 20,
    });
  
    map.pm.addControls({
      position: 'topleft',
      drawCircle: false,
    });
    return null;
}