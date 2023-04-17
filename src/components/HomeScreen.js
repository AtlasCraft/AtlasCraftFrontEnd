import React, { useContext, useEffect, useMemo, useState } from "react";
import {IconButton, TextField, List, MenuItem, Menu} from "@mui/material";
import {People, Person, Add} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu"
import MapCard from "./MapCard";
import AuthContext from '../auth'
import GlobalStoreContext from '../store'

// const mapCardListTest = [
// 	{mapId:"2", mapName:"Name2", ownedUser:"user1", likedUsers:[ "user2", "user3", "user4"], dislikedUsers:["user1",], published: true}, 
// 	{mapId:"1", mapName:"Name1", ownedUser:"user1", likedUsers:["user1", "user2"], dislikedUsers:[],published: true}, 
// 	{mapId:"3", mapName:"Name3", ownedUser:"user1", likedUsers:["user1", "user4", "user6", "user2"], dislikedUsers:[],published: false}, 
// 	{mapId:"4", mapName:"Name4", ownedUser:"user1", likedUsers:["user1", "user3"], dislikedUsers:[],published: false}, 
// 	{mapId:"5", mapName:"Name5", ownedUser:"user3", likedUsers:["user1", "user4", "user5"], dislikedUsers:[],published: true}, 

// ];

const style = {
    HomeFullContainer: {
		height:"100%", 
		width:"80%", 
		left:"10%", 
		position:"absolute"
		
    },
	HomeMapCardContainer:{
		outline: "1px solid black", 
		height:"80%", 
		width:"98%", 
		left:"1%", 
		top:"12%",
		position:"absolute",
		borderRadius:"25px"
	},
	MapCardListContainer:{
		position:"absolute",
		left: "0%",
		top: "2%",
		width: "100%",
		height: "96%",
		display: "flex",
		flexDirection: "column",
		overflow: "auto",
	}
};

export default function HomeScreen() {
	const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
	const [mapCardList, setMapCardList] = useState([])
	const [sortStyle, setSortStyle] = useState("none");//"none", "AZ", "ZA", "likes", "dislikes"
	const [allUserSelected, setAllUserSelected] = useState(true);
	const [searchText, setSearchText] = useState("");
	const isMenuOpen = Boolean(anchorEl);
	
	useEffect(()=>{
		setMapCardList(store.mapcardList);
	},[store]);

	const loggedInUser = auth.user?auth.user.username:"";
	// const loggedInUser = "user1"
	function sortAZ(){
		setMapCardList(mapCardList.toSorted((card1,card2)=>{
			return(card1.mapName.localeCompare(card2.mapName));
		}));
	}
	function sortZA(){
		setMapCardList(mapCardList.toSorted((card1,card2)=>{
			return(card2.mapName.localeCompare(card1.mapName));
		}));
	}
	function sortLikes(){
		setMapCardList(mapCardList.toSorted((card1,card2)=>{
			const val = card1.likedUsers.length - card2.likedUsers.length
			if(val < 0) return 1;
			else if (val>0) return -1;
			else return 0;
		}));
	}
	function sortDislikes(){
		setMapCardList(mapCardList.toSorted((card1,card2)=>{
			const val = card1.dislikedUsers.length - card2.dislikedUsers.length
			if(val < 0) return 1;
			else if (val>0) return -1;
			else return 0;
		}));
	}

	function handleUpdateSearchText(e){
		setSearchText(e.target.value);
	}
	function handleCreateMap(e){
		store.createNewMap();
	}

	const mapCards =
		useMemo(()=>{
			return(
				<div style={style.MapCardListContainer}>
					<List style={{height:"100%", width:"100%"}}>
						{
							mapCardList.map((card)=>{
								if(allUserSelected && searchText != "" && card.mapName.includes(searchText) && card.published == true)
									return <MapCard
										id= {card.mapId}
										cardId={card._id}
										mapName = {card.mapName}
										ownedUser = {card.ownedUser}
										likedUsers = {card.likedUsers}
										dislikedUsers = {card.dislikedUsers}

									/>
								else if (allUserSelected && searchText == "" && card.published == true)
									return <MapCard
										id= {card.mapId}
										cardId={card._id}
										mapName = {card.mapName}
										ownedUser = {card.ownedUser}
										likedUsers = {card.likedUsers}
										dislikedUsers = {card.dislikedUsers}

									/>
									//
								else if(!allUserSelected && searchText != "" && card.mapName.includes(searchText) && card.ownedUser == loggedInUser)
									return <MapCard
										id= {card.mapId}
										cardId={card._id}
										mapName = {card.mapName}
										ownedUser = {card.ownedUser}
										likedUsers = {card.likedUsers}
										dislikedUsers = {card.dislikedUsers}

								/>
								else if (!allUserSelected && searchText == "" && card.ownedUser == loggedInUser)
									return <MapCard
										id= {card.mapId}
										cardId={card._id}
										mapName = {card.mapName}
										ownedUser = {card.ownedUser}
										likedUsers = {card.likedUsers}
										dislikedUsers = {card.dislikedUsers}

									/>
								else return<></>
							})
						}
					</List>
				</div>
			)
		}, [searchText, mapCardList, allUserSelected, store.mapCardList]);

	

	return (
		<div id="homepage-screen">
			<div style={style.HomeFullContainer}>
				<div>
					<IconButton disabled = {false} onClick = {()=>{setAllUserSelected(true)}}>
						<People style ={{
							fontSize: "35pt",
							color: "black",
							opacity: allUserSelected?"100%":"50%",
							margin:"auto auto auto 0"
						}}/>
					</IconButton>
					<IconButton disabled = {false} onClick = {()=>{setAllUserSelected(false)}}>
						<Person style ={{
							fontSize: "35pt",
							color: "black",
							opacity: allUserSelected?"50%":"100%"
						}}/>
					</IconButton>
					<IconButton disabled = {false} onClick = {(e)=>{handleCreateMap(e)}}>
						<Add style ={{
							fontSize: "35pt",
							color: "black"
						}}/>
					</IconButton>
					<TextField 
						label="Search" 
						className="inputRounded"
						size="small" 
						style ={{position:"absolute", width: "55%", top: "2%", left:"50%", transform: "translate(-50%,0%)"}} 
						disabled = {false}
						onChange={handleUpdateSearchText}>
					</TextField>
					<IconButton disabled = {false} onClick = {(event)=>{setAnchorEl(event.currentTarget);}} style={{position:"absolute", left:"100%", transform: "translate(-100%,0%)"}}>
						<MenuIcon style ={{ fontSize: "35pt", color:"black", }}/>
					</IconButton>
					
				</div>
				
				<div style={style.HomeMapCardContainer}> 
					{mapCards}
				</div>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={()=>{setAnchorEl(null)}}
				anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
				}}
				transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
				}}
			>
				<MenuItem onClick={sortAZ}>Name (A-Z)</MenuItem>
				<MenuItem onClick={sortZA}>Name (Z-A)</MenuItem>
				<MenuItem onClick={sortLikes}>Likes</MenuItem>
				<MenuItem onClick={sortDislikes}>Dislikes</MenuItem>
			</Menu>
		</div>
		

	);
};
