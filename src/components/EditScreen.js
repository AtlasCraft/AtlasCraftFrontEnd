import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MapContainer, TileLayer } from 'react-leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet/dist/leaflet.css';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';
import MapLayer from './MapLayer';
import EditToolbar from './EditToolbar';

const mapData = require('../test/MapEditingInfo.json');

export default function EditScreen() {
  const { store } = useContext(GlobalStoreContext);
  const [mapName, setMapName] = useState(store.mapName);

  const updateMapName = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      store.changeMapName(mapName);
    }
  };
  return (
    <div>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '85vw',
              background: 'white',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="mapname"
              variant="filled"
              value={mapName}
              onKeyPress={updateMapName}
              onChange={(e) => {
                setMapName(e.target.value);
              }}
              hiddenLabel
            />
            <Button
              variant="contained"
              href="#"
              sx={{
                'align-self': 'center',
              }}
              onClick={() => {
                store.publishMap();
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              href="#"
              sx={{ 'align-self': 'center' }}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </div>
      <div style={{ height: '75vh' }}>
        <Stack direction="row" height="100%">
          <div
            style={{
              width: '80%',
              background: 'gray',
              height: '100%',
            }}
          >
            <MapContainer
              style={{ height: '75vh' }}
              center={[42.09618442380296, -71.5045166015625]}
              zoom={7}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapLayer />
            </MapContainer>
          </div>
          <EditToolbar />
        </Stack>
      </div>
      <div>
        <Stack
          direction="row"
          height="100%"
          justifyContent="space-between"
          style={{ background: 'rgb(192,192,192)' }}
        >
          <p>Comments</p>
          <Button variant="contained" href="#" sx={{ 'align-self': 'center' }}>
            View
          </Button>
        </Stack>
      </div>
    </div>
  );
}
