import React, {useEffect, useState, useContext, useCallback} from 'react';
import useMountedState from '../customHooks/useMountedState';
import {makeStyles} from '@material-ui/core/styles';
import JournalModal from './JournalModal';
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Typography, CardHeader, Avatar, IconButton, Box} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import {grey} from '@material-ui/core/colors';
import {getJournalAuthor, getJournalLikeStatus, verifyEditingAccess} from '../services/JournalServices';
import {likeJournal, unlikeJournal} from '../services/UserServices';
import AuthContext from '../authAPI/auth-context';
import {useHistory} from 'react-router';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: '#50A9C1',
    },
    anonymous_avatar: {
        backgroundColor: grey[500],
    },
    heart_red: {
        color: '#b95050',
    },
});

export default function EntryCards(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [showModal, setshowModal] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [isEditable, setEditable] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [editing, setEditing] = useState(false);
    const [journalContent, setJournalContent] = useState(props.content);
    const isMounted = useMountedState();
    const isAnonymous = journalContent.privacy === 'ANONYMOUS';

    const toggleModal = () => {
        setshowModal((prev) => {
            if (prev) {
                editHandler(false);
            }
            return !prev;
        });
    };

    const editHandler = (inEditMode) => {
        setEditing(inEditMode);
    };

    const likeHandler = async () => {
        if (auth.isLoggedIn) {
            let likePrev;
            setIsLiked((prev) => {
                likePrev = prev;
                return !prev;
            });
            const req = {
                journalId: journalContent._id,
                idToken: auth.token,
            };
            if (likePrev) {
                await unlikeJournal(req);
            } else {
                await likeJournal(req);
            }
        } else {
            history.push('/login');
        }
    };

    const refreshOneJournal = (journal) => {
        setJournalContent(journal);
    };

    const initializeEntryCard = useCallback(async () => {
        try {
            if (auth.token === '') {
                if (isMounted()) setEditable(false);
            } else {
                const isEditableResponse = await verifyEditingAccess(journalContent._id, auth.token);
                if (isMounted()) setEditable(isEditableResponse);
            }
        } catch (err) {
            if (isMounted()) setEditable(false);
        }

        try {
            if (auth.token === '') {
                if (isMounted()) setIsLiked(false);
            } else {
                const islikedResponse = await getJournalLikeStatus(auth.token, journalContent._id);
                if (isMounted()) setIsLiked(islikedResponse);
            }
        } catch (err) {
            if (isMounted()) setIsLiked(false);
        }

        try {
            const authorResponse = await getJournalAuthor(journalContent._id);
            if (isMounted()) setAuthorName(authorResponse.name);
        } catch (err) {
            if (isMounted()) setAuthorName('');
        }
    }, [journalContent, auth.token, isMounted]);

    useEffect(() => {
        setJournalContent(props.content);
    }, [props.content]);

    useEffect(() => {
        initializeEntryCard();
    }, [initializeEntryCard]);

    return (
        <>
            <Card style={{height: '100%'}}>
                <Box height='100%' display='flex' justifyContent='space-between' flexDirection='column'>
                    <Box>
                        <CardHeader
                            avatar={<Avatar className={isAnonymous ? classes.anonymous_avatar : classes.avatar} />}
                            title={authorName}
                            subheader={journalContent.date.toDateString()}
                        />
                    </Box>
                    <Box height='100%' display='flex' flexDirection='column'>
                        {!journalContent.image && (
                            <CardActionArea style={{minHeight: '100%'}}>
                                <Box height='100%' display='flex' justifyContent='flex-start'>
                                    <CardContent onClick={toggleModal}>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                            {journalContent.title}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' component='p'>
                                            {journalContent.content.slice(0, 600) + '...'}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        )}
                        {journalContent.image && (
                            <CardActionArea>
                                <Box>
                                    {journalContent.image && (
                                        <CardMedia
                                            component='img'
                                            alt='props.content.image'
                                            height='200'
                                            image={journalContent.image}
                                            className={classes.coverImage}
                                            onClick={toggleModal}
                                        />
                                    )}
                                </Box>
                                <Box>
                                    <CardContent onClick={toggleModal}>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                            {journalContent.title}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' component='p'>
                                            {journalContent.content.slice(0, 150) + '...'}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        )}
                    </Box>
                    <Box>
                        <CardActions>
                            <IconButton aria-label='add to favorites' onClick={likeHandler}>
                                {isLiked && <FavoriteIcon className={classes.heart_red} />}
                                {!isLiked && <FavoriteIcon />}
                            </IconButton>
                            {isEditable && (
                                <IconButton
                                    aria-label='edit'
                                    onClick={() => {
                                        toggleModal();
                                        editHandler(true);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            )}
                        </CardActions>
                    </Box>
                </Box>
            </Card>

            {showModal && (
                <JournalModal
                    journal={journalContent}
                    editing={editing}
                    onEdit={editHandler}
                    handleClose={toggleModal}
                    authorMode={isEditable}
                    refreshJournals={props.refreshJournals}
                    like={isLiked}
                    onLike={likeHandler}
                    onDelete={props.onDelete}
                    isCompose={false}
                    onRefreshOneJournal={refreshOneJournal}
                />
            )}
        </>
    );
}
