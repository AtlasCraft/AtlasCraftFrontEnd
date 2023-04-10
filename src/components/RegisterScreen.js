import { useContext } from "react";
import AuthContext from "../auth";
// import Copyright from "./Copyright";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GlobalStoreContext } from "../store";
import Select, { StylesConfig } from 'react-select';
import { ClassNames } from "@emotion/react";
// import ErrorModal from "./ErrorModal";



export default function RegisterScreen() {
	const { auth } = useContext(AuthContext);
	const { store } = useContext(GlobalStoreContext);

	const options = [
		{label: "What is your favorite color?", value: 1, className: 'q1'},
		{label: "What is name of your uncle?", value: 2, className: 'q2'},
		{label: "What is name of your best friend?", value: 3, className: 'q3'},
		{label: "What is name of the city you were born?", value: 4, className: 'q4'},
	];

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		auth.registerUser(
			{
				firstName: formData.get("firstName"),
				lastName: formData.get("lastName"),
				email: formData.get("email"),
				username: formData.get("username"),
				password: formData.get("password"),
				passwordVerify: formData.get("passwordVerify"),
				question1: formData.get(options),
				answer1: formData.get("answer1"),
				question2: formData.get(options),
				answer2: formData.get("answer2")
			},
			store
		);
	};
	  

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: 'absolute',
					position: 'absolute', left: '50%', top: '50%',
        			transform: 'translate(-50%, -50%)',
					backgroundColor: '#1C353D',
					borderRadius: '10px'

				}}
			>
			{/* 
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
				*/}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="passwordVerify"
								label="Password Verify"
								type="password"
								id="passwordVerify"
								autoComplete="new-password"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
						<Select
							options={options}
							placeholder={'Security Question1'}
							clearable={false}
						/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="answer1"
								label="answer1"
								name="answer1"
								autoComplete="answer1"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
						<Select
							options={options}
							placeholder={'Security Question2'}
							clearable={false}
						/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="answer2"
								label="answer2"
								name="answer2"
								autoComplete="answer2"
								sx={{input:{color:"#F5DEB3"}}}
                                InputLabelProps={{sx: {color:"#F5DEB3"}}}
							/>
						</Grid>
						
					</Grid>
					
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create Account
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				{/*</Box>*/}			
			</Box>
			{/* <Copyright /> */}
			{/* <ErrorModal /> */}
		</Container>
	);
}
