
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Box, TextField, Button, Stack, Tab, Grid, IconButton} from '@mui/material';
import {Undo, Redo} from '@mui/icons-material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { MapContainer, GeoJSON, TileLayer, Marker } from 'react-leaflet';
import shp from 'shpjs';
import L from 'leaflet';
import JSZip from 'jszip';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet/dist/leaflet.css';
import AuthContext from '../auth'
import GlobalStoreContext from '../store'
import {MapZoom, GeomanInit, Download} from './EditScreenComponents';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapLayer from './MapLayer';
import EditToolbar from './EditToolbar';
import { enqueueSnackbar } from 'notistack';

const style ={
  enabledTransaction:{
      color:"Black",
      transform:"scale(1.6)",
  },
  disabledTransaction:{
    color:"Black",
    transform:"scale(1.6)",
    opacity:"50%",
  }
}


export default function EditScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [value, setValue] = React.useState('1');
  const [selectedVerts, setVerts] = React.useState([]);
  const [tempSelectedVert, setTempSelectedVert] = React.useState([]);
  const [mapName, setMapName] = useState(store.mapName);
  const [vertexEnabled, setVertexEnabled] = useState(true);
  const [downloadOpen, setDownloadOpen] = useState(false);

  useEffect(()=>{
    if(!vertexEnabled) return;
    let isSame = false;
    if(tempSelectedVert.length != 0){
      for(let i=0;i<selectedVerts.length;i++){
        isSame = false;
        if(isSame) break;
        for(let j=0;j<selectedVerts[i].length; j++){
          if(selectedVerts[i][j]!=tempSelectedVert[j]){
            break;
          }
          if(j == selectedVerts[i].length-1) {
            isSame=true
            i = selectedVerts.length;
            break;
          }
        }
      }
      if(!isSame){
        let coppiedSelectedVerts = JSON.parse(JSON.stringify(selectedVerts)); // is a deep copy
        coppiedSelectedVerts.push(tempSelectedVert);
        setVerts(coppiedSelectedVerts);
        
      }else{
        let coppiedSelectedVerts = JSON.parse(JSON.stringify(selectedVerts)); // is a deep copy
        let removeIndex = -1;
        for(let i=0;i<selectedVerts.length;i++){
          for(let j=0;j<selectedVerts[i].length; j++){
            if(selectedVerts[i][j]!=tempSelectedVert[j]){
              break;
            }
            if(j = selectedVerts[i].length-1) {
              removeIndex = i;
              break;
            }
          }
        }
        coppiedSelectedVerts.splice(removeIndex, 1);
        setVerts(coppiedSelectedVerts);
      }
      console.log(store.geojson)
      setTempSelectedVert([]);
    }
  },[tempSelectedVert]);


  const markedVertices = useMemo(()=>{
    return(<div>{
      selectedVerts.map((arr, index)=>{//[featureIndex, subregionIdx, coordidx, latlng indx]
        let pos =store.geojson.features[arr[0]].geometry.coordinates[arr[1]][arr[2]][arr[3]]
        if(store.geojson.features[arr[0]].geometry.type == "Polygon"){
          pos =store.geojson.features[arr[0]].geometry.coordinates[arr[1]][arr[2]]
        }
        return <Marker key={index} position={[pos[1],pos[0]]} draggable={false} icon={L.icon({
          iconUrl: require('.././util/MarkerTopLeft.png'),

      })}/>
      }) // icon={L.Icon({iconUrl:require('./../util/Marker.png'),iconSize:[35,45]})}
    }</div>);
  }, [selectedVerts]);

  function onEachFeature(feature, layer){
    layer.on('pm:vertexclick', (e) => {
      console.log(e.indexPath);
      if(e.indexPath){//if it is a proper vertex click event
        // console.log(e.layer.feature.geometry.coordinates)
        let featuresIndex = findGeoIndex(e.layer.feature.properties);
        e.indexPath.unshift(featuresIndex);
        //NOTE: some may be 4 elements and others may be 3, account for this later using loop
        //The First element will always be the features index

        setTempSelectedVert(e.indexPath);

        
      }      
    });
  }

  console.log(selectedVerts);
  function findGeoIndex(props){
    for(let i=0; i<store.geojson.features.length; i++){
      if(store.geojson.features[i].properties.AtlasCraftRegionID == props.AtlasCraftRegionID){
        return i;
      }
    }
    return -1;
  }

  function handleChange(event, newValue){
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

  function handleSplit(){
    if(selectedVerts.length ==2){
      if(selectedVerts[0][0] != selectedVerts[1][0]){
        enqueueSnackbar("Selected vertices must be in the same region", {variant: "error", autoHideDuration: 3000});
        return
      }
      if(selectedVerts[0][1] != selectedVerts[1][1]){
        enqueueSnackbar("Selected vertices must have a direct path between them", {variant: "error", autoHideDuration: 3000});
        return
      }
      store.addSplitRegionTransaction(selectedVerts);
      setVerts([]);
    }else{
      enqueueSnackbar("You must only have 2 vertices selected to split", {variant: "error", autoHideDuration: 3000})
    }
    //TODO need to check for vertex list size
    //call store function and create a transaction
  }
  
  const updateMapName = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      store.changeMapName(mapName);
    }
  };
  return (
    <div>
      <Download setOpen={setDownloadOpen} open={downloadOpen}/>
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
            <IconButton
              href="#"
              sx={{
                'align-self': 'center',
              }}
              disabled={!store.canUndo()}
              onClick={()=>{store.undo()}}
            >
              <Undo style={store.canUndo()?style.enabledTransaction:style.disabledTransaction}/>
            </IconButton>
            <IconButton
              href="#"
              sx={{ 'align-self': 'center' }}
              disabled={!store.canRedo()}
              onClick={()=>{store.redo()}}
            >
              <Redo style={store.canRedo()?style.enabledTransaction:style.disabledTransaction}/>
            </IconButton>
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

              {markedVertices}

              <MapLayer 
                onEachFeature={onEachFeature}
                setVertexEnabled={setVertexEnabled}
                setTempSelectedVert={setTempSelectedVert}
              />
            </MapContainer>

          </div>
          <EditToolbar
            handleGeoUpload = {handleGeoUpload}
            handleShpUpload = {handleShpUpload}
            handleSplit = {handleSplit}
            setVertexEnabled = {setVertexEnabled}
            setDownloadOpen={setDownloadOpen}
          />
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
