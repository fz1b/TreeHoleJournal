import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { MdAddCircleOutline } from 'react-icons/md';
import journalImg from '../assets/myjournals_bg.svg';
import { useState, useEffect, useContext, useCallback } from 'react';
import JounalModal from '../components/JournalModal';
import AuthContext from '../authAPI/auth-context';
import SearchTag from '../components/SearchTag';
import Coda from '../components/Coda';
import {
    getUserJournals,
    searchUserJournals,
    getUserJournalsByDate, getDateOverview
} from "../services/JournalServices";
import LoadingSpinner from '../components/LoadingSpinner';
import useMountedState from '../customHooks/useMountedState';

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
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
        },
    },
    compose_btn: {
        margin: '30px',
        paddingInline: '1rem',
    },
}));

let newJournal = {
    title: '',
    date: new Date(),
    coverImage: '',
    content: '',
    location: null,
    privacy: 'PRIVATE',
};

const fetchMode = {
    GENERAL: 'general',
    SEARCH: 'search',
    DATE: 'date',
};

export default function Me() {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [searchContent, setSearchContent] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [showSearchTag, setShowSearchTag] = useState(false);
    const [mode, setMode] = useState(fetchMode.GENERAL);
    const [validDates, setValidDates] = useState([]);
    const isMounted = useMountedState();

    const handleClearSearch = () => {
        setMode(fetchMode.GENERAL);
        setHasMore(true);
        setJournals([]);
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
            searchUserJournals(auth.token, searchContent)
                .then((res) => {
                    setJournals(res);
                    setLoading(false);
                })
                .catch((err) => {
                    // do nothing
                    setLoading(false);
                });
            setShowSearchTag(true);
        }
    };

    const handleCompose = () => {
        newJournal.date = new Date();
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        setShowModal(false);
    };
    const handleDateSelection = (date) => {
        if (!date) {
            setMode(fetchMode.GENERAL);
            setHasMore(true);
            setJournals([]);
            setDateFilter(null);
            fetchJournals(null, null);
        } else {
            setMode(fetchMode.DATE);
            setHasMore(true);
            setJournals([]);
            setLoading(true);
            setDateFilter(date);
            getUserJournalsByDate(auth.token, date)
                .then((res) => {
                    if (isMounted()){
                        setJournals(res);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    // do nothing
                    if (isMounted()){
                        setLoading(false);
                    }
                });
        }
    };

    const fetchJournals = useCallback(
        (last_id, last_date) => {
            if (isMounted()) setLoading(true);
            getUserJournals(auth.token, last_id, last_date)
                .then((res) => {
                    if (isMounted()) setJournals(res);
                    if (isMounted()) setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    if (isMounted()) setLoading(false);
                });
        },
        [auth.token, isMounted]
    );

    useEffect(() => {
        setJournals([]);
        setHasMore(true);
        fetchJournals(null, null);
        getDateOverview(auth.token)
            .then(dates => {
                if (isMounted()){
                    const dateStrings = dates.map(d=>d.toDateString());
                    setValidDates(dateStrings);
                }
            })
            .catch(err => {
                // do nothing
            });
    }, [auth.token, fetchJournals, isMounted]);
  
    useEffect(()=>{
        getDateOverview(auth.token)
            .then(dates => {
                if (isMounted()){
                    const dateStrings = dates.map(d=>d.toDateString());
                    setValidDates(dateStrings);
                }
            })
            .catch(err => {
                // do nothing
            });
    },[journals, auth.token, isMounted])

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

            let fetchFunction = () => {
                return getUserJournals(auth.token, last_id, last_date);
            };
            switch (mode) {
                case fetchMode.SEARCH:
                    fetchFunction = () => {
                        return searchUserJournals(
                            auth.token,
                            searchContent,
                            last_id,
                            last_date
                        );
                    };
                    break;
                case fetchMode.DATE:
                    fetchFunction = () => {
                        return getUserJournalsByDate(
                            auth.token,
                            dateFilter,
                            last_id,
                            last_date
                        );
                    };
                    break;
                default:
                    fetchFunction = () => {
                        return getUserJournals(auth.token, last_id, last_date);
                    };
                    break;
            }

            fetchFunction()
                .then(res => {
                    if (res.length > 0) {
                        if (isMounted()) {
                            setJournals(prev => {
                                return [...prev, ...res]
                            });
                            setHasMore(true);
                        }
                    } else {
                        if (isMounted()) setHasMore(false);
                    }
                    if (isMounted()) setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    if (isMounted()) setLoading(false);
                });
        }
    };

    const createJournalHandler = (newJournal) => {
        setJournals(prev=>[newJournal,...prev]);
    };
    const deleteJournalHandler = (deletedJournalId) => {
        const newData = journals.filter((journal) => {
            return journal._id !== deletedJournalId;
        });
        setJournals(newData);
    };

    return (
        <ThemeProvider theme={customizedTheme}>
            <div className='LandingPage'>
                <Header
                    pageName='My Journals'
                    searchContent={searchContent}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                    isSearchEnabled={true}
                />

                <div className={classes.my_journals_bg} />
                <div className={classes.compose}>
                    <Button
                        className={classes.compose_btn}
                        variant='contained'
                        color='primary'
                        startIcon={<MdAddCircleOutline />}
                        onClick={handleCompose}
                    >
                        Compose
                    </Button>
                </div>
                {showModal && (
                    <JounalModal
                        journal={newJournal}
                        editing={true}
                        handleClose={handleModalClose}
                        authorMode={true}
                        refreshJournals={fetchJournals}
                        isCompose={true}
                        onCreateJournal={createJournalHandler}
                    >
                        {' '}
                        handleSave={handleSave}{' '}
                    </JounalModal>
                )}
                {showSearchTag && searchContent && (
                    <SearchTag
                        content={searchContent}
                        count={journals.length}
                        clearSearch={handleClearSearch}
                    />
                )}
                <CardHolder
                    handleDateSelection={handleDateSelection}
                    journals={journals}
                    showCalendar={true}
                    validDates={validDates}
                    refreshJournals={fetchJournals}
                    onDelete={deleteJournalHandler}
                />
                {loading && <LoadingSpinner />}
                {!hasMore && <Coda />}
            </div>
        </ThemeProvider>
    );
}
