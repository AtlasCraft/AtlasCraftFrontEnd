import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';


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
            <Box
                sx={{
                    width: '100%',
                    height: 380,
                    margin: 0.5,
                    backgroundColor: 'white'
                }}>
                <MapContainer
                style={{width:'100%', height:380, margin: 0.5}}
                center={[42.09618442380296, -71.5045166015625]}
                zoom={7}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                
            </Box>
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
