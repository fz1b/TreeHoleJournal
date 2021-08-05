import React, { useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import customizedTheme from '../customizedTheme';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AuthContext from '../authAPI/auth-context';
import Box from '@material-ui/core/Box';
import { fetchUserInfo, changePassword } from '../services/UserServices'
import {
    Grid,
    Avatar,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogContentText,
} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label='close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(5),
        fontSize: 40,
        backgroundColor: '#50A9C1',
    },
    password: {
        margin: theme.spacing(2),
    },
    signUp_error: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        minHeight: '5%',
        maxHeight: '5%',
        marginBottom: '0%',
        [customizedTheme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        },
    },
}));

export default function AccountInfo(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);

    const [accountName, setAccountName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');
    const hasError = !!errMessage;

    useEffect(() => {
        const setName = async () => {
            const userData = await fetchUserInfo(auth.token)
            if (userData) {
                setAccountName(userData.name);
                setEmail(userData.email);
            }
        };
        setName();
    }, [auth.token]);

    const handleClose = () => {
        props.handleInfoClose(false);
    };

    const hideErrorMessage = () => {
        setErrMessage('');
    };

    const displayErrorMessage = (errorMessage) => {
        switch (errorMessage) {
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                setErrMessage('Password should be at least 6 characters');
                break;
            case 'INVALID_ID_TOKEN':
                setErrMessage(
                    'Your credential has expired. Please sign in again.'
                );
                break;
            default:
                setErrMessage(errorMessage);
                break;
        }
    };

    const handleChangePassword = async () => {
        const request = {
            token: auth.token,
            password: password
        }
        try {
            setIsLoading(true);
            hideErrorMessage();
            const tokenData = await changePassword(request);
            auth.loginHandler(tokenData);
            setIsLoading(false);
            handleClose();
        } catch (err) {
            if (err.response.data.message) {
                displayErrorMessage(err.response.data.message);
            } else {
                displayErrorMessage('Unable to change password. Please try again.');
            }
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={props.open}
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    Account Information
                </DialogTitle>
                <DialogContent dividers>
                    <Box m={2}>
                        <DialogContentText>
                            In this page you can change your email as well as
                            username. You can also reset your password. Changing the
                            avatar image will be coming soon in a later release.
                        </DialogContentText>
                    </Box>
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='center'
                        direction='row'
                    >
                        <Avatar className={classes.avatar}>

                        </Avatar>
                    </Grid>
                    <Grid 
                        container
                        alignItems='center'
                        justifyContent='center'
                        direction='row'
                    >
                        <Typography
                            className={classes.signUp_error}
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
                    </Grid>
                    <form noValidate autoComplete='off'>
                        <Grid
                            container
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={1}
                        >
                            <Grid item sm={5}>
                                <TextField
                                    disabled
                                    variant='outlined'
                                    margin='normal'
                                    id='accountName'
                                    label='Username'
                                    type='text'
                                    fullWidth
                                    value={accountName}
                                    onChange={(event) => {
                                        setAccountName(event.target.value);
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item sm={5}>
                                <TextField
                                    disabled
                                    variant='outlined'
                                    margin='normal'
                                    id='email'
                                    label='Email Address'
                                    type='email'
                                    fullWidth
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item sm={10}>
                                <TextField
                                    variant='outlined'
                                    autoFocus
                                    margin='normal'
                                    id='password'
                                    label='Change your password'
                                    type='password'
                                    value={password}
                                    onChange={(event) => {
                                        setpassword(event.target.value);
                                    }}
                                    autoComplete='new-password'
                                    fullWidth
                                    required
                                />
                                <TextField
                                    disabled={!password}
                                    variant='outlined'
                                    margin='normal'
                                    id='confirm_password'
                                    label='Confirm your password'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                    }}
                                    autoComplete='new-password'
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button disabled={(password !== confirmPassword) || isLoading || !password} onClick={handleChangePassword} color='primary'>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
