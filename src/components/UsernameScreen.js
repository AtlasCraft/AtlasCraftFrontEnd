import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const UsernameScreen = () => {

    const [username, setUsername] = useState('');
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUsername('');
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '64px' }}>
            <Grid justifyContent="center" style={{ borderRadius: '10px', height: '70%', width: '70%', padding: '36px', backgroundColor: '#1C353D' }}>
                <Grid item xs={12}>
                    <h1 style={{ color: '#E5CAAD' }}>Retrieve Password</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Type your user name"
                                    type="username"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/forgotpassword">
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                                </Link>
                                <Link to="/">
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginLeft: 8 }}
                                >
                                   Cancel
                                </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UsernameScreen;
