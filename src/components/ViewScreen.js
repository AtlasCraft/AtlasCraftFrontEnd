import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Text from 'react-text';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
        </Box>
      </div>
      
    </div>
  );
}
