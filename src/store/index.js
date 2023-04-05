import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import AuthContext from "../auth";
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
	UPDATE_TAB: "UPDATE_TAB",
	CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
	CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
	CREATE_NEW_LIST: "CREATE_NEW_LIST",
	LOAD_LIST: "LOAD_LIST",
	LOAD_USER_LIST: "LOAD_USER_LIST",
	LOAD_COMMUNITY: "LOAD_COMMUNITY",
	MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
	UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
	SET_CURRENT_LIST: "SET_CURRENT_LIST",
	SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
	UPDATE_LIST: "UPDATE_LIST",
	UPDATE_SEARCH: "UPDATE_SEARCH",
	UPDATE_RATING: "UPDATE_RATING",
	SORT: "SORT",
	SHOW_ERR: "SHOW_ERR",
	HIDE_ERR: "HIDE_ERR",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
	// THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
	const [store, setStore] = useState({
		idNamePairs: [],
		currentList: null,
		listNameActive: false,
		itemActive: false,
		listMarkedForDeletion: null,
		err: null,
		tab: "home",
		queryType: "name",
		query: null,
		sort: null,
	});
	const history = useHistory();

	// SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
	const { auth } = useContext(AuthContext);

	// HERE'S THE DATA STORE'S REDUCER, IT MUST
	// HANDLE EVERY TYPE OF STATE CHANGE
	const storeReducer = (action) => {
		const { type, payload } = action;
		switch (type) {
			// LIST UPDATE OF ITS NAME
			case GlobalStoreActionType.CHANGE_LIST_NAME: {
				return setStore({
					idNamePairs: payload.idNamePairs,
					currentList: payload.top5List,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// STOP EDITING THE CURRENT LIST
			case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// CREATE A NEW LIST
			case GlobalStoreActionType.CREATE_NEW_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// GET ALL THE LISTS SO WE CAN PRESENT THEM
			case GlobalStoreActionType.LOAD_LIST: {
				console.log("Load ID pair Reducer");
				return setStore({
					idNamePairs: payload,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: "all",
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			case GlobalStoreActionType.LOAD_USER_LIST: {
				return setStore({
					idNamePairs: payload,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: "home",
					queryType: "name",
					query: store.query,
					sort: store.sort,
				});
			}
			case GlobalStoreActionType.LOAD_COMMUNITY: {
				return setStore({
					idNamePairs: payload,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: "community",
					queryType: "name",
					query: store.query,
					sort: store.sort,
				});
			}
			// PREPARE TO DELETE A LIST
			case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
				console.log("Reducer for Mark List for Deletion");
				console.log(payload);
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: payload,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// PREPARE TO DELETE A LIST
			case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: null,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// UPDATE A LIST
			case GlobalStoreActionType.SET_CURRENT_LIST: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					isItemEditActive: false,
					listMarkedForDeletion: null,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// START EDITING A LIST ITEM
			case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
				return setStore({
					idNamePairs: store.idNamePairs,
					currentList: payload,
					listMarkedForDeletion: null,
					err: store.err,
					tab: store.tab,
					queryType: store.queryType,
					query: store.query,
					sort: store.sort,
				});
			}
			// case GlobalStoreActionType.UPDATE_LIST: {
			// 	return setStore({
			// 		idNamePairs: store.idNamePairs,
			// 		currentList: payload,
			// 		listMarkedForDeletion: null,
			// 		err: store.err,
			// 		tab: store.tab,
			// 	});
			// }
			case GlobalStoreActionType.UPDATE_TAB: {
				return setStore({
					idNamePairs: [],
					currentList: null,
					listMarkedForDeletion: null,
					err: store.err,
					tab: payload.newTab,
					queryType: payload.queryType,
					query: null,
					sort: null,
				});
			}
			case GlobalStoreActionType.UPDATE_SEARCH: {
				return setStore({
					...store,
					idNamePairs: payload.list,
					query: payload.query,
				});
			}
			case GlobalStoreActionType.SORT: {
				return setStore({
					...store,
					idNamePairs: payload.list,
					sort: payload.sort,
				});
			}
			case GlobalStoreActionType.UPDATE_RATING: {
				return setStore({});
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

	// THIS FUNCTION PROCESSES CHANGING A LIST NAME
	store.changeListName = async function (id, newName) {
		let response = await api.getTop5ListById(id);
		if (response.data.success) {
			let top5List = response.data.top5List;
			top5List.name = newName;
			async function updateList(top5List) {
				response = await api.updateTop5ListById(top5List._id, top5List);
				if (response.data.success) {
					async function getListPairs(top5List) {
						response = await api.getTop5ListPairs();
						if (response.data.success) {
							let pairsArray = response.data.idNamePairs;
							storeReducer({
								type: GlobalStoreActionType.CHANGE_LIST_NAME,
								payload: {
									idNamePairs: pairsArray,
									top5List: top5List,
								},
							});
						}
					}
					getListPairs(top5List);
				}
			}
			updateList(top5List);
		}
	};

	// THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
	store.closeCurrentList = function () {
		storeReducer({
			type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
			payload: {},
		});
		history.push("/");
	};

	// THIS FUNCTION CREATES A NEW LIST
	store.createNewList = async function () {
		let newListName = "Untitled";
		let payload = {
			name: newListName,
			items: ["?", "?", "?", "?", "?"],
			ownerEmail: auth.user.email,
		};
		const response = await api.createTop5List(payload);
		if (response.data.success) {
			let newList = response.data.top5List;
			storeReducer({
				type: GlobalStoreActionType.CREATE_NEW_LIST,
				payload: newList,
			});
		} else {
			console.log("API FAILED TO CREATE A NEW LIST");
		}
	};

	// THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
	store.loadList = async function () {
		console.log(store);
		let params = {};
		const query = store.query;
		if (query) {
			params = { filter: store.queryType, q: query };
		}
		if (store.sort) {
			params["sort"] = store.sort;
		}
		const response = await api.getAllTop5Lists(params);
		if (response.data.success) {
			let pairsArray = response.data.data;
			storeReducer({
				type: GlobalStoreActionType.LOAD_LIST,
				payload: pairsArray,
			});
		} else {
			console.log("API FAILED TO GET THE LIST PAIRS");
		}
	};

	store.loadListUsers = async function () {
		let params = {};
		const query = store.query;
		if (query) {
			params = { filter: store.queryType, q: query };
		}
		if (store.sort) {
			params["sort"] = store.sort;
		}
		const response = await api.getAllTop5ListsUser(params);
		if (response.data.success) {
			let array = response.data.data;
			storeReducer({
				type: GlobalStoreActionType.LOAD_USER_LIST,
				payload: array,
			});
		}
	};

	store.loadCommunityList = async function () {
		let params = {};
		const query = store.query;
		if (query) {
			params = { filter: store.queryType, q: query };
		}
		if (store.sort) {
			params["sort"] = store.sort;
		}
		try {
			const response = await api.getCommunityList(params);
			if (response.data.success) {
				let array = response.data.data;
				storeReducer({
					type: GlobalStoreActionType.LOAD_COMMUNITY,
					payload: array,
				});
			}
		} catch (err) {}
	};

	// THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
	// OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
	// FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
	// showDeleteListModal, and hideDeleteListModal
	store.markListForDeletion = function (list) {
		// GET THE LIST
		console.log("Mark List for Delete");
		storeReducer({
			type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
			payload: list,
		});
	};

	store.deleteList = async function (listToDelete) {
		let response = await api.deleteTop5ListById(listToDelete._id);
		if (response.data.success) {
			store.loadListUsers();
			// history.push("/");
		}
	};

	store.deleteMarkedList = function () {
		store.deleteList(store.listMarkedForDeletion);
	};

	store.unmarkListForDeletion = function () {
		console.log("Unmark List for Deletion");
		storeReducer({
			type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
			payload: null,
		});
	};

	// THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
	// OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
	// FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
	// moveItem, updateItem, updateCurrentList, undo, and redo
	store.setCurrentList = async function (id) {
		try {
			let response = await api.getTop5ListById(id);
			if (response.data.success) {
				let top5List = response.data.top5List;

				response = await api.updateTop5ListById(top5List._id, top5List);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.SET_CURRENT_LIST,
						payload: top5List,
					});
					history.push("/top5list/" + top5List._id);
				}
			}
		} catch (err) {
			store.showErr(
				err.response.status,
				"Error Accessing List, Redirecting..."
			);
			setTimeout(() => {
				store.hideErr();
				history.push("/");
			}, 3000);
			console.log(err);
		}
	};

	store.updateTab = function (newTab, queryType) {
		storeReducer({
			type: GlobalStoreActionType.UPDATE_TAB,
			payload: { newTab, queryType },
		});
	};
	store.updateSearch = async function (query) {
		let params = {};
		if (query) {
			params = { filter: store.queryType, q: query };
		}
		console.log(params);
		try {
			if (store.tab === "home") {
				const response = await api.getAllTop5ListsUser(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.UPDATE_SEARCH,
						payload: { query, list: response.data.data },
					});
				}
			} else if (store.tab === "community") {
				const response = await api.getCommunityList(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.UPDATE_SEARCH,
						payload: { query, list: response.data.data },
					});
				}
			} else {
				const response = await api.getAllTop5Lists(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.UPDATE_SEARCH,
						payload: { query, list: response.data.data },
					});
				}
			}
		} catch (err) {}
	};
	store.updateCurrentList = async function () {
		const response = await api.updateTop5ListById(
			store.currentList._id,
			store.currentList
		);
		if (response.data.success) {
			storeReducer({
				type: GlobalStoreActionType.SET_CURRENT_LIST,
				payload: store.currentList,
			});
		}
	};

	store.updateList = async function (name, list) {
		const newList = { name, items: list };
		const response = await api.updateTop5ListById(
			store.currentList._id,
			newList
		);
		try {
			if (response.data.success) {
				store.loadListUsers();
			}
		} catch (err) {
			store.showErr(err.response.status, "Failed to Update List");
		}
	};

	store.publishList = async function (name, list) {
		const newList = { name, items: list };
		try {
			const response = await api.publishList(
				store.currentList._id,
				newList
			);
			if (response.data.success) {
				store.loadListUsers();
			}
		} catch (err) {
			store.showErr(err.response.status, "Failed to publish List!");
		}
	};

	store.addComment = async function (listId, comment) {
		const response =
			store.tab === "community"
				? await api.createCommentCommunity(listId, { comment })
				: await api.createComment(listId, { comment });
		try {
			if (response.data.success) {
				if (store.tab === "home") store.loadListUsers();
				else if (store.tab === "community") store.loadCommunityList();
				else store.loadList();
			}
		} catch (err) {
			store.showErr(err.response.status, "Failed to Comment");
		}
	};
	// THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
	store.setIsListNameEditActive = function () {
		storeReducer({
			type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
			payload: null,
		});
	};

	// THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
	store.setItemEditActive = function (list) {
		storeReducer({
			type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
			payload: list,
		});
	};

	store.increaseView = async function (id) {
		try {
			store.tab === "community"
				? await api.incViewCommunity(id)
				: await api.incView(id);
		} catch (error) {}
		if (store.tab === "home") store.loadListUsers();
		else if (store.tab === "community") store.loadCommunityList();
		else store.loadList();
	};
	// New Functions

	store.sortList = async function (sort) {
		let params = {};
		const query = store.query;
		if (query) {
			params = { filter: store.queryType, q: query };
		}
		if (sort) {
			params["sort"] = sort;
		}
		try {
			if (store.tab === "home") {
				const response = await api.getAllTop5ListsUser(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.SORT,
						payload: { sort, list: response.data.data },
					});
				}
			} else if (store.tab === "community") {
				const response = await api.getCommunityList(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.SORT,
						payload: { sort, list: response.data.data },
					});
				}
			} else {
				const response = await api.getAllTop5Lists(params);
				if (response.data.success) {
					storeReducer({
						type: GlobalStoreActionType.SORT,
						payload: { sort, list: response.data.data },
					});
				}
			}
		} catch (err) {}
	};

	store.updateRating = async function (id, action) {
		try {
			store.tab === "community"
				? await api.updateRatingCommunity(id, { action })
				: await api.updateRating(id, { action });
			if (store.tab === "home") store.loadListUsers();
			else if (store.tab === "community") store.loadCommunityList();
			else store.loadList();
		} catch (err) {}
	};

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
