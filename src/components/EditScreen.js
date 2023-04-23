import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet/dist/leaflet.css';
import Input from '@mui/material/Input';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MergeIcon from '@mui/icons-material/Merge';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';
import MapLayer from './MapLayer';

const mapData = require('../test/MapEditingInfo.json');

export default function EditScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const editIconBoxStyle = {
    width: '100%',
    'aspect-ratio': '1 / 1',
    backgroundColor: 'rgb(200,200,200)',
    'border-radius': '10px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  };

  const editIconStyle = {
    fontSize: 50,
    'text-align': 'center',
  };

  const editTextStyle = {
    margin: '.5rem 0',
    'text-align': 'center',
  };

  console.log(mapData);
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
              value={store.mapName}
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
          <div style={{ width: '20%', background: 'white', height: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Edit Tabs"
                  variant="scrollable"
                  scrollButtons={false}
                >
                  <Tab label="Edit" value="1" />
                  <Tab label="Properties" value="2" />
                  <Tab label="Upload" value="3" />
                  <Tab label="Help" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ width: '100%' }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <EditIcon sx={editIconStyle} />
                        <p style={editTextStyle}>EDIT</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <LibraryAddIcon sx={editIconStyle} />
                        <p style={editTextStyle}>CREATE REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <MergeIcon sx={editIconStyle} />
                        <p style={editTextStyle}>MERGE REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <CallSplitIcon sx={editIconStyle} />
                        <p style={editTextStyle}>SPLIT REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <UndoIcon sx={editIconStyle} />
                        <p style={editTextStyle}>UNDO</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={editIconBoxStyle}>
                        <RedoIcon sx={editIconStyle} />
                        <p style={editTextStyle}>REDO</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ display: 'flex', 'flex-direction': 'column' }}>
                  <TextField
                    id="propForm"
                    variant="filled"
                    placeholder="name: value"
                    hiddenLabel
                  />
                  <a>+ Add property</a>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  <label htmlFor="upload GEOJSON">
                    <input
                      style={{ display: 'none' }}
                      id="upload-geojson"
                      name="upload-geojson"
                      type="file"
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                    >
                      Upload GEOJSON
                    </Button>
                  </label>
                  <label htmlFor="upload Shapefile">
                    <input
                      style={{ display: 'none' }}
                      id="upload-shapefile"
                      name="upload-shapefile"
                      type="file"
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                      width="100%"
                    >
                      Upload Shapefile
                    </Button>
                  </label>
                </div>
              </TabPanel>
              <TabPanel value="4">
                <a>How to add vertices</a>
              </TabPanel>
            </TabContext>
          </div>
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
