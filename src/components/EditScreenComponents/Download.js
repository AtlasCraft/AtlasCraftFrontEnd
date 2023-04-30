import { useContext } from "react";
import { Dialog, DialogTitle, Button, Stack } from "@mui/material";
import GlobalStoreContext from '../../store'

export default function Download({setOpen, open}){
    const { store } = useContext(GlobalStoreContext);
    function handleGeo(){
        setOpen(false);
        store.downloadGeo();
    }

    function handleShp(){
        setOpen(false);
        store.downloadShp();
    }

    return (
        <Dialog onClose={()=>{setOpen(false)}} open={open}>
            <DialogTitle>Download Files</DialogTitle>
            <Stack direction="row">
                <Button onClick={handleGeo} variant="outlined">Download GeoJson File</Button>
                <Button onClick={handleShp} variant="outlined">Download Shp/Dbf Files</Button>
            </Stack>
        </Dialog>
    );
}