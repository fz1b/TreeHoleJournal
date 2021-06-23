import customizedTheme from '../customizedTheme.js'
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { MdAddCircleOutline} from "react-icons/md";
import {HiOutlineRefresh} from "react-icons/all";
import DatePicker from "../components/DatePicker";
import journalImg from "../assets/myjournals_bg.svg"


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
  },
  compose_btn: {
    margin: '30px',
  },
  refresh_btn: {
    margin: '30px',
  }
}));

export default function Saloon() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="Saloon">
        <Header />
        <div className={classes.my_journals_bg}/>
        <div className={classes.compose}>
          <Button
            className={classes.compose_btn}
            variant="contained"
            color="primary"
            startIcon={<MdAddCircleOutline />}
          >
            Compose
          </Button>

          <Button
              className={classes.refresh_btn}
              variant="contained"
              color="primary"
              startIcon={<HiOutlineRefresh />}
          >
            Refresh
          </Button>

          <DatePicker />
        </div>
        <CardHolder databaseFlag="" />
      </div>
    </ThemeProvider>
  );
}