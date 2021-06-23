import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline,Typography, Button, Box} from "@material-ui/core";
import customizedTheme from '../customizedTheme'
import {useStyles} from '../stylesheets/SignUpStyle'
import {StyledTextField} from '../CustomizedComponents'
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import sign_up_image from '../assets/sign_up_image.png'

const ERROR_MESSAGE = {
    USERNAME_EXISTS: ' The username already exists. Please try another one.',
    EMAIL_EXISTS: ' The email has already registered an account',
    TIMEOUT: ' Sign up timed out. Please check your network connection.',
}


export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignUp = () => {
        alert('Username: ' + username + '\nEmail: ' + email + '\nPassword: ' + password);
        displayErrorMessage(ERROR_MESSAGE.TIMEOUT)
    }

    const displayErrorMessage = (errorMessage) => {
        setMessage(errorMessage);
        setError(true);
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

                        <Typography className={classes.signUp_error} variant="body1" color='error'>
                            {error &&
                            <>
                                <ErrorOutlineIcon color='error'/>
                                {message}
                            </>
                            }
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
                                    onClick={handleSignUp}
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
