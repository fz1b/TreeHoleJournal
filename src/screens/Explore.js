import customizedTheme from '../customizedTheme.js'
import CardHolder from "../components/CardHolder";
import Header from "../components/Header";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import bgImg from "../assets/explore_bg.svg";
import {useState, useEffect} from 'react';

import getExploreJournals from "../services/JournalServices";

const useStyles = makeStyles((theme) => ({
  explore_bg: {
    backgroundImage: `url(${bgImg})`,
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
  const [journals, setJournals] = useState([]);

  useEffect( ()=> {
    getExploreJournals('wHoVreiPACc0BjVYyHPEBooQejD3').then( res =>{
            setJournals(res);
        }).catch( err => {
            setJournals([]);
            console.error(err);
        })
  },[]);

  return (
    <ThemeProvider theme={customizedTheme}>
      <div className="explore">
        <Header pageName=""/>
        <div className={classes.explore_bg}/>
        <CardHolder isPublic={true} content={journals}/>
      </div>
    </ThemeProvider>
  );
}