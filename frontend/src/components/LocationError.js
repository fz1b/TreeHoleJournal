import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import customizedTheme from '../customizedTheme.js';
import {ThemeProvider} from '@material-ui/core';
function LocationError() {
    return (
        <ThemeProvider theme={customizedTheme}>
            <Box m={2} display='flex' alignItems='center' flexDirection="column">
           
            <Typography variant='h2' color='primary'>
                    🛸
                </Typography>
                <Typography variant='h6' color='primary'>
                    Please allow location access to explore nearby journals
                </Typography>
            </Box>
        </ThemeProvider>
    );
}
export default LocationError;
