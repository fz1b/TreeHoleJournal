import customizedTheme from "../customizedTheme.js";
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import bgImg from "../assets/explore_bg.svg";
import { useState, useEffect, useContext } from "react";
import {getExploreJournals} from "../services/JournalServices";
import ExploreTabs from "../components/ExploreTabs";
import AuthContext from "../authAPI/auth-context";

const useStyles = makeStyles((theme) => ({
  explore_bg: {
    backgroundImage: `url(${bgImg})`,
    backgroundColor: "aliceblue",
    backgroundSize: "600px",
    backgroundRepeat: "no-repeat",
    height: "30vh",
    backgroundPosition: "40% 0%",
    marginBottom: "5vh",
  },
}));

export default function Explore() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = () => {
      getExploreJournals(auth.token)
        .then((res) => {
          setJournals(res);
        })
        .catch((err) => {
          setJournals([]);
          console.error(err);
        });
    };
    fetchJournals();
  }, [auth.token]);

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="explore">
        <Header pageName="" />
        <div className={classes.explore_bg} />
        <ExploreTabs/>
        <CardHolder content={journals} showCalender={false} />
      </div>
    </ThemeProvider>
  );
}