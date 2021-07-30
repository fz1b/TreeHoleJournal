import React, { useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import AuthContext from '../authAPI/auth-context';
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
    },
    password: {
        margin: theme.spacing(2),
    },
}));

export default function AccountInfo(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);

    const [open, setOpen] = React.useState(props.open);
    const [accountName, setAccountName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setpassword] = React.useState('');

    useEffect(() => {
        const setName = () => {
            axios
                .get(`http://localhost:5000/users/info/${auth.token}`)
                .then((response) => {
                    setAccountName(response.data.userData.name);
                    setEmail(response.data.userData.email);
                    // handleAccountName(response.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        setName();
    }, [auth.token]);

    const handleClose = () => {
        setOpen(false);
        props.handleInfoClose(false);
    };

    const handleSave = async () => {
        const reqBody = JSON.stringify({
            email: email,
            accountName: accountName,
            password: password,
        });

        try {
            const response = await axios.post(
                'http://localhost:5000/users/reset/',
                reqBody,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            auth.loginHandler(response.data.idToken);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    Account Information
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        In this page you can change your email as well as
                        username. You can also reset your password. Changing the
                        avatar image will be coming soon in a later release.
                    </DialogContentText>
                    <Grid
                        container
                        alignItems='center'
                        justify='center'
                        direction='row'
                    >
                        <Avatar className={classes.avatar}>
                            {accountName.charAt(0)}
                        </Avatar>
                    </Grid>
                    <form noValidate autoComplete='off'>
                        <Grid
                            container
                            direction='row'
                            justify='center'
                            alignItems='center'
                            spacing={1}
                        >
                            <Grid item sm={5}>
                                <TextField
                                    autoFocus
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
                                    variant='outlined'
                                    autoFocus
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
                                    id='email'
                                    label='Password'
                                    type='password'
                                    value={password}
                                    onChange={(event) => {
                                        setpassword(event.target.value);
                                    }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button disabled onClick={handleSave} color='primary'>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
