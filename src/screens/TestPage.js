import Button from '@material-ui/core/Button';
import customizedTheme from '../customizedTheme.js'
import { ThemeProvider } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import GlobalCss from '../GlobalCss'
function TestPage(){
    console.log(customizedTheme)
return(
    <ThemeProvider theme={customizedTheme}>
        <Button variant="outlined" color='primary'>Login</Button>
        <Button variant="contained" color='primary'>Login</Button>
        <TextField id="outlined-basic"  variant="outlined" size="small" />
        <TextField id="outlined-basic"  variant="outlined" multiline="true" rows='10' />
        <GlobalCss/>
        <Button classes={{ label: 'bigBtn' }}>Hello</Button>

    </ThemeProvider>

)
}
export default TestPage