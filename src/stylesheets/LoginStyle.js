import {makeStyles} from '@material-ui/core/styles';
import login_background from "../login_background.png";
import customizedTheme from '../customizedTheme'

export const useStyles = makeStyles((theme) => ({
    background: {
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${login_background})`,
        height:'100vh',
        width: '100vw',
        position: 'fixed'
    },
    main: {
        overflow: 'hidden',
        borderRadius: 20,
        height:'75%',
        width: '60%',
        marginTop: '5%',
        marginLeft: '20%',
        marginRight: '20%',
        backgroundColor:'#ffffff',
        position: 'responsive',
        [customizedTheme.breakpoints.down('lg')]: {
            height:'80%',
            width: '80%',
            marginLeft: '10%',
            marginRight: '10%',
        },
        [customizedTheme.breakpoints.only('xs')]: {
            marginTop: '10%',
        },
        "@media (max-height:700px)":{
            height:'85%',
        },
        "@media (max-height:600px)":{
            height:'90%',
        }
    },
    login_image: {
        width: '50%',
        height: '100%',
        float: 'left',
        [customizedTheme.breakpoints.down('sm')]: {
            width: '0%',
            height: '0%'
        },
    },
    login_form: {
        marginTop: '0%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        float: 'right',
        width: '40%',
        height: '100%',
        marginLeft: '5%',
        marginRight: '5%',
        [customizedTheme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            marginLeft: '10%',
            marginRight: '10%',
        },
    },
    login_title: {
        fontFamily: 'Arial',
        textAlign: 'left',
        marginTop: '5%',
        marginBottom: '10%',
        [customizedTheme.breakpoints.down('lg')]: {
            marginBottom: '5%'
        },
    },
    login_error: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        minHeight: '5%',
        maxHeight: '5%',
        marginBottom: '5%',
        [customizedTheme.breakpoints.down('xs')]: {
            marginBottom: '30%',
        },
    },
    input_label: {
        color: customizedTheme.palette.primary.dark,
    },
    form: {
        width: '100%',
        marginTop: '5%',
    },
    buttons: {
        margin: theme.spacing(10, 0, 2),
        textAlign: 'center',
        [customizedTheme.breakpoints.down('xs')]: {
            marginTop: '8%',
        },
    },
    login_button: {
        width: '80%',
        textTransform: "none",
        fontSize: '150%'
    },
}));