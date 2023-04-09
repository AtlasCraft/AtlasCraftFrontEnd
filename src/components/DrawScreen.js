import {IconButton, Button, List, Input, createTheme, ButtonGroup} from "@mui/material";
import {LinearScale, RectangleOutlined, CircleOutlined, FormatColorFill, FormatBold, FormatItalic, ChangeHistory, Delete, ZoomOutMap} from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import Konva from 'konva';
import React from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
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
    const [selectedOption, setSelected] = useState("None");
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
                    <Rect
                    x={10}
                    y={100}
                    width={100}
                    height={100}
                    fill="red"
                    shadowBlur={10}
                    draggable="true"
                    />
                </Layer>
            </Stage>
        </div>
    </div>

    );
}