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
import {
    getUserJournals,
    searchUserJournals,
    getUserJournalsByDate
} from '../services/JournalServices';

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

const newJournal = {
    title: '',
    date: new Date(),
    coverImage: '',
    content: '',
    location: null,
    privacy: 'PRIVATE',
};

export default function Me() {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
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
        if(searchContent){
            searchUserJournals(auth.token, searchContent).then((res) => {
                setJournals(res);
            });
            setShowSearchTag(true);
        }
    };

    const handleCompose = () => {
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        setShowModal(false);
    };
    const handleDateSelection = (date) => {
        console.log(date);
        if (!date) {
            fetchJournals();
        } else {
            getUserJournalsByDate(auth.token, date).then((res) => {
                setJournals(res);
            })
        }
    }
    const fetchJournals = useCallback(() => {
        getUserJournals(auth.token)
            .then((res) => {
                setJournals(res);
            })
            .catch((err) => {
                setJournals([]);
                console.error(err);
            });
    }, [auth.token]);
    useEffect(() => {
        let isMounted = true;
        getUserJournals(auth.token)
            .then((res) => {
                if (isMounted) setJournals(res);
            })
            .catch((err) => {
                if (isMounted) setJournals([]);
                console.error(err);
            });
        return () => { isMounted = false };
    }, [auth.token, fetchJournals]);

    const createJournalHandler = (newJournal) => {
        setJournals((prev)=>{
            let newArr = prev;
            newArr.unshift(newJournal);
            return newArr;
        })
    }
    const deleteJournalHandler = (deletedJournalId) => {
        const newData = journals.filter((journal) => {
            return journal._id !== deletedJournalId;
        });
        setJournals(newData);
    }

    return (
        <ThemeProvider theme={customizedTheme}>
            <div className='LandingPage'>
                <Header
                    pageName='My Journals'
                    searchContent={searchContent}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
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
                        onCreateJournal = {createJournalHandler}
                    >
                        {' '}
                        handleSave={handleSave}{' '}
                    </JounalModal>
                )}
                {showSearchTag && searchContent&&(
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
                    refreshJournals={fetchJournals}
                    onDelete={deleteJournalHandler}
                />
            </div>
        </ThemeProvider>
    );
}
