import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

// import Copyright from "./Copyright";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import { GlobalStoreContext } from "../store";
// import ErrorModal from "./ErrorModal";

const LoginScreen = () => {
	const { auth } = useContext(AuthContext);
	const { store } = useContext(GlobalStoreContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleLogin = (e) => {
		e.preventDefault();

		// If login is successful, navigate to the home page
		if (authValidation()) {
			auth.fakeLogin();
		}
	};

	function authValidation() { return true; } // TODO

	return (
		<Grid container justifyContent="center" style={{ height: '100%', padding: '48px' }}>
			{/* Wrap the grids in a container grid with padding around it */}
			<Grid item xs={12} md={7} style={{ height: '100%' }}>
				{/* Picture on the left taking up 3/5 of the area */}
				<img
					src={require('./../util/AtlasCraftLogo.png')}
					alt="Logo"
					style={{ width: '100%', height: '100%' }} />
			</Grid>
			<Grid item xs={12} md={5} style={{ backgroundColor: '#1C353D', height: '100%' }} >
				<Typography variant="h3" style={{ padding: '24px' }} align="center" color={'#E5CAAD'}>
					AtlasCraft
				</Typography>
				<Typography variant="h6" align="center" color={'#E5CAAD'}>
					Welcome to AtlasCraft
				</Typography>
				<Typography variant="h6" align="center" color={'#E5CAAD'}>
					A Map Editing, Viewing, and Sharing Platform
				</Typography>
				<Grid container style={{ padding: '24px' }} >
					{/* Login component on the right taking up 2/5 of the area */}
					<form onSubmit={handleLogin}>
						<TextField
							label="Username"
							variant="outlined"
							fullWidth
							margin="normal"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							label="Password"
							variant="outlined"
							fullWidth
							margin="normal"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Login
						</Button>
						<Grid container justifyContent="space-between">
							{/* "Sign Up" and "Forgot password" links on the same line */}
							<Grid item>
								<Link href="/signup" variant="body2">
									Sign Up
								</Link>
							</Grid>
							<Grid item>
								<Link href="/forgotpassword" variant="body2">
									Forgot Password
								</Link>
							</Grid>

						</Grid>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LoginScreen;
