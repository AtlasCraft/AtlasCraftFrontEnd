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
    Tab:{
        width: '30%',
        // height: '70%',
    }
}

export default function MapNav(){
    return (
        <div style = {style.MainBox}>
            <img src={require('./../../../util/HelpUtils/ViewPort.png')} style={{}} />
            <p>
                You can move the map by dragging and clicking<br/>
                You can zoom using either the buttons on the top left or using a scroll wheel<br/>
                The camera icon can be used to take a snapshot ant download a png for the vieport<br/>
                The eraser allows you to remove a region.
            </p>
            <Divider />
            <br/>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',}}>
                <div style={style.tab}>
                    <img src={require('./../../../util/HelpUtils/EditTab.png')} style={style.tab} />
                </div>
                <div style={style.tab}>
                    <img src={require('./../../../util/HelpUtils/PropertiesTab.png')} style={style.tab} />
                </div>
                <div style={style.tab}>
                    <img src={require('./../../../util/HelpUtils/UploadTab.png')} style={style.tab} />
                </div>
            </div>
            
            <p>
                These are the tabs<br/>
                The left picture contains editing functions as well as a save and download function <br/>
                The center picture is the properties tab and simply follow the format specified in the add properties textbox<br/>
                The right picture is the upload tab, simply click on the button of the file type that you wish to upload<br/>
            </p>
        </div>
    );
}