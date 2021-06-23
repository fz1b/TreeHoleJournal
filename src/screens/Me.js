import customizedTheme from '../customizedTheme.js'
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { MdAddCircleOutline } from "react-icons/md";
import DatePicker from "../components/DatePicker";
import journalImg from "../assets/myjournals_bg.svg"

const useStyles = makeStyles((theme) => ({
  my_journals_bg: {
    backgroundImage: `url(${journalImg})`,
    backgroundColor: 'aliceblue',
    backgroundSize: '600px',
    backgroundRepeat: 'no-repeat',
    height: '30vh',
    backgroundPosition: '40% 0%',
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

export default function Me() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="LandingPage">
        <Header pageName = "My Journals"/>
        <div className={classes.my_journals_bg}></div>
        <div className={classes.compose}>
          <Button
            className={classes.compose_btn}
            variant="contained"
            color="primary"
            startIcon={<MdAddCircleOutline />}
          >
            Compose
          </Button>
          <DatePicker />
        </div>
        <CardHolder databaseFlag="" />
      </div>
    </ThemeProvider>
  );
}