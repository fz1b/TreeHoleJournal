import { TextField, withStyles } from '@material-ui/core';
import customizedTheme from '../customizedTheme';
import InputBase from '@material-ui/core/InputBase';
// the coloring for the TextField border
export const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: customizedTheme.palette.primary.dark,
            borderWidth: '2px',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: customizedTheme.palette.primary.main,
            borderWidth: '2px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: customizedTheme.palette.primary.main,
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: customizedTheme.palette.primary.dark,
                borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
                borderColor: customizedTheme.palette.primary.dark,
                borderWidth: '2px',
            },
        },
    },
})(TextField);
export const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        width: 60,
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            marginTop: '0',
        },
    },
}))(InputBase);
