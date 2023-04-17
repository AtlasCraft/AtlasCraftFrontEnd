import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import jsTPS from '../common/jsTPS';
import AuthContext from '../auth';
/*
	This is our global data store. Note that it uses the Flux design pattern,
	which makes use of things like actions and reducers. 
    
	@author McKilla Gorilla
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
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    geojson: null,
    mapName: null,
    mapId: null,
    ownedUser: null,
    mapcardList: [],
    ownedMapCardList: [],
    editable: false,
    graphicState: [],
    selectedRegion: [],
    regionProperty: null,
    editSelection: null,
	commentListPairs:[]
  });
  const history = useHistory();

  const tps = new jsTPS();

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
		  comentListPairs:payload.commentListPairs,
		  mapId:payload._id,
		  geojson:payload.geojson?payload.geojson:{},
        });
      }
      case GlobalStoreActionType.SET_MAPCARDS: {
        return setStore({
          ...store,
		  mapcardList: payload,
        });
      }
      case GlobalStoreActionType.SHOW_ERR: {
        console.log(payload);
        return setStore({
          ...store,
          err: payload,
        });
      }
      case GlobalStoreActionType.HIDE_ERR: {
        return setStore({
          ...store,
          err: null,
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

  //Mapcard updates
	store.updateLikes = async function(id){
		let res = await api.updateCardLikes(id);
		console.log(res);
	}
	store.updateDislikes = async function(id){
		let res = await api.updateCardDislikes(id);
		console.log(res);
	}
	store.loadMapCards = async function(){
		let res = await api.getAllMapCards();
		if(res.data.success){
			storeReducer({
				type:GlobalStoreActionType.SET_MAPCARDS,
				payload:res.data.maps
			});
		}
	}

  // tps handling functions
  store.canUndo = function () {
    return tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return tps.hasTransactionToRedo();
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.redoTransaction();
  };

  //region functions
  store.deleteRegion = function () {};
  store.createRegion = function () {};
  store.mergeRegion = function () {};
  store.splitRegion = function () {};
  store.selectRegion = function () {};

  //verticies functions
  store.deleteVertices = function () {};
  store.addVertices = function () {};
  store.moveVertices = function () {};
  store.selectVertices = function () {};

  //Properties functions
  store.updateProp = function () {};
  store.createProp = function () {};

  //map management
  store.downloadGeo = function () {};
  store.downloadShp = function () {};
  store.downloadPng = function () {};
  store.uploadMap = function () {};
  store.forkMap = async function (id) {
	let res = await api.getMapEditingInfoById(id);
	if(res.data.success){
		const newMap = {
			mapName: res.data.map.mapName,
			geojson: res.data.map.geojson,
		} 
		let res2 = await api.createMapEditingInfo(newMap);
		if(res2.data.success){
			storeReducer({
				type:GlobalStoreActionType.SET_MAP,
				payload:res2.data.map
			});
			store.loadMapCards();
			history.push("/edit");
		}
	}
	// console.log(res);
  };
  store.changeMapName = function () {};
  store.saveMap = function () {};
  store.deleteMap = function () {};
  store.publishMap = async function(id){
	let payload = {
		mapName:store.mapName,
		geojson:store.geojson,
		published:true
	}
	let res = await api.updateMapEditingInfoById(store.mapId, payload);
	console.log(res);

  };
  store.createNewMap = async function(){
	const newMap = {
		mapName: "A New Map",
		geojson: {type:"FeatureCollection", features:[]},
	}
	let res = await api.createMapEditingInfo(newMap);
	if(res.data.success){
		storeReducer({
			type:GlobalStoreActionType.SET_MAP,
			payload:res.data.map
		});
		store.loadMapCards();
		history.push("/edit");
	}
	
  };
  store.loadMap = async function(id, type){
	console.log(id);
	let res = await api.getMapEditingInfoById(id);
	if(res.data.success){
		storeReducer({
			type:GlobalStoreActionType.SET_MAP,
			payload:res.data.map
		});
		if(type == "edit")
			history.push("/edit");
		else
			history.push("/view");
	}
	// console.log(res);
  }

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
