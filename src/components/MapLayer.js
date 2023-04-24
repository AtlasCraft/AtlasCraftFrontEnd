import React, { useContext } from 'react';
import { useMap, GeoJSON } from 'react-leaflet';
import GlobalStoreContext from '../store';
import L from 'leaflet';
const mapData = require('../test/MapEditingInfo.json');
const usData = require('../test/us.json');

export default function MapLayer() {
  const countryStyle = {
    fillColor: 'yellow',
    color: 'black',
    weight: 1,
    height: '100%',
  };

  const { store } = useContext(GlobalStoreContext);
  const map = useMap();
  store.mapObject = map;
  map.doubleClickZoom.disable();

  map.on('pm:create', (e) => {
    e.layer.options.pmIgnore = false;
    L.PM.reInitLayer(e.layer);
  });

  console.log(map);

  map.pm.setGlobalOptions({
    limitMarkersToCount: 10,
    pathOptions: countryStyle,
  });

  map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
  });

  map.on('layeradd', (e) => {
    if (e.layer && e.layer._latlngs) {
      console.log(e);
      const { layer } = e;
      console.log(layer);
      layer.on('pm:edit', (e) => {
        const { layer } = e;
        layer.on('pm:vertexadded', (e) => {
          console.log('Add Vertex');
          console.log(e);
          console.log(e.marker._latlng);
        });
        layer.on('pm:change', (e) => {
          console.log('Changed Vertex');
          console.log(e);
        });

        layer.on('pm:vertexremoved', (e) => {
          console.log('Delete Vertex');
          console.log(e);
          console.log(e.marker._latlng);
        });
      });
      //SELECT REGION
      layer.on('dblclick', (e) => {
        const layer = e.target;
        console.log('Layer Clicked');
        if (layer) {
          if (store.selectedRegion.includes(layer)) {
            console.log('in selected');
            store.selectedRegion = store.selectedRegion.filter(
              (l) => l !== layer
            );
            layer.setStyle({ fillColor: 'yellow' });
          }
          console.log(store.selectedRegion);
        }
      });

      // DELTE
      layer.on('contextmenu', (e) => {
        const layer = e.target;
        console.log('Context Menu Clicked');
        if (layer) {
          if (!store.selectedRegion.includes(layer)) {
            console.log('Not in selected');
            store.selectedRegion.push(layer);
            layer.setStyle({ fillColor: 'orange' });
          }
        }
      });
    }
  });

  map.on('layerremove', (e) => {
    if (e.layer && e.layer._latlngs) {
      console.log(e);
    }
  });

  map.on('pm:drawend', (e) => {
    const { _layers: layers } = e.target;
    console.log('Finish Draw');
    console.log(layers);
    for (const layer in layers) {
      if (layers[layer]._latlngs) {
        console.log(layers[layer]);
      }
    }
    // CODE FOR CREATING POLYGON
    // const poly = L.polygon(
    //   [getRandomLatLng(), getRandomLatLng(), getRandomLatLng()],
    //   countryStyle
    // );
    // L.featureGroup([poly])
    //   .bindPopup('Hello world!')
    //   .on('click', (e) => {
    //     console.log();
    //   })
    //   .addTo(map);
  });

  return (
    <GeoJSON
      data={store.geojson || usData || mapData.geojson}
      style={countryStyle}
    />
  );
}
