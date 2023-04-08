import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

const PasswordRetrievalPage = () => {
    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [securityQuestion1, setSecurityQuestion1] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [securityQuestion2, setSecurityQuestion2] = useState('');
    const [answer2, setAnswer2] = useState('');

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
        setNewPassword('');
        setConfirmNewPassword('');
        setSecurityQuestion1('');
        setAnswer1('');
        setSecurityQuestion2('');
        setAnswer2('');
        history.push("/");
    };

    const handleFormCancel = () => {
        // Reset form fields
        setNewPassword('');
        setConfirmNewPassword('');
        setSecurityQuestion1('');
        setAnswer1('');
        setSecurityQuestion2('');
        setAnswer2('');
        history.push("/");
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '64px' }}>
            <Grid justifyContent="center" style={{ borderRadius: '10px', height: '70%', width: '70%', padding: '36px', backgroundColor: '#1C353D' }}>
                <Grid item xs={12}>
                    <h1>Retrieve Password</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
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
                                <TextField
                                    label="Security Question 1: What was your favorite school teacher’s name?"
                                    fullWidth
                                    value={answer1}
                                    onChange={(e) => setAnswer1(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Security Question 2: What’s your favorite movie?"
                                    fullWidth
                                    value={answer2}
                                    onChange={(e) => setAnswer2(e.target.value)}
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
