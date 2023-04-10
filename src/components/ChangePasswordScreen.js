import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

const ChangePasswordScreen = () => {
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        // if (
        //     newPassword === '' ||
        //     confirmNewPassword === '' ||
        //     securityQuestion1 === '' ||
        //     answer1 === '' ||
        //     securityQuestion2 === '' ||
        //     answer2 === ''
        // ) {
        //     alert('Please fill in all the fields.');
        //     return;
        // }

        // Perform password retrieval logic
        // ...

        // Reset form fields
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        history.goBack();
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
