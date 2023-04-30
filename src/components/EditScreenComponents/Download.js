import { Dialog, DialogTitle, Button, Stack } from "@mui/material";


export default function Download({setOpen, open}){

    function handleGeo(){
        setOpen(false);
    }

    function handleShp(){
        setOpen(false);
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