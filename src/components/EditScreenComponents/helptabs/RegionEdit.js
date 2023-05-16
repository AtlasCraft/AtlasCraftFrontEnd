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
export default function RegionEdit(){
    return (
        <div style = {style.MainBox}>
            <img src={require('./../../../util/HelpUtils/ViewPortTabs.png')} style={{}} />
            <p> 
                Add : Click the plus icon on the top right and click on the map to add verticies, close the polygon to finish<br/>
                Merge : Select multiple regions then click on the merge icon in the 2nd row 1st column<br/>
                Split : Select a region and select two verticies then click on the split icon in the 2nd row 2nd column<br/>
                Delete : On the left tool bar click on the eraser then click on a region to remove it

                NOTE: Split only works on a fresh uploaded file or one that there were no vertex or region edits besides split
            </p>
            <Divider />
            
        </div>
    );
}