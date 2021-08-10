import React from 'react';
import {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import {FiEdit} from 'react-icons/fi';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {BsFillChatSquareDotsFill} from 'react-icons/bs';
import {IconContext} from 'react-icons';
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
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
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
    color: grey;
    font-size: 17px;
`;

export default function CustomizedDialogs({journal, handleEdit, handleClose, authorMode, refreshJournals, like, onLike, onRefreshOneJournal}) {
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
    }, [like]);

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={true} maxWidth='sm' fullWidth>
                <DialogTitle id='customized-dialog-title' style={{height: '32px'}} onClose={handleClose}>
                    {journal.title}
                    <Date>{" on " + journal.date.toDateString()}</Date>
                </DialogTitle>
                <DialogContent dividers>
                        {journal.image && <Image src={journal.image} alt='' />}
                    <Box m={1} mt={2}>
                    <Typography component={'span'} gutterBottom>
                        {journal.content}
                        </Typography>
                    </Box>
                </DialogContent>
                {journal.location && <JournalLocation address={journal.location.address} />}
                <DialogActions>
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
                                <IconContext.Provider value={{color: '#b95050'}}>
                                    <IconButton>
                                        <FaHeart />
                                    </IconButton>
                                </IconContext.Provider>
                            )}
                        </span>

                        <span onClick={handleShowComments}>
                            <IconButton>
                                <Badge badgeContent={journal.comments.length} color='secondary'>
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
