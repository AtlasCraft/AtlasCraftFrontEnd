import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { MapContainer, TileLayer, GeoJson } from 'react-leaflet';
import L from 'leaflet';

const mapData = require('./test/demo1.json');
export default function ViewScreen() {
  
  return (
    <div>
      <div>
        <Box
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
            <TextField id="mapname" label="Name" variant="filled" hiddenLabel />
            <Button
              variant="contained"
              href="#"
              sx={{
                'align-self': 'center',
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
          <Stack spacing={0}>
            <div
                style={{
                width: '80%',
                background: 'gray',
                height: '100%',
                }}
            >
                <MapContainer
                style={{ height: '80vh' }}
                center={[42.09618442380296, -71.5045166015625]}
                zoom={7}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={mapData.geojson} style={countryStyle} />
                </MapContainer>
            </div>
            <Box
            sx={{
                id: "comments",
                width: '100%',
                height: 150,
                margin: 0.5,
                backgroundColor: 'rgb(192,192,192)'
            }}>
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item>
                <TextField
                    fullWidth
                    id="comment"
                    name="comment"
                    autoComplete="comment"
                />
                </Grid>
            <Grid item>
                <Button
                variant="contained"
                href="#"
                sx={{
                    marginTop: 2,
                    'align-self': 'center',
                }}
                >
                Enter
                </Button>
            </Grid>
            

          </Grid>
        </Box>
      </div>
      
    </div>
  );
}
