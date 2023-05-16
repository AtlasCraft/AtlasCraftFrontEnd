import React, { useContext, useEffect, useMemo, useState } from "react";
import {ListItem, IconButton, Tooltip} from "@mui/material";
import {Visibility, FileCopy, Download, Edit, ThumbUp, ThumbDown, ThumbDownAltOutlined, ThumbUpAltOutlined, Delete} from '@mui/icons-material';
import AuthContext from '../auth'
import GlobalStoreContext from '../store'

const style = {
    cardContainer: {
        width: "29%",
        height:"60%",
        backgroundColor:"#1C353D",
        left:"0%",
        position:"relative",
        borderRadius:"25px",
        marginTop:"1rem",
        display: "flex",
    },
    topDivContainer:{
        width:"96%",
        top:"7%",
        left:"2%",
        height:"80%",
        position:"absolute"
    },
    bottomDivContainer:{
        width:"96%",
        top:"80%",
        left:"2%",
        height:"50%",
        position:"absolute"
    },
    leftDivContainer:{
        height:"100%", 
        width:"100%", 
        position:"absolute",
        // fontSize: "24px",
        // color: "#F5DEB3",
        // backgroundColor:"black"
    },
    rightDiveContainer:{
        height:"100%", 
        width:"45%", 
        left:"55%", 
        position:"absolute",
        fontSize: "24px",
        color: "#F5DEB3",
        textAlign:"right"
    },
    iconButtons:{
        transform:"scale(1.2)",
        color: "#F5DEB3"
    },
    mapText:{
        fontSize: "24px",
        color: "#F5DEB3",
        textAlign:"left"
    },
    userText:{
        fontSize: "18px",
        color: "#F5DEB3",
        textAlign:"left"
    },
    imageContainer:{
        backgroundColor:"black",
        width:"100%",
        height:"70%"
    }

}
export default function MapCard(props){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const loggedInUser = auth.user?auth.user.username:"";
    // const loggedInUser = "user1"
    const ownedUser = props.ownedUser;
    const mapName = props.mapName;
    const [likedUsers, setLiked] = useState([]);
    const [dislikedUsers, setDisliked] = useState([]);
    useEffect(()=>{
        setLiked(props.likedUsers);
        setDisliked(props.dislikedUsers);
    },[props.likedUsers, props.dislikedUsers]);
    if(props.thumbnail)console.log(props.thumbnail)
    function handleLike(){
        if(likedUsers.includes(loggedInUser)){
            //remove from liked users and update backend
            let temp = [...likedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1)
            setLiked(temp);
            //update backend liked
            store.updateLikes(props.cardId);
        }
        else if(dislikedUsers.includes(loggedInUser)){
            //remove from disliked users and update backend and add to liked users and update backend
            let temp = [...dislikedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1)
            setDisliked(temp);
            let temp2 = [...likedUsers];
            temp2.push(loggedInUser)
            setLiked(temp2);
            //update backend liked and disliked
            store.updateLikes(props.cardId);
            // store.updateDislikes(props.cardId);
        }   
        else {
            //not in either list so just add to liked and update backend
            let temp = [...likedUsers];
            temp.push(loggedInUser);
            setLiked(temp);
            //update backend liked
            store.updateLikes(props.cardId);
        }
    }
    function handleDislike(){
        if(dislikedUsers.includes(loggedInUser)){
            //remove from disliked users and update backend
            let temp = [...dislikedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1);
            setDisliked(temp);
            //TODO update backend disliked
            store.updateDislikes(props.cardId);
        }
        else if(likedUsers.includes(loggedInUser)){
            //remove from liked users and update backend and add to disliked users and update backend
            let temp = [...likedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1)
            setLiked(temp);
            let temp2 = [...dislikedUsers];
            temp2.push(loggedInUser);
            setDisliked(temp2);
            //TODO update backend liked and disliked
            store.updateDislikes(props.cardId);
            // store.updateLikes(props.cardId);
        }   
        else {
            //not in either list so just add to liked and update backend
            let temp = [...dislikedUsers];
            temp.push(loggedInUser);
            setDisliked(temp);
            //TODO update backend liked
            store.updateDislikes(props.cardId);
        }
        
    }

    function handleFork(){
        store.forkMap(props.id);
    }

    let likeButton = 
        likedUsers.includes(loggedInUser)?
            <Tooltip title="Remove Like">
                <IconButton onClick={handleLike}>
                    <ThumbUp style={style.iconButtons}/>
                </IconButton>
            </Tooltip>:
            <Tooltip title="Like Map">
                <IconButton onClick={handleLike}>
                    <ThumbUpAltOutlined style={style.iconButtons}/>
                </IconButton>
            </Tooltip>
        
    
    let dislikeButton = 
    
        dislikedUsers.includes(loggedInUser)?
            <Tooltip title="Remove Dislike">
                <IconButton onClick={handleDislike}>
                    <ThumbDown style={style.iconButtons}/>
                </IconButton>
            </Tooltip>:
            <Tooltip title="Dislike Map">
                <IconButton onClick={handleDislike}>
                    <ThumbDownAltOutlined style={style.iconButtons}/>
                </IconButton>
            </Tooltip>
        
    

    return(
        <ListItem style={style.cardContainer}>
            <div style={style.topDivContainer}>
                <div style={style.leftDivContainer}>
                    <div style={style.mapText}>{mapName}</div>
                    <div style={style.userText}>{ownedUser}</div>
                    <img style={style.imageContainer} src={props.thumbnail?props.thumbnail:require('./../util/BaseThumbnail.png')}></img>
                </div>
            </div>
            <div style={style.bottomDivContainer}>
                <div style={style.leftDivContainer}>
                    <Tooltip title="View Map">
                        <IconButton onClick={()=>{store.loadMap(props.id, "view");}}>
                            <Visibility style={style.iconButtons}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Fork Map">
                        <IconButton onClick={()=>{handleFork()}}>
                            <FileCopy style={style.iconButtons} />
                        </IconButton>
                    </Tooltip>
                    {loggedInUser == ownedUser?
                    <>
                        <Tooltip title="Edit Map">
                            <IconButton onClick={()=>{store.loadMap(props.id, "edit");}}>
                                <Edit style={style.iconButtons}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Map">
                            <IconButton onClick={()=>{store.deleteMap(props.id);}}>
                                <Delete style={style.iconButtons}/>
                            </IconButton>
                        </Tooltip></>
                        :<></>}
                </div>
                <div style={style.rightDiveContainer}>
                    {likeButton}
                    {likedUsers?.length}
                    {dislikeButton}
                    {dislikedUsers?.length}
                </div>
            </div>
        </ListItem>
    );
}