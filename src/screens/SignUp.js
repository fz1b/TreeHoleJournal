import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline,Typography, Button, Link, Box, Grid} from "@material-ui/core";
import customizedTheme from '../customizedTheme'
import {useStyles} from '../stylesheets/SignUpStyle'
import {StyledTextField} from '../CustomizedComponents'
import sign_up_image from '../assets/sign_up_image.png'



export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        alert('Username: ' + username + '\nEmail: ' + email + '\nPassword: ' + password);
    }

    return (
        <ThemeProvider theme={customizedTheme}>
            <CssBaseline />
            <div className={classes.background}>
                <div className={classes.main}>
                    <img src={sign_up_image} className={classes.signUp_image} alt=''/>
                    <div className={classes.signUp_form}>
                            <Typography className={classes.signUp_title} variant="h3" color='primary'>
                                Sign Up
                            </Typography>
                            <form className={classes.form} noValidate>

                                <Typography className={classes.input_label} variant="body1">
                                    Username
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(event => {setUsername(event.target.value)})}
                                />

                                <Typography className={classes.input_label} variant="body1">
                                    Email
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(event => {setEmail(event.target.value)})}
                                />

                                <Typography className={classes.input_label} variant="body1">
                                    Password
                                </Typography>
                                <StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(event => {setPassword(event.target.value)})}
                                />

                                <Box className={classes.buttons}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className={classes.signUp_button}
                                        onClick={handleLogin}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            </form>
                        </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
