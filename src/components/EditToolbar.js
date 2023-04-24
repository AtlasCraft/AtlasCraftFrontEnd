import React, { useContext } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MergeIcon from '@mui/icons-material/Merge';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStoreContext from '../store';
import * as turf from '@turf/turf';
import L from 'leaflet';

export default function EditToolbar({
  handleGeoUpload,
  handleShpUpload,
  handleSplit,
  setVertexEnabled,
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
    L.geoJSON(unions, countryStyle).addTo(store.mapObject);
    store.selectedRegion = [];
    console.log(unions);
  };

  const handleUndo = () => {
    store.undo();
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
                <Box sx={editIconBoxStyle} onClick={handleEdit}>
                  <EditIcon sx={editIconStyle} />
                  <p style={editTextStyle}>EDIT</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={handleCreateRegion}>
                  <LibraryAddIcon sx={editIconStyle} />
                  <p style={editTextStyle}>CREATE REGION</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={handleMergeRegion}>
                  <MergeIcon sx={editIconStyle} />
                  <p style={editTextStyle}>MERGE REGION</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={handleSplit}>
                  <CallSplitIcon sx={editIconStyle} />
                  <p style={editTextStyle}>SPLIT REGION</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={handleUndo}>
                  <UndoIcon sx={editIconStyle} />
                  <p style={editTextStyle}>UNDO</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={handleRedo}>
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
            <Button variant="contained" component="label">
              Upload GeoJson
              <input
                hidden
                accept="file"
                type="file"
                onChange={(e) => handleGeoUpload(e.target.files)}
              />
            </Button>
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
          </div>
        </TabPanel>
        <TabPanel value="4">
          <a>How to add vertices</a>
        </TabPanel>
      </TabContext>
    </div>
  );
}
