import { createContext, useContext, useState } from 'react';
import {
  SplitRegion_Transaction,
  AddRegion_Transaction,
  DeleteRegion_Transaction,
  MergeRegion_Transaction,
  AddVertex_Transaction,
  DeleteVertex_Transaction,
} from '../transactions';
import { useHistory } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import api from '../api';
import jsTPS from '../common/jsTPS';
import AuthContext from '../auth';
import * as shpwrite from 'shp-write';
import 'core-js/stable';
import { saveAs } from 'file-saver';
import L from 'leaflet';

/*
	This is our global data store. Note that it uses the Flux design pattern,
	which makes use of things like actions and reducers. 
    
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  SET_MAP: 'SET_MAP',
  DELETE_VERT: 'DELETE_VERT',
  ADD_VERT: 'ADD_VERT',
  MOVE_VERT: 'MOVE_VERT',
  MERGE_REGION: 'MERGE_REGION',
  SPLIT_REGION: 'SPLIT_REGION',
  CREATE_REGION: 'CREATE_REGION',
  SET_SELECTED_REGION: 'SET_SELECTED_REGION',
  ADD_PROP: 'ADD_PROP',
  UPDATE_PROP: 'UPDATE_PROP',
  SET_MAPCARDS: 'SET_MAPCARDS',
  SHOW_ERROR: 'SHOW_ERROR',
  HIDE_ERR: 'HIDE_ERR',
  CHANGE_GEO: 'CHANGE_GEO',
  CHANGE_MAP_NAME: 'CHANGE_MAP_NAME',
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    geojson: null,
    mapName: null,
    mapId: null,
    mapObject: null,
    ownedUser: null,
    isMapPublished: false,
    mapcardList: [],
    ownedMapCardList: [],
    editable: false,
    graphicState: [],
    selectedRegion: [],
    regionProperty: null,
    wholeMapProps: null,
    editSelection: null,
    commentListPairs: [],
    mapKey: Math.random(),
    tps: new jsTPS(),
  });
  const history = useHistory();

  // const tps = new jsTPS();
  // store.tps = tps;

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.SET_MAP: {
        return setStore({
          ...store,
          mapName: payload.mapName,
          ownedUser: payload.ownedUser,
          comentListPairs: payload.commentListPairs,
          mapId: payload._id,
          geojson: payload.geojson ? payload.geojson : {},
          isMapPublished: payload.published,
          mapKey: Math.random(),
          // tps: tps,
        });
      }
      case GlobalStoreActionType.SET_MAPCARDS: {
        return setStore({
          ...store,
          mapcardList: payload,
          // tps: tps,
        });
      }
      case GlobalStoreActionType.SHOW_ERR: {
        return setStore({
          ...store,
          err: payload,
          // tps: tps,
        });
      }
      case GlobalStoreActionType.HIDE_ERR: {
        return setStore({
          ...store,
          err: null,
          // tps: tps,
        });
      }
      case GlobalStoreActionType.CHANGE_GEO: {
        return setStore({
          ...store,
          geojson: payload,
          mapKey: Math.random(),
          // tps: tps,
        });
      }
      case GlobalStoreActionType.CHANGE_MAP_NAME: {
        console.log(payload);
        return setStore({
          ...store,
          mapName: payload,
          // tps: tps,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // ***ANY FUNCTION NOT FILLED IN MEANS IT IS PLANNED FOR A FUTURE BUILD***

  store.resetTps = function () {
    store.tps.clearAllTransactions();
  };

  //Mapcard updates
  store.updateLikes = async function (id) {
    let res = await api.updateCardLikes(id);
    console.log(res);
  };
  store.updateDislikes = async function (id) {
    let res = await api.updateCardDislikes(id);
    console.log(res);
  };
  store.loadMapCards = async function () {
    let res = await api.getAllMapCards();
    if (res.data.success) {
      storeReducer({
        type: GlobalStoreActionType.SET_MAPCARDS,
        payload: res.data.maps,
      });
    }
  };

  // tps handling functions
  store.canUndo = function () {
    return store.tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.tps.hasTransactionToRedo();
  };
  store.undo = function () {
    console.log('undo');
    store.tps.undoTransaction();
  };
  store.redo = function () {
    console.log('redo');
    store.tps.doTransaction();
  };

  //region functions
  store.deleteRegion = function (layer) {
    // layer.pm._initMarkers();
    layer.remove();
  };
  store.createRegion = function (layer) {
    console.log(layer);
    layer.addTo(store.mapObject);
  };
  store.mergeRegion = function (oldRegions, newRegion) {
    for (let layer of oldRegions) {
      layer.remove();
    }
    console.log(newRegion);
    newRegion.addTo(store.mapObject);
  };
  store.restoreRegion = function (oldRegions, newRegion) {
    for (let layer of oldRegions) {
      layer.addTo(store.mapObject);
    }
    newRegion.remove();
  };

  store.addAddRegionTransaction = function (layer) {
    let transaction = new AddRegion_Transaction(store, layer);
    store.tps.addTransaction(transaction);
    console.log(store.tps);
  };

  store.addDeleteRegionTransaction = function (layer) {
    let transaction = new DeleteRegion_Transaction(store, layer);
    store.tps.addTransaction(transaction);
    console.log(store.tps);
  };

  store.addMergeRegionTransaction = function (oldLayers, newLayer) {
    let transaction = new MergeRegion_Transaction(store, oldLayers, newLayer);
    store.tps.addTransaction(transaction);
    console.log(store.tps);
  };

  store.addSplitRegionTransaction = function (verts) {
    if (store.geojson.features[verts[0][0]].geometry.type == 'Polygon') {
      // need to completely remove subregion
      verts.sort((vert1, vert2) => {
        return vert1[2] - vert2[2];
      }); //  should be in asc order
      let vert1 = verts[0];
      let vert2 = verts[1];
      let oldRegion = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      );
      let newRegion1 = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      ); //splice this from vert1[3]+1 to vert2[3]-1 (vert2[3] - vert1[3]-1)
      let newRegion2 = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      ); //slice this from vert1[3] to vert2[3]+1
      // handle the splice (remove elements inbetween)
      newRegion1.geometry.coordinates[vert1[1]].splice(
        vert1[2] + 1,
        vert2[2] - vert1[2] - 1
      );
      newRegion1.properties.AtlasCraftRegionID = Math.random();
      // handle the slice (remove elements outside)
      newRegion2.geometry.coordinates[vert2[1]] =
        newRegion2.geometry.coordinates[vert2[1]].slice(vert1[2], vert2[2] + 1);
      newRegion2.properties.AtlasCraftRegionID = Math.random();
      // make the transaction
      let transaction = new SplitRegion_Transaction(
        store,
        oldRegion,
        null,
        newRegion1,
        newRegion2,
        1
      ); //type 1 = polygon
      console.log(store.tps);
      store.tps.addTransaction(transaction, true);
      // console.log("AAAAAAAAAAAAAA")
      console.log(store.tps);
      // tps.decrementMostRecent();
      // console.log("BBBBBBBBBBBBBB")
      // console.log(tps);
      store.tps.doTransaction();
      console.log(store.tps);

      // MULTI POLYGON
    } else {
      //need to "modify the subregion" and is a multipolygon
      verts.sort((vert1, vert2) => {
        return vert1[3] - vert2[3];
      }); //  should be in asc order
      let vert1 = verts[0];
      let vert2 = verts[1];
      let oldRegion = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      );
      let newOldRegion = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      );
      let newRegion1 = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      ); //splice this from vert1[3]+1 to vert2[3]-1 (vert2[3] - vert1[3]-1)
      let newRegion2 = JSON.parse(
        JSON.stringify(store.geojson.features[vert1[0]])
      ); //slice this from vert1[3] to vert2[3]+1
      // handle the splice (remove elements inbetween)
      newRegion1.geometry.coordinates =
        newRegion1.geometry.coordinates[vert1[1]];
      newRegion1.geometry.coordinates[vert1[2]].splice(
        vert1[3] + 1,
        vert2[3] - vert1[3] - 1
      );
      newRegion1.properties.AtlasCraftRegionID = Math.random();
      newRegion1.geometry.type = 'Polygon';

      // handle the slice (remove elements outside)
      newRegion2.geometry.coordinates =
        newRegion2.geometry.coordinates[vert2[1]];
      newRegion2.geometry.coordinates[vert2[2]] =
        newRegion2.geometry.coordinates[vert2[2]].slice(vert1[3], vert2[3] + 1);
      newRegion2.properties.AtlasCraftRegionID = Math.random();
      newRegion2.geometry.type = 'Polygon';

      //update the newold region (remove new1 and new2 from coords list)
      newOldRegion.geometry.coordinates.splice(Math.max(vert1[1], vert2[1]), 1);
      // newOldRegion.geometry.coordinates.splice(Math.min(vert1[1], vert2[1]), 1);
      let transaction = new SplitRegion_Transaction(
        store,
        oldRegion,
        newOldRegion,
        newRegion1,
        newRegion2,
        2
      ); //type 2 = multipolygon
      store.tps.addTransaction(transaction, true);
      // console.log(tps);
      // tps.decrementMostRecent();
      store.tps.doTransaction();
    }
  };
  store.splitRegion = function (old, newOld, new1, new2, type, splitType) {
    //if splitType = 1 then completely remove old region and replace with new1 and new 2
    //if splitType = 2 then replace old region with newOld and add in new1 and new 2
    let tempGeo = JSON.parse(JSON.stringify(store.geojson));
    if (type == 'do') {
      //remove old add in the two new
      //should have "old" region
      if (splitType == 1) {
        // a polygon
        let oldIndex = store.findRegion(old);
        tempGeo.features.splice(oldIndex, 1);
        tempGeo.features.push(new1);
        tempGeo.features.push(new2);
        console.log(store.tps);
        storeReducer({
          type: GlobalStoreActionType.CHANGE_GEO,
          payload: tempGeo,
        });
        console.log(store.tps);
      } else {
        //a multipolygon
        let oldIndex = store.findRegion(old);
        tempGeo.features.splice(oldIndex, 1);
        tempGeo.features.push(new1);
        tempGeo.features.push(new2);
        tempGeo.features.push(newOld);
        storeReducer({
          type: GlobalStoreActionType.CHANGE_GEO,
          payload: tempGeo,
        });
      }
    } else {
      //remove two new add in the old
      if (splitType == 1) {
        // a polygon
        let indexList = [store.findRegion(new1), store.findRegion(new2)];
        indexList.sort((a, b) => {
          return a - b;
        });
        tempGeo.features.splice(indexList[1]); //the largest
        tempGeo.features.splice(indexList[0]); //the smallest
        tempGeo.features.push(old);
        storeReducer({
          type: GlobalStoreActionType.CHANGE_GEO,
          payload: tempGeo,
        });
      } else {
        //a multipolygon
        let indexList = [
          store.findRegion(new1),
          store.findRegion(new2),
          store.findRegion(newOld),
        ];
        indexList.sort((a, b) => {
          return a - b;
        });
        tempGeo.features.splice(indexList[2]); //the largest
        tempGeo.features.splice(indexList[1]); //the middle
        tempGeo.features.splice(indexList[0]); //the last
        tempGeo.features.push(old);
        storeReducer({
          type: GlobalStoreActionType.CHANGE_GEO,
          payload: tempGeo,
        });
      }
    }
  };
  store.selectRegion = function () {};

  store.findRegion = function (feature) {
    for (let i = 0; i < store.geojson.features.length; i++) {
      if (
        store.geojson.features[i].properties.AtlasCraftRegionID ==
        feature.properties.AtlasCraftRegionID
      ) {
        return i;
      }
    }
    return -1;
  };

  //verticies functions
  store.deleteVertex = function (indexPath, latlng, layer) {
    let latlngs = layer._latlngs;
    console.log('indexPath');
    console.log(indexPath);
    console.log('latlngs');
    console.log(latlngs);
    for (let i = 0; i < indexPath.length - 1; i++) {
      latlngs = latlngs[indexPath[i]];
    }
    latlngs.splice(indexPath[indexPath.length - 1], 1);
    layer.setLatLngs(layer._latlngs);
    layer.pm._initMarkers();
  };

  store.addVertex = function (indexPath, latlng, layer) {
    let latlngs = layer._latlngs;
    console.log('indexPath');
    console.log(indexPath);
    console.log('latlngs');
    console.log(latlngs);
    for (let i = 0; i < indexPath.length - 1; i++) {
      latlngs = latlngs[indexPath[i]];
    }
    latlngs.splice(indexPath[indexPath.length - 1], 0, latlng);
    layer.setLatLngs(layer._latlngs);
    layer.pm._initMarkers();
  };
  store.moveVertices = function () {};
  store.selectVertices = function () {};

  store.addAddVertexTransaction = function (indexPath, latlng, layer) {
    let transaction = new AddVertex_Transaction(this, indexPath, latlng, layer);
    store.tps.addTransaction(transaction);
    console.log(store.tps);
  };
  store.addDeleteVertexTransaction = function (indexPath, latlng, layer) {
    let transaction = new DeleteVertex_Transaction(
      this,
      indexPath,
      latlng,
      layer
    );
    store.tps.addTransaction(transaction);
    console.log(store.tps);
  };

  //Properties functions
  store.updateProp = function () {};
  store.createProp = function () {};

  //map management
  store.downloadGeo = function () {
    let blob = new Blob([JSON.stringify(store.geojson)], {
      type: 'data:text/plain;charset=utf-8',
    });
    saveAs(blob, store.mapName.concat('.geojson'));
  };
  store.downloadShp = function () {
    window.process = {
      browser: true,
    };
    // var options = {
    //   folder: 'myshapes',
    //   types: {
    //       point: 'mypoints',
    //       polygon: 'mypolygons',
    //       line: 'mylines'
    //   }
    // }
    // console.log(store.geojson);
    shpwrite.download(store.geojson);
  };
  store.downloadPng = function () {};

  store.compressMap = function (weight) {
    var topojson = require('topojson');
    let topo = topojson.topology({ k: store.geojson });
    let preSimplify = topojson.presimplify(topo);
    let postSimplify = topojson.simplify(preSimplify, weight);
    let geo = topojson.feature(postSimplify, postSimplify.objects['k']);
    for (let i = 0; i < geo.features.length; i++) {
      let tempProp = new Map(Object.entries(geo.features[i].properties));
      tempProp.set('AtlasCraftRegionID', Math.random());
      geo.features[i].properties = Object.fromEntries(tempProp);
    }
    storeReducer({
      type: GlobalStoreActionType.CHANGE_GEO,
      payload: geo,
    });
  };

  store.uploadMap = function (geo) {
    console.log(geo);
    for (let i = 0; i < geo.features.length; i++) {
      let tempProp = new Map(Object.entries(geo.features[i].properties));
      tempProp.set('AtlasCraftRegionID', Math.random());
      geo.features[i].properties = Object.fromEntries(tempProp);
    }
    console.log(geo);
    storeReducer({
      type: GlobalStoreActionType.CHANGE_GEO,
      payload: geo,
    });
  };

  store.forkMap = async function (id) {
    let res = await api.getMapEditingInfoById(id);
    if (res.data.success) {
      const newMap = {
        mapName: res.data.map.mapName,
        geojson: res.data.map.geojson,
      };
      let res2 = await api.createMapEditingInfo(newMap);
      if (res2.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_MAP,
          payload: res2.data.map,
        });
        store.loadMapCards();
        history.push('/edit');
      }
    }
    // console.log(res);
  };
  store.saveMap = async function () {
    // Create an empty GeoJSON collection
    var collection = {
      type: 'FeatureCollection',
      features: [],
    };

    // Iterate the layers of the map
    store.mapObject.eachLayer(function (layer) {
      // Create GeoJSON object from marker
      console.log(layer);
      try {
        if (
          layer._drawnByGeoman ||
          (layer.feature && layer.feature.type !== 'FeatureCollection')
        ) {
          const geojson = layer.toGeoJSON();
          // Push GeoJSON object to collection
          collection.features.push(geojson);
        }
      } catch (e) {
        console.log('NO GEOJSON Found');
      }
    });
    // Log GeoJSON collection to console
    store.geojson = collection;
    let payload = {
      mapName: store.mapName,
      geojson: store.geojson,
      published: store.isMapPublished,
    };
    let res = await api.updateMapEditingInfoById(store.mapId, payload);
    if (res.data.success) {
      enqueueSnackbar('Map Saved', {
        variant: 'success',
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar('Map Save Failed Try Again', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    }
    console.log(payload);
  };
  store.changeMapName = function (name) {
    storeReducer({
      type: GlobalStoreActionType.CHANGE_MAP_NAME,
      payload: name,
    });
  };

  store.deleteMap = function () {};
  store.publishMap = async function (id) {
    let payload = {
      mapName: store.mapName,
      geojson: store.geojson,
      published: true,
    };
    let res = await api.updateMapEditingInfoById(store.mapId, payload);
    console.log(res);
  };
  store.createNewMap = async function () {
    const newMap = {
      mapName: 'A New Map',
      geojson: { type: 'FeatureCollection', features: [] },
    };
    let res = await api.createMapEditingInfo(newMap);
    if (res.data.success) {
      storeReducer({
        type: GlobalStoreActionType.SET_MAP,
        payload: res.data.map,
      });
      store.loadMapCards();
      history.push('/edit');
    }
  };
  store.loadMap = async function (id, type) {
    console.log(id);
    let res = await api.getMapEditingInfoById(id);
    if (res.data.success) {
      storeReducer({
        type: GlobalStoreActionType.SET_MAP,
        payload: res.data.map,
      });
      if (type == 'edit') history.push('/edit');
      else history.push('/view');
    }
    // console.log(res);
  };

  //error info for create user
  store.showErr = function (statusCode, msg) {
    console.log(msg);
    storeReducer({
      type: GlobalStoreActionType.SHOW_ERR,
      payload: `Error ${statusCode}: ${msg}`,
    });
  };

  store.hideErr = function () {
    storeReducer({
      type: GlobalStoreActionType.HIDE_ERR,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
