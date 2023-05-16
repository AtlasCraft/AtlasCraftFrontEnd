import React, { useContext } from 'react';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import TabContext from '@mui/lab/TabContext';
import Tooltip from '@mui/material/Tooltip';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MergeIcon from '@mui/icons-material/Merge';
import CallSplitIcon from '@mui/icons-material/CallSplit';

import DownloadIcon from '@mui/icons-material/Download'
import SaveIcon from '@mui/icons-material/Save'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStoreContext from '../store';
import CompressIcon from '@mui/icons-material/Compress';
import InfoIcon from '@mui/icons-material/Info';
import * as turf from '@turf/turf';
import L from 'leaflet';
import { ButtonGroup } from '@mui/material';

export default function EditToolbar({
  handleGeoUpload,
  handleShpUpload,
  handleSplit,
  setVertexEnabled,
  setDownloadOpen,
  handleSave,
  setHelpOpen,
}) {
  const { store } = useContext(GlobalStoreContext);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const countryStyle = {
    fillColor: 'yellow',
    color: 'black',
    weight: 1,
    height: '100%',
  };

  const editIconBoxStyle = {
    width: '85%',
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
    color:"black",
    'text-align': 'center',
  };

  const editTextStyle = {
    margin: '.5rem 0',
    'text-align': 'center',
  };

  const handleCreateRegion = (e) => {
    setVertexEnabled(false);
    store.mapObject.pm.enableDraw('Polygon');
  };

  const handleEdit = (e) => {
    const regions = store.selectedRegion;
    for (let layer of regions) {
      layer.pm.toggleEdit({ limitMarkersToCount: 20 });
    }
  };

  const handleMergeRegion = (e) => {
    const selected = store.selectedRegion;
    if (selected.length <= 1) return;
    for (let i = 0; i < selected.length; ++i) {
      if (i === 0) {
        var unions = selected[i].toGeoJSON();
        console.log(selected[i]);
      } else {
        unions = turf.union(unions, selected[i].toGeoJSON());
        // console.log(selected[i].feature.properties);
        // unions.properties = selected[i].feature.properties;
      }
      selected[i].remove();
    }
    const oldLayers = [...store.selectedRegion];
    store.selectedRegion = [];
    const l = L.geoJSON(unions, countryStyle).addTo(store.mapObject);
    console.log('l');
    console.log(l);
    for (let layer in l._layers) {
      store.addMergeRegionTransaction(oldLayers, l._layers[layer]);
    }
  };

  const handleUndo = () => {
    store.undo();
    // store.compressMap(0.0005);
  };

  const handleRedo = () => {
    store.redo();
  };

  return (
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
                <Tooltip title="Edit">
                  <IconButton sx={editIconBoxStyle} onClick={handleEdit}>
                    <EditIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>EDIT</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Create Region">
                  <IconButton sx={editIconBoxStyle} onClick={handleCreateRegion}>
                    <LibraryAddIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>CREATE REGION</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Merge Region">
                  <IconButton sx={editIconBoxStyle} onClick={handleMergeRegion}>
                    <MergeIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>MERGE REGION</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Split Region">
                  <IconButton sx={editIconBoxStyle} onClick={handleSplit}>
                    <CallSplitIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>SPLIT REGION</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Download">
                  <IconButton sx={editIconBoxStyle} onClick={setDownloadOpen}>
                    <DownloadIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>Downlaod</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Save">
                  <IconButton sx={editIconBoxStyle} onClick={handleSave}>
                    <SaveIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>Save</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Compress Map">
                  <IconButton sx={editIconBoxStyle} onClick={()=>{store.compressMap(0.005)}}>
                    <CompressIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>Compress Map</p> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Help">
                  <IconButton sx={editIconBoxStyle} onClick={()=>{setHelpOpen(true)}}>
                    <InfoIcon sx={editIconStyle} />
                    {/* <p style={editTextStyle}>Help</p> */}
                  </IconButton>
                </Tooltip>
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
          <div style={{justifyContent:"space-evenly"}}>
            <ButtonGroup orientation="vertical">
            <Button variant="contained" component="label">
              Upload GeoJson
              <input
                hidden
                accept="file"
                type="file"
                onChange={(e) => handleGeoUpload(e.target.files)}
              />
            </Button>
            <br/>
            <Button variant="contained" component="label">
              Upload Shp/Dbf
              <input
                hidden
                accept="file"
                type="file"
                onChange={(e) => handleShpUpload(e.target.files)}
                multiple
              />
            </Button>
            </ButtonGroup>
          </div>
        </TabPanel>
        
      </TabContext>
    </div>
  );
}
