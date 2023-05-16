import { Divider } from "@mui/material";
const style = {
    MainBox:{
        position: 'absolute',
        left: '5%',
        top: '25%',
        width: '90%',
        height: '70%',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        // backgroundColor:"black"
    }
}
export default function Basics(){
    return (
        <div style = {style.MainBox}>
            <img src={require('./../../../util/HelpUtils/EditScreen.png')} style={{}} />
            <p>
                The edit screen consists of 3 main parts<br/>
                1. The edit name bar at the top <br/>
                2. The viewport with the map <br/>
                3. The edit tabs on the right 
            </p>
            <Divider />
            <br/>
            <img src={require('./../../../util/HelpUtils/EditNameBar.png')} style={{}} />
            <p>
                This is the edit name bar and it has 4 different functionalities<br/>
                1. The change name textbox <br/>
                2. Undo, ctrl+z <br/>
                3. Redo, ctrl+y <br/>
                4. Publish map
            </p>
        </div>
    );
}