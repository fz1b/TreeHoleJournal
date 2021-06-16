import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {
    Container, CssBaseline,Typography,
    TextField, Button, Link, Box, withStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import login_image from '../login_image.png'
import {useStyles, StyledTextField, themePalette} from '../stylesheets/LoginStyle'


export default function Login() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={themePalette}>
            <CssBaseline />
            <div className={classes.background}>
                <div className={classes.main}>
                    <img src={login_image} className={classes.login_image} alt=''/>
                    <div className={classes.login_form}>
                            <Typography className={classes.login_title} variant="h3" color='primary'>
                                Login
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
                                />
                                <Box className={classes.buttons}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className={classes.login_button}
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