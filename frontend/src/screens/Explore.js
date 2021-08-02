import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import bgImg from '../assets/explore_bg.svg';
import { useState, useEffect, useContext } from 'react';
import {
    getExploreJournals,
    searchExploreJournals,
    getNearbyJournals,
} from '../services/JournalServices';
import ExploreTabs from '../components/ExploreTabs';
import AuthContext from '../authAPI/auth-context';
import SearchTag from '../components/SearchTag';

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
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [journals, setJournals] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [showSearchTag, setShowSearchTag] = useState(false);
    const [tab,setTab] = useState("");
    const handleTab = (value)=>{
      setTab(value);
    }
    const handleClearSearch = () => {
        fetchJournals();
        setSearchContent('');
        setShowSearchTag(false);
    };
    const handleSearchChange = (content) => {
        setSearchContent(content);
    };
    const handleSearch = () => {
        if(searchContent){
            searchExploreJournals(searchContent).then((res) => {
                setJournals(res);
            });
            setShowSearchTag(true);
        }
    };
    const fetchJournals = () => {
        getExploreJournals()
            .then((res) => {
                setJournals(res);
            })
            .catch((err) => {
                setJournals([]);
                console.error(err);
            });
    };

    useEffect(() => {
        fetchJournals();
    }, [auth.token]);
    useEffect(() => {
      if(tab==="Newest"){
          fetchJournals();
      }
      if(tab==="Nearby"){
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude
          getNearbyJournals(lat,lng).then(res=>{
            setJournals(res);
          })
      });
      }
  }, [tab]);
    return (
        <ThemeProvider theme={customizedTheme}>
            <div className='explore'>
                <Header
                    pageName=''
                    searchContent={searchContent}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                />
                <div className={classes.explore_bg} />
                <ExploreTabs handleTab={handleTab}/>
                {showSearchTag && searchContent&&(
                    <SearchTag
                        content={searchContent}
                        count={journals.length}
                        clearSearch={handleClearSearch}
                    />
                )}
                <CardHolder journals={journals} showCalendar={false} refreshJournals={fetchJournals}/>
            </div>
        </ThemeProvider>
    );
}
