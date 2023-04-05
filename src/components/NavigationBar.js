import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { Button } from '@mui/material';

export default function AppBanner() {
	const { auth } = useContext(AuthContext);
	const { store } = useContext(GlobalStoreContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMenuClose();
		auth.logoutUser(store);
	};
	function handleChangePassword(){
		//todo
	}
	const menuId = "primary-search-account-menu";
	const menuItems = useMemo(() => {
		let temp = <>
			<MenuItem onClick={handleMenuClose}>
				<Link to="/">Create New Account</Link>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link to="/">Login</Link>
			</MenuItem>
		</>;
		if(auth.loggedIn){
			temp = <>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
				<MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
			</>;
		}
		return temp
	}, [auth.loggedIn]);
	function getAccountMenu(loggedIn) {
		if (loggedIn) {
			return (
				<Avatar
					sx={{
						width: 45,
						height: 45,
						backgroundColor: "purple",
					}}
				>
					{auth.user.firstName.charAt(0).toUpperCase() +
						auth.user.lastName.charAt(0).toUpperCase()}
				</Avatar>
			);
		}
		return <AccountCircle style={{color: "#F5DEB3", transform:"scale(1.6)"}}/>;
	}

	return (
		<Box style={{width:"100%"}}>
			<AppBar position="static" sx ={{background: "#1C353D", width:"100%"}}>
				<Toolbar style={{width:"95%"}}>
					<Button style = {{borderRadius:"25px"}}>
						<img src = {require('./../util/AtlasCraftLogo.png')} style ={{width: "40px", height: "40px", borderRadius:"25px"}}/>
					</Button>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: "none", sm: "block", color: "#F5DEB3" } }}
					>
						AtlasCraft
					</Typography>
					<Box sx={{ flexGrow: 1 }}></Box>
					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="#F5DEB3"
					>
						{getAccountMenu(auth.loggedIn)}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				id={menuId}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				{menuItems}
			</Menu>
		</Box>
	);
}
