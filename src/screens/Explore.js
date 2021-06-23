import customizedTheme from '../customizedTheme.js'
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import journalImg from "../assets/myjournals_bg.svg"


const useStyles = makeStyles((theme) => ({
  explore_bg: {
    backgroundImage: `url(${journalImg})`,
    backgroundColor: 'aliceblue',
    backgroundSize: '600px',
    backgroundRepeat: 'no-repeat',
    height: '30vh',
    backgroundPosition: '40% 0%',
    marginBottom: '5vh',
  },
}));

export default function Explore() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="explore">
        <Header />
        <div className={classes.explore_bg}/>
        <CardHolder databaseFlag="" />
      </div>
    </ThemeProvider>
  );
}