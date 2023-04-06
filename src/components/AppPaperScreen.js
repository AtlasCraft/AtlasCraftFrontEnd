import { Paper } from "@mui/material";
import React from "react";
import Image from "./../util/hd-wallpaper-gf327242da_1920.jpg";
const style = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
		height:"92%"
		
    }
};

const AppPaperScreen = () => {
	return (
		<Paper style={style.paperContainer}>

		</Paper>
	);
};

export default AppPaperScreen;