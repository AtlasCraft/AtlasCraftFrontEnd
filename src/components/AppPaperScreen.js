import { Paper } from "@mui/material";
import React from "react";
import Image from "./../util/hd-wallpaper-gf327242da_1920.jpg";
// import Image from "./../util/WorldMapBackground.jpg";

const style = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
		height:"92%",
        width:"100%",
        zIndex:"0",
        position: "absolute"
		
    }
};

const AppPaperScreen = (props) => {
	return (
		<Paper style={style.paperContainer}>
            {props.children}
		</Paper>
	);
};

export default AppPaperScreen;