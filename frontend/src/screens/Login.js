import React, { useContext, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
    CssBaseline,
    Typography,
    Button,
    Link,
    Box,
    Grid,
} from '@material-ui/core';
import customizedTheme from '../customizedTheme';
import { useStyles } from '../stylesheets/LoginStyle';
import { StyledTextField } from '../components/CustomizedComponents';
import login_image from '../assets/login_image.png';
import AuthContext from '../authAPI/auth-context';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useHistory } from 'react-router';
import { loginService } from '../services/UserServices';

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const hasError = !!errMessage;
    const auth = useContext(AuthContext);

    const handleLogin = async () => {
        const reqBody = JSON.stringify({
            email: email,
            password: password,
        });
        if (email === '' || password === '') {
            displayErrorMessage(
                'All three fields cannot be empty. Please try again.'
            );
            return;
        }
        setIsLoading(true);
        try {
            hideErrorMessage();
            const tokenData = await loginService(reqBody);
            auth.loginHandler(tokenData);
            // redirect user to me page, cannot use back button to go back.
            history.replace('/me');
        } catch (err) {
            if (err.response.data.message) {
                displayErrorMessage(err.response.data.message);
            } else {
                displayErrorMessage('Unable to login. Please try again later.');
            }
            setIsLoading(false);
        }
    };

    const displayErrorMessage = (errorMessage) => {
        switch (errorMessage) {
            case 'INVALID_EMAIL':
                setErrMessage('The email address is invalid.');
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                setErrMessage(
                    ' Your credentials are incorrect or have expired. Please try again or reset your password.'
                );
                break;
            default:
                setErrMessage(errorMessage);
                break;
        }
    };

    const hideErrorMessage = () => {
        setErrMessage('');
    };

    return (
        <ThemeProvider theme={customizedTheme}>
            <CssBaseline />
            <div className={classes.background}>
                <div className={classes.main}>
                    <img
                        src={login_image}
                        className={classes.login_image}
                        alt=''
                    />
                    <div className={classes.login_form}>
                        <Typography
                            className={classes.login_title}
                            variant='h3'
                            color='primary'
                        >
                            Login
                        </Typography>

                        <Typography
                            className={classes.login_error}
                            variant='body1'
                            color='error'
                        >
                            {hasError && (
                                <>
                                    <ErrorOutlineIcon color='error' />
                                    {errMessage}
                                </>
                            )}
                        </Typography>

                        <form className={classes.form} noValidate>
                            <Typography
                                className={classes.input_label}
                                variant='body1'
                            >
                                Email
                            </Typography>
                            <StyledTextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                            <Typography
                                className={classes.input_label}
                                variant='body1'
                            >
                                Password
                            </Typography>
                            <StyledTextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                            <Box className={classes.buttons}>
                                <Button
                                    type='button'
                                    variant='contained'
                                    color='primary'
                                    className={classes.login_button}
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                >
                                    {!isLoading && 'Login'}
                                    {isLoading && 'Please Wait...'}
                                </Button>
                            </Box>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='/signup' variant='body2'>
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
