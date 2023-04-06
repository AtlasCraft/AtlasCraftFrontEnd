import React, { useContext, useEffect, useMemo, useState } from "react";
import {IconButton, TextField, List} from "@mui/material";
import {People, Person, Add, Menu} from "@mui/icons-material";
import MapCard from "./MapCard";

const hardCodedRenderTest = [
	{mapId:"1", mapName:"Name1", ownedUser:"user1"}
	, {mapId:"2", mapName:"Name2", ownedUser:"user2"}, 
	{mapId:"3", mapName:"Name3", ownedUser:"user3"},
	{mapId:"4", mapName:"Name4", ownedUser:"user4"},
	{mapId:"5", mapName:"Name5", ownedUser:"user5"},

];

const style = {
    HomeFullContainer: {
        // outline: "5px solid black", 
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
	const [allUserSelected, setAllUserSelected] = useState(true)
	const mapCards = 
	// (!hardCodedRenderTest)? <></>:
	(
		<div style={style.MapCardListContainer}>
			<List style={{height:"100%", width:"100%"}}>
				{hardCodedRenderTest.map((card)=>{
					console.log("test");
					return <MapCard
						id= {card.mapId}
						mapName = {card.mapName}
						ownedUser = {card.ownedUser}
					/>
				})}
			</List>
		</div>
	);

	function handleUpdateSearchText(e){

	}

	return (
		<div id="homepage-screen">
			<div style={style.HomeFullContainer}>
				<div>
					<IconButton disabled = {false} onClick = {()=>{}}>
						<People style ={{
							fontSize: "35pt",
							color: "black",
							opacity: allUserSelected?"100%":"50%",
							margin:"auto auto auto 0"
						}}/>
					</IconButton>
					<IconButton disabled = {false} onClick = {()=>{}}>
						<Person style ={{
							fontSize: "35pt",
							color: "black",
							opacity: allUserSelected?"50%":"100%"
						}}/>
					</IconButton>
					<IconButton disabled = {false} onClick = {()=>{}}>
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
					<IconButton disabled = {false} onClick = {()=>{}} style={{position:"absolute", left:"100%", transform: "translate(-100%,0%)"}}>
						<Menu style ={{ fontSize: "35pt", color:"black", }}/>
					</IconButton>
				</div>
				<div style={style.HomeMapCardContainer}> 
					{mapCards}
				</div>
			</div>
		</div>
		

	);
};
