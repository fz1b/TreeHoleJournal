import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import {makeStyles, ThemeProvider} from '@material-ui/core';
import bgImg from '../assets/saved_page_bg.svg';
import {useState, useEffect, useContext, useCallback} from 'react';
import {searchExploreJournals, getLikedJournalsByUserToken} from '../services/JournalServices';
import AuthContext from '../authAPI/auth-context';
import SearchTag from '../components/SearchTag';
import useMountedState from '../customHooks/useMountedState';
import LoadingSpinner from '../components/LoadingSpinner';

const useStyles = makeStyles(() => ({
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

export default function Liked() {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const isMounted = useMountedState();
    const [loading, setLoading] = useState(true);

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
    const fetchJournals = useCallback(() => {
        if (isMounted()) {
            setLoading(true);
            getLikedJournalsByUserToken(auth.token)
                .then((res) => {
                    // console.log(res[0]);
                    if (isMounted()) setJournals(res);
                    if (isMounted()) setLoading(false);
                })
                .catch((err) => {
                    if (isMounted()) setJournals([]);
                    if (isMounted()) setLoading(false);
                    console.error(err);
                });
        }
    }, [isMounted, auth.token]);

    useEffect(() => {
        fetchJournals();
    }, [fetchJournals]);

    return (
        <ThemeProvider theme={customizedTheme}>
            <div className='explore'>
                <Header pageName='' searchContent={searchContent} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
                <div className={classes.explore_bg} />
                {showSearchTag && searchContent && <SearchTag content={searchContent} count={journals.length} clearSearch={handleClearSearch} />}
                <CardHolder journals={journals} showCalendar={false} updateJournals={fetchJournals} />
            </div>
            {loading && <LoadingSpinner />}
        </ThemeProvider>
    );
}