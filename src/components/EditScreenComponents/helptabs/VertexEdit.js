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
    },
    EditRegion:{
        width: '90%',
        height: '100%',
    }
}
export default function VertexEdit(){
    return (
        <div style = {style.MainBox}>
            <div style={style.EditRegion}>
                <img src={require('./../../../util/HelpUtils/EditRegion.png')} style={{}} />    
            </div>
            
            <p>
                These larger circles represent exiting verticies and they can be dragged<br/>
                You can select a region by right clicking then edit it by clicking on the pencil icon<br/>
                <br/>
                Deselect: You can then deselect the region by double clicking<br/>
                Select: Verticies can be selected by clicking on the larger circle<br/>
                Add: The smaller verticies allow you to add a new vertex to the region by left clicking on it<br/>
                Delete: Delete You can delete the vertex on a right click of a large circle.<br/>
                Move: Click and drag a big circle
            </p>
            <Divider />
        </div>
    );
}