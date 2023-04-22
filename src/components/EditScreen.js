import React, {useContext} from 'react';
import {Box, TextField, Button, Stack, Tab, Grid} from '@mui/material';
import {Edit, LibraryAdd, Merge, CallSplit, Undo, Redo} from '@mui/icons-material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import shp from 'shpjs';
import L from 'leaflet';
import JSZip from 'jszip';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet/dist/leaflet.css';
import AuthContext from '../auth'
import GlobalStoreContext from '../store'
import { useMemo } from 'react';
import {MapZoom} from './EditScreenComponents';


const style = {
  countryStyle: {
    fillColor: 'yellow',
    color: 'black',
    weight: 1,
    height: '100%',
  },
  editIconBoxStyle: {
    width: '100%',
    'aspect-ratio': '1 / 1',
    backgroundColor: 'rgb(200,200,200)',
    'border-radius': '10px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  editIconStyle: {
    fontSize: 50,
    'text-align': 'center',
  },
  editTextStyle: {
    margin: '.5rem 0',
    'text-align': 'center',
  }
}

export default function EditScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [value, setValue] = React.useState('1');
  const geoComponent = useMemo(()=>{
    return store.geojson?<GeoJSON key={store.mapKey} data={store.geojson} style={style.countryStyle} />:<></>
  },[store])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function handleGeoUpload(selectorFiles) {
    let jsonStringTemp = await (await selectorFiles[0].text()).replace(/\s/g,"");
    let jsonTemp = JSON.parse(jsonStringTemp);
    // let jsonTemp2 = {features:jsonTemp.features , type:jsonTemp.type}
    store.uploadMap(jsonTemp);
  }

  async function handleShpUpload(files) {
    let reader = new FileReader();
    let zip = new JSZip();
    Array.from(files).forEach((f) => {
      zip.file(f.name, f);
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      reader.readAsArrayBuffer(content);
      reader.onload = function (buffer) {
        shpUploadHelper(buffer.target.result);
      }
    });
  }

  async function shpUploadHelper(buf){
    store.uploadMap(await shp(buf));
  }

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
              onClick={()=>{store.saveMap()}}
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
              <MapZoom/>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {geoComponent}
            </MapContainer>
          </div>
          <div style={{ width: '20%', background: 'white', height: '100%' }}>
            <TabContext value={value} style={{width:"100%"}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%" }}>
                <TabList
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="Edit Tabs"
                  // variant="scrollable"
                  scrollButtons={false}
                  style={{width:"100%"}}
                  
                >
                  <Tab label="Edit" value="1" style={{maxWidth:"25%"}} />
                  <Tab label="Properties" value="2" style={{maxWidth:"25%"}} />
                  <Tab label="Upload" value="3" style={{maxWidth:"25%"}} />
                  <Tab label="Help" value="4" style={{maxWidth:"25%"}} />
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
                      <Box sx={style.editIconBoxStyle}>
                        <Edit sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>EDIT</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={style.editIconBoxStyle}>
                        <LibraryAdd sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>CREATE REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={style.editIconBoxStyle}>
                        <Merge sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>MERGE REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={style.editIconBoxStyle}>
                        <CallSplit sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>SPLIT REGION</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={style.editIconBoxStyle}>
                        <Undo sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>UNDO</p>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={style.editIconBoxStyle}>
                        <Redo sx={style.editIconStyle} />
                        <p style={style.editTextStyle}>REDO</p>
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
                  <Button variant="contained" component="label">
                    Upload GeoJson
                    <input hidden accept="file" type="file" onChange={(e)=>handleGeoUpload(e.target.files)}/>
                  </Button>
                  <Button variant="contained" component="label">
                    Upload Shp/Dbf
                    <input hidden accept="file" type="file" onChange={(e)=>handleShpUpload(e.target.files)} multiple/>
                  </Button>
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
