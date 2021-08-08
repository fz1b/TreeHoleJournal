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
import LocationError from '../components/LocationError.js';
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
    HOTTEST: 'hottest',
    NEARBY: 'nearby',
};

export default function Explore() {
    const classes = useStyles();
    const isMounted = useMountedState();
    const [journals, setJournals] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [showSearchTag, setShowSearchTag] = useState(false);
    const [location, setLocation] = useState({lat: 0, lng: 0})

    // infinite scrolling
    const [mode, setMode] = useState(fetchMode.GENERAL);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [locationAcess,setLocationAccess] = useState(true);

    const handleTab = (value) => {
        setLoading(true);
        setShowSearchTag(false);
        setJournals([]);
        switch (value) {
            case 'Hottest':
                setMode(fetchMode.HOTTEST);
                break;
            case 'Nearby':
                setMode(fetchMode.NEARBY);
                navigator.geolocation.getCurrentPosition(function (position) {
                    if (isMounted()){
                        setLocationAccess(true);
                        setLocation({lat: position.coords.latitude, lng: position.coords.longitude});
                        getNearbyJournals(position.coords.latitude, position.coords.longitude, null, null)
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
                    }
                },function(err){
                    if(err.PERMISSION_DENIED){
                        setLocationAccess(false)
                        console.log("permisson denied");
                    }
                })
                break;
            default:
                setMode(fetchMode.GENERAL)
                fetchJournals(null, null);
                break;
        }
        setHasMore(true);
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
            let last_id, last_date, last_dist = null;
            if (journals.length > 0) {
                last_id = journals[journals.length - 1]._id;
                last_date = journals[journals.length - 1].date;
                last_dist = journals[journals.length - 1].distance;
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
                        return getNearbyJournals(location.lat, location.lng, last_id, last_dist);
                    }
                    break;
                case fetchMode.HOTTEST:
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
                    isSearchEnabled={true}
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
            {!locationAcess && mode===fetchMode.NEARBY&&<LocationError/>}
            {!hasMore && <Coda />}
        </ThemeProvider>
    );
}
