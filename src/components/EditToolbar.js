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

import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStoreContext from '../store';
import CompressIcon from '@mui/icons-material/Compress';
import InfoIcon from '@mui/icons-material/Info';
import * as turf from '@turf/turf';
import L from 'leaflet';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditToolbar({
  handleGeoUpload,
  handleShpUpload,
  handleSplit,
  setVertexEnabled,
  setDownloadOpen,
}) {
  const { store } = useContext(GlobalStoreContext);
  const [value, setValue] = React.useState('1');
  const [propValue, setPropValue] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePropValue = (event) => {
    setPropValue(event.target.value);
  };

  const handleAddProp = (event) => {
    event.preventDefault();
    const p = propValue.split(':', 2);
    const name = p[0];
    const val = p[1];
    if (store.regionProperty && store.regionProperty[name]) {
      console.log('Property exist');
      return;
    }
    console.log(p);
    if (p.length === 2) {
      const newProp = { ...store.regionProperty };
      newProp[name] = val;
      store.updateProp(newProp);
      setPropValue('');
    } else {
      console.log('Please use name:value format');
    }
  };

  const deleteHandler = (event, key) => {
    event.preventDefault();
    console.log(key);
    if (store.regionProperty) {
      const newProp = { ...store.regionProperty };
      delete newProp[key];
      store.updateProp(newProp);
    }
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

  console.log(store.regionProperty);
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
                <Box sx={editIconBoxStyle} onClick={setDownloadOpen}>
                  <DownloadIcon sx={editIconStyle} />
                  <p style={editTextStyle}>Downlaod</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={editIconBoxStyle}
                  onClick={() => {
                    store.saveMap();
                  }}
                >
                  <SaveIcon sx={editIconStyle} />
                  <p style={editTextStyle}>Save</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={editIconBoxStyle}
                  onClick={() => {
                    store.compressMap(0.005);
                  }}
                >
                  <CompressIcon sx={editIconStyle} />
                  <p style={editTextStyle}>Compress Map</p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={editIconBoxStyle} onClick={() => {}}>
                  <InfoIcon sx={editIconStyle} />
                  <p style={editTextStyle}>Help</p>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <div style={{ display: 'flex', 'flex-direction': 'column' }}>
            {store.regionProperty
              ? Object.keys(store.regionProperty).map((key) => {
                  const val = key + ':' + store.regionProperty[key];
                  return (
                    <div style={{ display: 'flex' }}>
                      <TextField
                        id="propForm"
                        variant="filled"
                        placeholder="name: value"
                        value={val}
                        hiddenLabel
                      />
                      <Button
                        onClick={(e) => {
                          deleteHandler(e, key);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  );
                })
              : null}
            <TextField
              id="propForm"
              variant="filled"
              placeholder="name: value"
              hiddenLabel
              value={propValue}
              onChange={handleChangePropValue}
            />
            <a onClick={handleAddProp}>+ Add property</a>
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
      </TabContext>
    </div>
  );
}
