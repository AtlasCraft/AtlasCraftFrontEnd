import { useContext, useState } from "react";
import { Dialog, DialogTitle, Tab, Button, Stack, DialogContent, Divider } from "@mui/material";
import {TabList, TabContext, TabPanel } from '@mui/lab'
import GlobalStoreContext from '../../store'
import Basics from "./helptabs/Basics";
import MapNav from "./helptabs/MapNav";
import VertexEdit from "./helptabs/VertexEdit";
import RegionEdit from "./helptabs/RegionEdit";

const style = {
    dialogStyle:{
        height:"75vh"
    }
}

export default function Help({setOpen, open}){
    const { store } = useContext(GlobalStoreContext);
    const [value, setTab] = useState('1');
    return (
        <Dialog onClose={()=>{setOpen(false)}} open={open} fullWidth maxWidth={'lg'} >
            <DialogContent sx={style.dialogStyle}>
                <DialogTitle>Help</DialogTitle>
                <TabContext value={value}>
                    <TabList onChange={(e, val)=>{setTab(val)}} aria-label="lab API tabs example">
                        <Tab label="Basics" value="1" />
                        <Tab label="Map Navigation" value="2" />
                        <Tab label="Vertex Editing" value="3" />
                        <Tab label="Region Editing" value="4" />
                    </TabList>
                    <Divider />
                    <TabPanel value="1">
                        <Basics/>
                    </TabPanel>
                    <TabPanel value="2">
                        <MapNav/>
                    </TabPanel>
                    <TabPanel value="3">
                        <VertexEdit/>
                    </TabPanel>
                    <TabPanel value="4">
                        <RegionEdit/>
                    </TabPanel>
                </TabContext>
                
            </DialogContent>
        </Dialog>
    );
}