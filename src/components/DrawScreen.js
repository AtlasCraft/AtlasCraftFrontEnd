import {IconButton, Button, List, Input, createTheme, ButtonGroup} from "@mui/material";
import {LinearScale, RectangleOutlined, CircleOutlined, FormatColorFill, FormatBold, FormatItalic, ChangeHistory, Delete, ZoomOutMap} from "@mui/icons-material";
import { useRef, useState, useEffect, useMemo } from "react";
import Konva from 'konva';
import React from "react";
import { Stage, Layer, Rect, Shape } from 'react-konva';
const theme = createTheme({

})
const style = {

    mainPage:{
        position: "absolute",
        left: "0%",
        top: "0%",
        width: "100%",
        height: "100%"
    },
    drawToolBar:{
        position: "absolute",
        left: "5%",
        top: "0%",
        width: "90%",
        height: "10%",
        display:"flex"
    },
    dividerLine:{
        fontSize:"26pt",
        fontWeight:"bold"
    },
    canvasContainer:{
        position: "absolute",
        left: "2.5%",
        top: "8%",
        width: "95%",
        height: "85%",
        backgroundColor:"white",
        borderStyle: "solid",
        borderColor: "#1C353D",
        borderRadius: "25px",
    }
}

export default function DrawScreen(){
    const [selectedOption, setSelected] = useState("move");
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [stageDimensions, setStageDimensions] = useState({
        width: 0,
        height: 0
        })
    const divRef = useRef(null)
    let width = window.innerWidth ;
    let height = window.innerHeight;
    // let state = new Konva.Stage({
    //     container: "CanvasContainer"
    // })
    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
          setStageDimensions({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight
          })
        }
      }, [])


 //needs to be removed in final build
    const tempGeo = require("../util/VaticanTestGeojson.json");
    const pointToDraw = useMemo(()=>{
        if(!tempGeo) return [];
        let tempList = [];
        const coords = tempGeo.features[0].geometry.coordinates[0][0];
        let minLon = 10000;
        let maxLon = 0;
        let minLat = 10000;
        let maxLat = 0;
        for(let i=0; i<coords.length; i++){//first find the min and max lat and lon NOTE the geojson saves it as [lon lat] = [y,x]
            if(coords[i][0]<minLon) minLon = coords[i][0]
            if(coords[i][0]>maxLon) maxLon = coords[i][0]
            if(coords[i][1]<minLat) minLat = coords[i][1]
            if(coords[i][1]>maxLat) maxLat = coords[i][1]
        }
        //resize the lat so it doesnt fit the whole screen

        //now to scale the image
        //math works as follows 
        //drawx = (lat-minLat/(maxLat-minLat))stageDimensions.width
        //drawy = (lon-minLon/(maxLon-minLon))stageDimensions.height
        for(let i=0; i<coords.length; i++){
            let drawx = stageDimensions.width - ((coords[i][1]-minLat)/(maxLat-minLat)) * (stageDimensions.height * .8)  - (stageDimensions.width * .4)
            let drawy = ((coords[i][0]-minLon)/(maxLon-minLon)) * (stageDimensions.height * .8) + (stageDimensions.height * .05)
            tempList.push([drawx, drawy])
        }
        return tempList;
    }, [stageDimensions]);
    function sceneFunction(context, shape){
        context.beginPath();
        context.moveTo(pointToDraw[0][0], pointToDraw[0][1]);
        for(let i=1; i<pointToDraw.length;i++){
            context.lineTo(pointToDraw[i][0], pointToDraw[i][1]);
        }
        context.closePath();
        context.fillStrokeShape(shape);
    }

//end remove

    console.log(pointToDraw);
    console.log(stageDimensions)
    return ( 
    <div style={style.mainPage}>
        <div style={style.drawToolBar}>
            <div style={style.dividerLine}>|</div>
            <div style={{position:"relative",width:"20%", display:"flex"}}>
                <div style={{width:"45%"}}>
                    Color:
                    <Input type="color" style={{width:"45%"}}></Input>
                </div>
                <div style={{width:"50%"}}>
                    Line Width:
                    <Input type="number" style={{width:"40%"}}></Input>
                </div>
            </div>
            <div style={style.dividerLine}>|</div>
            <div style={{position:"relative",width:"80%", display:"flex"}}>
                <div>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("move")}}>
                        <ZoomOutMap style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "move"?"100%":"50%",
                            transform:"rotate(45deg)"
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("fill")}}>
                        <FormatColorFill style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "fill"?"100%":"50%",
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("delete")}}>
                        <Delete style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "delete"?"100%":"50%",
                        }}/>
                    </IconButton>
                    <Button variant="text" onClick ={()=>{setSelected("text")}} style={{
                        color:"black", 
                        fontSize:"16pt",
                        opacity: selectedOption === "text"?"100%":"50%"}}>
                            Text
                    </Button>
                    <IconButton disabled = {false} onClick = {()=>{setBold(!bold)}}>
                        <FormatBold style={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: bold?"100%":"50%",
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setItalic(!italic)}}>
                        <FormatItalic style={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: italic?"100%":"50%",
                        }}/>
                    </IconButton>
                </div>
                <div style={style.dividerLine}>|</div>
                <div>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("line")}}>
                        <LinearScale style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "line"?"100%":"50%",
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("rect")}}>
                        <RectangleOutlined style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "rect"?"100%":"50%"
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("circle")}}>
                        <CircleOutlined style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "circle"?"100%":"50%"
                        }}/>
                    </IconButton>
                    <IconButton disabled = {false} onClick = {()=>{setSelected("tri")}}>
                        <ChangeHistory style ={{
                            fontSize: "25pt",
                            color: "black",
                            opacity: selectedOption === "tri"?"100%":"50%"
                        }}/>
                    </IconButton>
                </div>
                <div style={style.dividerLine}>|</div>
                <div>
                    <ButtonGroup>
                        <Button variant="Text" style={{
                            color:"black", 
                            fontSize:"16pt"}}>
                                Clear
                        </Button>
                        <Button variant="Text" style={{
                            color:"black", 
                            fontSize:"16pt"}}>
                                Save
                        </Button>
                        <Button variant="Text" style={{
                            color:"black", 
                            fontSize:"14pt"}}>
                                Download
                        </Button>
                    </ButtonGroup>
                </div>
                <div style={style.dividerLine}>|</div>
            </div>
        </div>
        <div id="CanvasContainer" style={style.canvasContainer} ref={divRef}>
            <Stage width={stageDimensions.width} height ={stageDimensions.height}>
                <Layer>
                    {/* <Rect
                    x={10}
                    y={100}
                    width={100}
                    height={100}
                    fill="red"
                    shadowBlur={10}
                    draggable="true"
                    /> */}
                    <Shape
                        sceneFunc = {sceneFunction}
                        fill="#00D2FF"
                        stroke="black"
                        strokeWidth={2}
                    />

                </Layer>
            </Stage>
        </div>
    </div>

    );
}