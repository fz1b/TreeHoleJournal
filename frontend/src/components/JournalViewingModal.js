import React from 'react';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FiEdit } from 'react-icons/fi';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import imgPlaceholder from '../assets/photo_placeholder.svg';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import CommentArea from './CommentArea';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import JournalLocation from './JournalLocation';
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label='close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const Image = styled.img`
    width: 100%;
    border-radius: 10px;
`;
const Date = styled.span`
    position: absolute;
    right: 75%;
    color: grey;
`;

const ImgPlaceholder = styled.div`
    background-image: url(${imgPlaceholder});
    background-color: aliceblue;
    background-repeat: no-repeat;
    background-size: 60%;
    height: 25vh;
    width: 564px;
    background-position: 60%;
    border-radius: 10px;
    border-style: dashed;
    border-color: lightgrey;
`;

export default function CustomizedDialogs({
    journal,
    handleEdit,
    handleClose,
    authorMode,
    refreshJournals,
    like,
    onLike,
    onRefreshOneJournal
}) {
    const [liked, setLiked] = useState(like);
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setLiked((state) => !state);
        onLike();
    };
    const handleShowComments = () => {
        setShowComments((prev) => !prev);
    };

    useEffect(() => {
        setLiked(like);
    }, [like])

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={true}
                maxWidth='sm'
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {journal.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography component={'span'} gutterBottom>
                        {!journal.image && (
                            <>
                                <ImgPlaceholder />{' '}
                            </>
                        )}

                        <Image src={journal.image} alt='' />
                        {journal.content}
                    </Typography>
                </DialogContent>
                {journal.location && <JournalLocation address={journal.location.address} />}
                <DialogActions>
                    <Date>{journal.date.toDateString()}</Date>
                    {authorMode && (
                        <Typography component={'span'} gutterBottom>
                            {journal.privacy}
                        </Typography>
                    )}
                    <>
                        <span onClick={handleLike}>
                            {!liked && (
                                <IconButton>
                                    <FaRegHeart />
                                </IconButton>
                            )}
                            {liked && (
                                <IconContext.Provider
                                    value={{ color: '#b95050' }}
                                >
                                    <IconButton>
                                        <FaHeart />
                                    </IconButton>
                                </IconContext.Provider>
                            )}
                        </span>

                        <span onClick={handleShowComments}>
                            <IconButton>
                                <Badge
                                    badgeContent={journal.comments.length}
                                    color='secondary'
                                >
                                    <BsFillChatSquareDotsFill />
                                </Badge>
                            </IconButton>
                        </span>
                        {authorMode && (
                            <span onClick={() => handleEdit(true)}>
                                <IconButton>
                                    <FiEdit />
                                </IconButton>
                            </span>
                        )}
                    </>
                </DialogActions>
                <Collapse in={showComments} timeout='auto' unmountOnExit>
                    <CardContent>
                        <CommentArea
                            journalID={journal._id}
                            comments={journal.comments}
                            refreshJournals={refreshJournals}
                            authorMode={authorMode}
                            onRefreshOneJournal={onRefreshOneJournal}
                        />
                    </CardContent>
                </Collapse>
            </Dialog>
        </div>
    );
}
