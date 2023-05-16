import { useContext, useState, useEffect } from "react";
import { Dialog, DialogTitle, Tab, Button, Stack, DialogContent, Divider } from "@mui/material";
import GlobalStoreContext from '../../store'
import AuthContext from '../../auth';
import TextField from '@mui/material/TextField';


const style = {
    dialogStyle:{
        height:"75vh"
    }
}

export default function Comment({setOpen, open}){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const loggedInUser = auth.user?auth.user.username:"";
    const mapId = store.mapId;
    const [comment, setComment] = useState('');
    const [feedComments, setFeedComments] = useState([]);

    useEffect(()=>{
        console.log(store.commentListPairs)
        setFeedComments(store.commentListPairs)
      },[store]);
      console.log(store.commentListPairs);
    
      const handleComment = (e) => {
        const copyFeedComments = [...feedComments];
        copyFeedComments.push({ user:loggedInUser, comment: comment});
        setFeedComments(copyFeedComments);
        setComment('');
        store.updateComment(mapId, copyFeedComments);
      };
      
      const CommentList = props => {
        return (
          <div className="userCommentBox"
          style = {{fontSize:"12pt", width:"100%", height:50}}
          >
            <p className="userName">{props.userName}</p>
            <div className="userComment"
            style = {{fontSize:"10pt", width:"100%", height:100}}
            >{props.userComment}</div>  
          </div>
        );
      };

    return (
        <Dialog onClose={()=>{setOpen(false)}} open={open} >
            <DialogContent style = {style.dialogStyle}>
            <div style={{ width: '100%', background: 'black', height: '100%'}}>
          <Stack
            direction="column"
            height="100%"
            justifyContent="space-between"
          >
            <div style={{background: 'white', overflowY: 'scroll', scrollBehavior: 'smooth', height: '100%'}}>
            {feedComments.map((commentArr, i) => {
              //{console.log(commentArr)}
              return(
                    <CommentList
                    userName={commentArr["user"]}
                    userComment={commentArr["comment"]}
                    key={i}
                    />
                    );
                    })}
            
                    </div>
                    <div style={{ background: 'rgb(192,192,192)'}}>
                        <TextField
                        style={{width:"70%"}}
                        id="comment"
                        name="comment"
                        label="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                        variant="contained"
                        sx={{ 'align-self': 'center' }} 
                        style={{maxWidth:"30%", transform: "translateY(25%)"}}
                        onClick={handleComment}
                        disabled={comment.length > 0  ? false : true}
                        >
                        Comment
                        
                        </Button>
                    </div>
                </Stack>
            </div>
            </DialogContent>
        </Dialog>
    );
}