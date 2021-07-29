import customizedTheme from '../customizedTheme.js';
import CardHolder from '../components/CardHolder';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { MdAddCircleOutline } from 'react-icons/md';
import journalImg from '../assets/myjournals_bg.svg';
import { useState, useEffect, useContext } from 'react';
import JounalModal from '../components/JournalModal';
import AuthContext from '../authAPI/auth-context';
import SearchTag from '../components/SearchTag';
import {
    getUserJournals,
    searchUserJournals,
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
    location:null,
    privacy_setting: 'PRIVATE',
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
        searchUserJournals(auth.token, searchContent).then((res) => {
            setJournals(res);
        });
        setShowSearchTag(true);
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
    const fetchJournals = () => {
        getUserJournals(auth.token)
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

    const updateJournals = () => {
        // refresh the page to re-render CardHolder
        // window.location.reload();
        getUserJournals(auth.token)
            .then((res) => {
                setJournals(res);
            })
            .catch((err) => {
                setJournals([]);
                console.error(err);
            });
    };

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
                        updateJournals={updateJournals}
                    >
                        {' '}
                        handleSave={handleSave}{' '}
                    </JounalModal>
                )}
                {showSearchTag && (
                    <SearchTag
                        content={searchContent}
                        count={2}
                        clearSearch={handleClearSearch}
                    />
                )}
                <CardHolder
                    journals={journals}
                    showCalendar={true}
                    updateJournals={updateJournals}
                />
            </div>
        </ThemeProvider>
    );
}
