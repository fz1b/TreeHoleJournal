import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JournalModal from './JournalModal';
import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
    Avatar,
    IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import { grey } from '@material-ui/core/colors';
import { getJournalAuthor, getJournalLikeStatus, verifyEditingAccess } from '../services/JournalServices';
import { likeJournal, unlikeJournal } from '../services/UserServices';
import AuthContext from '../authAPI/auth-context';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: '#50A9C1',
    },
    anonymous_avatar: {
        backgroundColor: grey[500],
    },
    heart_red: {
        color: '#b95050'
    },
})

export default function EntryCards(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [showModal, setshowModal] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [isEditable, setEditable] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [editing, setEditing] = useState(false);
    const isAnonymous = props.content.privacy === 'ANONYMOUS';
    const isPrivate = props.content.privacy === 'PRIVATE';

    const toggleModal = () => {
        setshowModal(prev => {
            if (prev) {
                editHandler(false);
            }
            return !prev;
        });
    };

    const editHandler = (inEditMode) => {
        setEditing(inEditMode);
    }

    const likeHandler = async () => {
        if (auth.isLoggedIn){
            let likePrev;
            setIsLiked((prev) => {
                likePrev = prev;
                return !prev;
            });
            const req = {
                journalId: props.content._id,
                idToken: auth.token
            }
            if (likePrev) {await unlikeJournal(req);}
            else {await likeJournal(req);}
        } else {
            history.push('/login');
        }
    }

    // loads up slowly. 
    // If the user goes to login before useEffect finish fetching the data
    // Will run the cleanup function
    useEffect(() => {
        let isMounted = true;
        getJournalAuthor(props.content._id)
            .then((res) => {
                if (isMounted) setAuthorName(res.name);
            })
            .catch((err) => {
                // do nothing and use empty author
            });

        verifyEditingAccess(props.content._id, auth.token).then(res => {
            if (isMounted) setEditable(res);
        }).catch(err => {
            if (isMounted) setEditable(false);
        });
        getJournalLikeStatus(auth.token, props.content._id)
            .then((res) => {
                if (isMounted) setIsLiked(res);
            }).catch((err) => {
                if (isMounted) setIsLiked(false);
            });
        return () => { isMounted = false };
    }, [auth.token, props.content._id]);

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            className={
                                isAnonymous
                                    ? classes.anonymous_avatar
                                    : classes.avatar
                            }
                        >
                            {props.content.avatar}
                        </Avatar>
                    }
                    title={
                        isAnonymous
                            ? isEditable
                                ? authorName + ' (Anonymous)'
                                : 'Anonymous'
                            : (isPrivate
                                ? authorName+' (private)'
                                : authorName)
                    }
                    subheader={props.content.date.toDateString()}
                />
                <CardActionArea style={{ display: 'block' }}>
                    <CardMedia
                        component='img'
                        alt='props.content.title'
                        height='200'
                        image={props.content.image}
                        className={classes.coverImage}
                        onClick={toggleModal}
                    />
                    <CardContent onClick={toggleModal}>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.content.title}
                        </Typography>
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '18rem',
                            }}
                        >
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                                noWrap
                            >
                                {props.content.content}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton aria-label='add to favorites' onClick={likeHandler}>
                        {isLiked && <FavoriteIcon className={classes.heart_red} />}
                        {!isLiked && <FavoriteIcon />}
                    </IconButton>
                    {isEditable &&
                        <IconButton aria-label='edit' onClick={()=>{toggleModal();editHandler(true);}}>
                            <EditIcon />
                        </IconButton>
                    }
                    {/* <IconButton aria-label='share'>
                        <ShareIcon />
                    </IconButton> */}
                </CardActions>
            </Card>

            {showModal && (
                <JournalModal
                    journal={props.content}
                    editing={editing}
                    onEdit={editHandler}
                    handleClose={toggleModal}
                    authorMode={isEditable}
                    refreshJournals={props.refreshJournals}
                    like = {isLiked}
                    onLike = {likeHandler}
                />
            )}
        </>
    );
}
