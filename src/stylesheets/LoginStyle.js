import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import login_background from "../login_background.png";
import {TextField, withStyles} from "@material-ui/core";

const colorTheme = {
    light: '#F7D799',
    main: '#50A9C1',
    dark: '#376071',
}
const themePalette = createMuiTheme({
    palette: {
        primary: {
            light: colorTheme.light,
            main: colorTheme.main,
            dark: colorTheme.dark,
            contrastText: '#fff',
        }
    },
});
const useStyles = makeStyles((theme) => ({
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
        marginTop: '5%',
        height:'75%',
        width: '60%',
        marginLeft: '20%',
        marginRight: '20%',
        backgroundColor:'#ffffff',
    },
    login_image: {
        background: '#FCF7E7',
        width: '50%',
        height: '100%',
        float: 'left',
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
    },
    login_title: {
        fontFamily: 'Arial',
        textAlign: 'left',
        marginTop: '5%',
        marginBottom: '20%',
    },
    input_label: {
        color: colorTheme.dark,
    },
    form: {
        width: '100%',
        marginTop: '5%',
    },
    buttons: {
        margin: theme.spacing(10, 0, 2),
        textAlign: 'center',
    },
    login_button: {
        width: '80%',
        textTransform: "none",
        fontSize: '150%'
    },
}));

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: colorTheme.dark,
            borderWidth:'2px'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colorTheme.main,
            borderWidth:'2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colorTheme.main,
                borderWidth:'2px'
            },
            '&:hover fieldset': {
                borderColor: colorTheme.dark,
                borderWidth:'2px'
            },
            '&.Mui-focused fieldset': {
                borderColor: colorTheme.dark,
                borderWidth:'2px'
            },
        },
    },
})(TextField);

export {useStyles, StyledTextField, colorTheme, themePalette}