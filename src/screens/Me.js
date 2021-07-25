import customizedTheme from '../customizedTheme.js'
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { MdAddCircleOutline } from "react-icons/md";
import journalImg from "../assets/myjournals_bg.svg"
import {useState} from 'react';
import JounalModal from "../components/JournalModal"
const useStyles = makeStyles((theme) => ({
  my_journals_bg: {
    backgroundImage: `url(${journalImg})`,
    backgroundColor: 'aliceblue',
    backgroundSize: '600px',
    backgroundRepeat: 'no-repeat',
    height: '30vh',
    backgroundPosition: '30% -30%',
  },
  compose: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      marginBottom: '1.5rem'
    },
  },
  compose_btn: {
    margin: '30px',
    paddingInline: '1rem',
  }
}));
const date = new Date()
const newJournal = {
  title: '',
  date: date.toDateString(),
  coverImage: '',
  content: '',
  privacy_setting:'PRIVATE'
}

export default function Me() {

  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const handleCompose = () => {
    setShowModal(true);
  }
  const handleModalClose = ()=>{
    setShowModal(false);
  }

  const handleSave = ()=>{
    setShowModal(false);
  }
  const updateJournal = (journal_id, newJournal) => {
    // refresh the page to re-render CardHolder
    window.location.reload();
  }

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="LandingPage">
        <Header pageName = "My Journals"/>
        <div className={classes.my_journals_bg}/>
        <div className={classes.compose}>
          <Button
            className={classes.compose_btn}
            variant="contained"
            color="primary"
            startIcon={<MdAddCircleOutline />}
            onClick={handleCompose}
          >
            Compose
          </Button>
          
        </div>
        {showModal && <JounalModal journal={newJournal} editing={true} handleClose={handleModalClose}
                                   authorMode={true} updateJournal={updateJournal}>
          handleSave={handleSave}</JounalModal>}
        <CardHolder visibility={false} isPublic={false} showCalendar={true}/>
      </div>
    </ThemeProvider>
  );
}