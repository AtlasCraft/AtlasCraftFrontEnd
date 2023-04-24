import React from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

const ChangePasswordScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    console.log(auth);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        history.goBack();
        auth.changePassword(
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
                newPasswordConfirm: confirmNewPassword
            },
            store
        );
    };

    const handleFormCancel = () => {
        // Reset form fields
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        history.goBack();
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '64px' }}>
            <Grid justifyContent="center" style={{ borderRadius: '10px', height: '70%', width: '70%', padding: '36px', backgroundColor: '#1C353D' }}>
                <Grid item xs={12}>
                    <h1 style={{ color: '#E5CAAD' }}>Change Password</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Old Password"
                                    type="password"
                                    fullWidth
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
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

export default ChangePasswordScreen;
