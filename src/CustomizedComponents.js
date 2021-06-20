import {TextField, withStyles} from "@material-ui/core";
import customizedTheme from "./customizedTheme";

// the coloring for the TextField border
export const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: customizedTheme.palette.primary.dark,
            borderWidth:'2px'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: customizedTheme.palette.primary.main,
            borderWidth:'2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: customizedTheme.palette.primary.main,
                borderWidth:'2px'
            },
            '&:hover fieldset': {
                borderColor: customizedTheme.palette.primary.dark,
                borderWidth:'2px'
            },
            '&.Mui-focused fieldset': {
                borderColor: customizedTheme.palette.primary.dark,
                borderWidth:'2px'
            },
        },
    },
})(TextField);