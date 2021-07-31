import { createTheme } from '@material-ui/core';
const customizedTheme = createTheme({
    palette: {
        primary: {
            light: '#95CED1',
            main: '#50A9C1',
            dark: '#3C7891',
            contrastText: '#fff',
        },
        secondary: {
            main: '#F7D799', //Another orange-ish color
        },
    },
    typography: {
        button: {
            fontSize: '1rem',
        },
        textarea: {
            color: '#50A9C1',
        },
    },
    // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

export default customizedTheme;
