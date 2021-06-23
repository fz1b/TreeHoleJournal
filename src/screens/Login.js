import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline,Typography, Button, Link, Box, Grid} from "@material-ui/core";
import customizedTheme from '../customizedTheme'
import {useStyles} from '../stylesheets/LoginStyle'
import {StyledTextField} from '../CustomizedComponents'
import login_image from '../login_image.png'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ERROR_MESSAGE = {
    CREDENTIAL: ' Your credentials are incorrect or have expired. Please try again or reset your password.',
    TIMEOUT: ' Login timed out. Please check your network connection.',
    EXPIRED: ' Your session has expired due to inactivity. You have been logged out.'
}

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');



    const handleLogin = () => {
        alert('Email: ' + email + '\n Password: ' + password);
        displayErrorMessage(ERROR_MESSAGE.TIMEOUT)
    }

    const displayErrorMessage = (errorMessage) => {
        setMessage(errorMessage);
        setError(true);
    }

    const hideErrorMessage = () => {
        setError(false);
    }

    return (
        <ThemeProvider theme={customizedTheme}>
            <CssBaseline />
            <div className={classes.background}>
                <div className={classes.main}>
                    <img src={login_image} className={classes.login_image} alt=''/>
                    <div className={classes.login_form}>
                        <Typography className={classes.login_title} variant="h3" color='primary'>
                                Login
                        </Typography>

                        <Typography className={classes.login_error} variant="body1" color='error'>
                            {error &&
                            <>
                                <ErrorOutlineIcon color='error'/>
                                {message}
                            </>
                            }
                        </Typography>

                        <form className={classes.form} noValidate>
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
                                    className={classes.login_button}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
