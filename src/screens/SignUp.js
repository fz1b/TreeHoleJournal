import React, {useContext, useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline,Typography, Button, Link, Box} from "@material-ui/core";
import customizedTheme from '../customizedTheme'
import {useStyles} from '../stylesheets/SignUpStyle'
import {StyledTextField} from '../components/CustomizedComponents'
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import sign_up_image from '../assets/sign_up_image.png'
import authAPIKeyContext from '../authAPI/authAPIKey-context';
import AuthContext from '../authAPI/auth-context';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const hasError = !! errMessage;

    const authAPIKey = useContext(authAPIKeyContext);
    const auth = useContext(AuthContext);

    const handleSignup = async () => {
        // alert('Username: ' + username + '\nEmail: ' + email + '\nPassword: ' + password);
        // Username is used in our backend only. Has nothing to do with firebase authentication.
        const reqBody = JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        });
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
                reqBody,
                {
                    params: {key: authAPIKey.key},
                    headers: {'Content-Type': 'application/json'}
                }
            );
            // successful landing
            hideErrorMessage();
            console.log(response);
            auth.loginHandler(response.data.idToken);
            setIsLoading(false);
            // redirect user to me page, cannot use back button to go back.
            history.replace('/me');
        } catch (err){
            console.log(err.response);
            if(err.response.data.error.message) {
                displayErrorMessage(err.response.data.error.message);
            } else {
                displayErrorMessage("Unable to sign up. Please try again.")
            }
            
        }
        setIsLoading(false);
    }

    const displayErrorMessage = (errorMessage) => {
        switch (errorMessage) {
            case 'INVALID_EMAIL':
                setErrMessage('The email address is invalid.');
                break;
            case 'EMAIL_EXISTS':
                setErrMessage('An account with this email already exists. You might want to login.');
                break;
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                setErrMessage('Password should be at least 6 characters');
                break;
            default:
                setErrMessage(errorMessage);
                break;
        }
    }
    const hideErrorMessage = () => {
        setErrMessage('');
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
                            {hasError &&
                            <>
                                <ErrorOutlineIcon color='error'/>
                                {errMessage}
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
                                        onClick={handleSignup}
                                        disabled={isLoading}
                                    >
                                        {!isLoading && 'Sign Up'}
                                        {isLoading && 'Please Wait...'}
                                    </Button>
                                </Box>
                            </form>
                            <Link href="/login" variant="body2" style={{textAlign: 'center'}}>
                                {"Already have an account? Log In"}
                            </Link>
                        </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
