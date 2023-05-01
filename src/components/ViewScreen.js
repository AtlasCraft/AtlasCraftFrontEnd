import React,{useContext, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import AuthContext from '../auth'
import GlobalStoreContext from '../store'

export default function ViewScreen(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const loggedInUser = auth.user?auth.user.username:"";
  const tempGeo = require("../util/VaticanTestGeojson.json");
  console.log(tempGeo)
  const [comment, setComment] = useState('');
  const [feedComments, setFeedComments] = useState([]);
  
  
  const handleComment = (e) => {
    const copyFeedComments = [...feedComments];
    copyFeedComments.push(comment);
    setFeedComments(copyFeedComments);
    setComment('');
  };

  const CommentList = props => {
    return (
      <div className="userCommentBox"
      style = {{fontSize:"12pt"}}
      >
        <p className="userName">{props.userName}</p>
        <div className="userComment"
        style = {{fontSize:"10pt"}}
        >{props.userComment}</div>
      </div>
    );
  }

  const isValid = true;

  function setIsValid(){
    if(false){
      isValid = false;
    } else{
      isValid = true;
    }
  };
  

  function handleFork(){
    store.forkMap(props.id);
  };

  return (
    <div>
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
            <div style={{width:"80%", left:"2%", fontSize:"20pt"}}> {store.mapName}</div>
            <Button
              onClick={()=>{handleFork()}}
              variant="contained"
              href="#"
              sx={{
                'align-self': 'center',
              }}
            >
              Fork
            </Button>
            <Button
              variant="contained"
              href="#"
              sx={{ 'align-self': 'center' }}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </div>
      <div style={{ height: '80vh' }}>
        <Stack direction="row" height="100%">
          <div
            style={{
              width: '70%',
              background: 'gray',
              height: '100%',
            }}
          >
            <MapContainer
              style={{ height: '80vh' }}
              center={[42.09618442380296, -71.5045166015625]}
              zoom={7}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON data={tempGeo.features}/>
            </MapContainer>
          </div>
          <div style={{ width: '30%', background: 'white', height: '100%' }}>
          <Stack
            direction="column-reverse"
            height="100%"
            justifyContent="space-between"
          >
          <div style={{ background: 'rgb(192,192,192)'}}>
            <div id="comment-container" style={{scrollBehavior: 'smooth'}}>
              {feedComments.map((commentArr, i) => {
                return(
                  <CommentList
                    userName={loggedInUser}
                    userComment={commentArr}
                    key={i}
                  />
                );
              })}
            </div>
            <TextField
              style={{width:"80%"}}
              id="comment"
              name="comment"
              label="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyup={e => {
                e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);}}
            />
            <Button
              variant="contained" href="#" 
              sx={{ 'align-self': 'center' }} 
              style={{maxWidth:"20%", transform: "translateY(25%)"}}
              className = {
                comment.length > 0 ? 'submitCommentActive' : 'submitCommentInactive'
              }
              onClick={handleComment}
              disabled={isValid ? false : true}
              >
               Comment
              
            </Button>
            {console.log({feedComments})}
          </div>
        </Stack>
          </div>
        </Stack>
      </div>
      <div>
        
      </div>
    </div>
  );
}
