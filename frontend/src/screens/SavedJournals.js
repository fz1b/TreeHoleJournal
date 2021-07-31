import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import bgImg from '../assets/saved_page_bg.svg';
import { useState, useEffect, useContext } from 'react';
import {
    getExploreJournals,
    searchExploreJournals,
} from '../services/JournalServices';
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

export default function SavedJournals() {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [journals, setJournals] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [showSearchTag, setShowSearchTag] = useState(false);
    const handleClearSearch = () => {
        fetchJournals();
        setSearchContent('');
        setShowSearchTag(false);
    };
    const handleSearchChange = (content) => {
        setSearchContent(content);
    };
    const handleSearch = () => {
        searchExploreJournals(searchContent).then((res) => {
            setJournals(res);
        });
        setShowSearchTag(true);
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
                {showSearchTag && searchContent&&(
                    <SearchTag
                        content={searchContent}
                        count={journals.length}
                        clearSearch={handleClearSearch}
                    />
                )}
                <CardHolder journals={journals} showCalendar={false} updateJournals={fetchJournals}/>
            </div>
        </ThemeProvider>
    );
}
