import Button from '@material-ui/core/Button';
import customizedTheme from '../customizedTheme.js'
import { ThemeProvider } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import GlobalCss from '../GlobalCss';
import JournalModal from '../components/JournalModal'
import {useState} from 'react';

const mockJournal = {
    uniqueID: '111',
    title: 'The First Journal',
    date: '2021.06.03',
    coverImage: 'https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    privacy_setting:'private'
}

function TestPage(){
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () =>{
        setShowModal(true);
    }
    const handleModalClose = ()=>{
        setShowModal(false)
    }
    const handleRequest = ()=>{
        // editJournal('3545345354', '60ebcceb76ac463ed317f37b', 'Test Test', '', 'https://blooloop.com/wp-content/uploads/2021/04/vancouver-aquarium-herschend-768x480.jpeg',
        //     'sunny', '354354534354545345', 'ANONYMOUS')
        //     .then(res => alert(JSON.stringify(res)));
        // alert('HOW DARE YOU TOUCH MY BUTTON?');
    }

return(
    <ThemeProvider theme={customizedTheme}>
        {showModal&&<JournalModal journal={mockJournal} handleClose={handleModalClose} authorMode={true}/>}
        <Button variant="outlined" color='primary' onClick={handleShowModal}>View Modal</Button>
        <Button variant="contained" color='primary'>Login</Button>
        <TextField id="outlined-basic"  variant="outlined" size="small" />
        <TextField id="outlined-basic"  variant="outlined" multiline="true" rows='10' />
        <Button variant="outlined" color='primary' onClick={handleRequest}>Request</Button>
        <GlobalCss/>
        <Button classes={{ label: 'bigBtn' }}>Hello</Button>

    </ThemeProvider>

)
}
export default TestPage