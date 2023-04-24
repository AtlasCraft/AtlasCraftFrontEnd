import React from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

const PasswordRetrievalPage = () => {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    console.log(auth);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUsername('');
        setNewPassword('');
        setConfirmNewPassword('');
        setAnswer1('');
        setAnswer2('');
        history.push("/");
        auth.forgotPassword(
            {
              username: username,
              newPassword: newPassword,
              newPasswordConfirm: confirmNewPassword,
              answer1: answer1,
              answer2: answer2
            },
            store
        );
    };

    const handleFormCancel = () => {
        // Reset form fields
        setUsername('');
        setNewPassword('');
        setConfirmNewPassword('');
        setAnswer1('');
        setAnswer2('');
        history.push("/");
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
                                    label="User Name"
                                    type="username"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Security Answer 1"
                                    fullWidth
                                    value={answer1}
                                    onChange={(e) => setAnswer1(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Security Answer 2"
                                    fullWidth
                                    value={answer2}
                                    onChange={(e) => setAnswer2(e.target.value)}
                                    sx={{input:{color:"#F5DEB3"}}}
                                    InputLabelProps={{sx: {color:"#F5DEB3"}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleFormCancel}
                                    style={{ marginLeft: 8 }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PasswordRetrievalPage;
