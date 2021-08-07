import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import bgImg from '../assets/explore_bg.svg';
import { useState, useEffect, useCallback } from 'react';
import Coda from '../components/Coda'
import {
    getExploreJournals,
    searchExploreJournals,
    getNearbyJournals,
    getUserJournals,
    searchUserJournals,
    getUserJournalsByDate,
} from '../services/JournalServices';
import ExploreTabs from '../components/ExploreTabs';
import SearchTag from '../components/SearchTag';
import LoadingSpinner from '../components/LoadingSpinner';
import useMountedState from '../customHooks/useMountedState';

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

const fetchMode = {
    GENERAL: 'general',
    SEARCH: 'search',
    NEARBY: 'nearby',
};

export default function Explore() {
    const classes = useStyles();
    const [journals, setJournals] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [showSearchTag, setShowSearchTag] = useState(false);
    const [tab, setTab] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [mode, setMode] = useState(fetchMode.GENERAL);
    const isMounted = useMountedState();

    const handleTab = (value) => {
        setTab(value);
    };
    const handleClearSearch = () => {
        setMode(fetchMode.GENERAL);
        setJournals([]);
        setHasMore(true);
        fetchJournals(null, null);
        setSearchContent('');
        setShowSearchTag(false);
    };
    const handleSearchChange = (content) => {
        setSearchContent(content);
    };
    const handleSearch = () => {
        setLoading(true);
        if (searchContent) {
            setMode(fetchMode.SEARCH);
            setHasMore(true);
            searchExploreJournals(searchContent)
                .then((res) => {
                    setJournals(res);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
            setShowSearchTag(true);
        }
    };
    const fetchJournals = useCallback(
        (last_id, last_date) => {
            if (isMounted())
                setLoading(true);
            getExploreJournals(last_id, last_date)
                .then((res) => {
                    if (isMounted())
                        setJournals(res);
                    if (isMounted())
                        setLoading(false);
                })
                .catch((err) => {
                    if (isMounted())
                        setJournals([]);
                    if (isMounted())
                        setLoading(false);
                    console.error(err);
                });
        }, 
        [isMounted]
    );

    useEffect(() => {
        fetchJournals(null, null);
    }, [fetchJournals]);

    // load more journals when scrolled to the bottom
    window.onscroll = function () {
        let d = document.documentElement;
        let offset = d.scrollTop + window.innerHeight;
        let height = d.offsetHeight;

        if (offset >= height - 5 && !loading && hasMore) {
            if (isMounted()) setLoading(true);
            let last_id, last_date = null;
            if (journals.length > 0) {
                last_id = journals[journals.length - 1]._id;
                last_date = journals[journals.length - 1].date;
            }

            let fetchFunction;
            switch (mode) {
                case fetchMode.SEARCH:
                    fetchFunction = () => {
                        return searchExploreJournals(
                            searchContent,
                            last_id,
                            last_date
                        );
                    };
                    break;
                case fetchMode.NEARBY:
                    fetchFunction = () => {
                        return navigator.geolocation.getCurrentPosition(function (position) {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;
                            getNearbyJournals(lat, lng).then(res => {
                                if (isMounted()) setJournals(res);
                            });
                        });
                    }
                    break;
                default:
                    fetchFunction = () => {
                        return getExploreJournals(last_id, last_date);
                    };
                    break;
            }

            fetchFunction()
                .then(res => {
                    if (res.length > 0) {
                        if (isMounted()) {
                            setJournals(prev => {
                                return [...prev, ...res];
                            });
                        }
                        if (isMounted()) setHasMore(true);
                    } else {
                        if (isMounted()) setHasMore(false);
                    }
                    if (isMounted()) setLoading(false);
                })
                .catch((err) => {
                    // setJournals([]);
                    console.error(err);
                    if (isMounted()) setLoading(false);
                });
        }
    };

    const deleteJournalHandler = (deletedJournalId) => {
        const newData = journals.filter((journal) => {
            return journal._id !== deletedJournalId;
        });
        setJournals(newData);
    };

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
                <ExploreTabs handleTab={handleTab} />
                {showSearchTag && searchContent && (
                    <SearchTag
                        content={searchContent}
                        count={journals.length}
                        clearSearch={handleClearSearch}
                    />
                )}
                <CardHolder
                    journals={journals}
                    showCalendar={false}
                    refreshJournals={fetchJournals}
                    onDelete={deleteJournalHandler}
                />
            </div>
            {loading && <LoadingSpinner />}
            {!hasMore && <Coda />}
        </ThemeProvider>
    );
}
