import React, { useContext, useEffect, useMemo, useState } from "react";
import {ListItem, IconButton} from "@mui/material";
import {Visibility, FileCopy, Download, Edit, ThumbUp, ThumbDown, ThumbDownAltOutlined, ThumbUpAltOutlined} from '@mui/icons-material';
import AuthContext from '../auth'
import GlobalStoreContext from '../store'
const style = {
    cardContainer: {
        width: "90%",
        height:"20%",
        backgroundColor:"#1C353D",
        left:"5%",
        position:"relative",
        borderRadius:"25px",
        marginTop:"1rem",
        display: "flex",
    },
    topDivContainer:{
        width:"96%",
        top:"7%",
        left:"2%",
        height:"50%",
        position:"absolute"
    },
    bottomDivContainer:{
        width:"96%",
        top:"50%",
        left:"2%",
        height:"50%",
        position:"absolute"
    },
    leftDivContainer:{
        height:"100%", 
        width:"50%", 
        position:"absolute",
        fontSize: "24px",
        color: "#F5DEB3",
        // backgroundColor:"black"
    },
    rightDiveContainer:{
        height:"100%", 
        width:"50%", 
        left:"50%", 
        position:"absolute",
        fontSize: "24px",
        color: "#F5DEB3",
        textAlign:"right"
    },
    iconButtons:{
        transform:"scale(1.2)",
        color: "#F5DEB3"
    }

}
export default function MapCard(props){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    // const loggedInUser = auth.user.username;
    const loggedInUser = "user1"
    const ownedUser = props.ownedUser;
    const mapName = props.mapName;
    const [likedUsers, setLiked] = useState(props.likedUsers);
    const [dislikedUsers, setDisliked] = useState(props.dislikedUsers);

    function handleLike(){
        if(likedUsers.includes(loggedInUser)){
            //remove from liked users and update backend
            let temp = [...likedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1)
            setLiked(temp);
            //TODO update backend liked
        }
        else if(dislikedUsers.includes(loggedInUser)){
            //remove from disliked users and update backend and add to liked users and update backend
            let temp = [...dislikedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1)
            setDisliked(temp);
            let temp2 = [...likedUsers];
            temp2.push(loggedInUser)
            setLiked(temp2);
            //TODO update backend liked and disliked
        }   
        else {
            //not in either list so just add to liked and update backend
            let temp = [...likedUsers];
            temp.push(loggedInUser);
            setLiked(temp);
            //TODO update backend liked
        }
    }
    function handleDislike(){
        if(dislikedUsers.includes(loggedInUser)){
            //remove from disliked users and update backend
            let temp = [...dislikedUsers];
            temp.splice(temp.indexOf(loggedInUser), 1);
            setDisliked(temp);
            //TODO update backend disliked
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
        }   
        else {
            //not in either list so just add to liked and update backend
            let temp = [...dislikedUsers];
            temp.push(loggedInUser);
            setDisliked(temp);
            //TODO update backend liked
        }
    }

    let likeButton = 
    (likedUsers.includes(loggedInUser)?
        <IconButton onClick={handleLike}>
            <ThumbUp style={style.iconButtons}/>
        </IconButton>:
        <IconButton onClick={handleLike}>
            <ThumbUpAltOutlined style={style.iconButtons}/>
        </IconButton>
        );

    let dislikeButton = 
    (dislikedUsers.includes(loggedInUser)?
        <IconButton onClick={handleDislike}>
            <ThumbDown style={style.iconButtons}/>
        </IconButton>:
        <IconButton onClick={handleDislike}>
            <ThumbDownAltOutlined style={style.iconButtons}/>
        </IconButton>
        );

    return(
        <ListItem style={style.cardContainer}>
            <div style={style.topDivContainer}>
                <div style={style.leftDivContainer}>
                    {mapName}
                </div>
                <div style={style.rightDiveContainer}>
                    {ownedUser}
                </div>
            </div>
            <div style={style.bottomDivContainer}>
                <div style={style.leftDivContainer}>
                    <IconButton>
                        <Visibility style={style.iconButtons}/>
                    </IconButton>
                    <IconButton>
                        <FileCopy style={style.iconButtons}/>
                    </IconButton>
                    <IconButton>
                        <Download style={style.iconButtons}/>
                    </IconButton>
                    {loggedInUser == ownedUser?<IconButton>
                        <Edit style={style.iconButtons}/>
                    </IconButton>:<></>}
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