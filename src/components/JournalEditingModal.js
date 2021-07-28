import React, { useContext } from 'react';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FaRegTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { BootstrapInput } from './CustomizedComponents';
import imgPlaceholder from '../assets/photo_placeholder.svg';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import {createJournal, deleteJournal, editJournal} from '../services/JournalServices';
import { useDropzone } from 'react-dropzone';
import AuthContext from '../authAPI/auth-context';

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
const DeleteImage = withStyles((theme) => ({
    root: {
        transform: 'translate(0, -8vh)',
        background: 'white',
    },
}))(IconButton);
const TitleInput = withStyles((theme) => ({
    root: {
        width: '90%',
    },
}))(TextField);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const Date = styled.span`
    position: absolute;
    right: 78%;
`;

const Dropzone = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
`;

export default function CustomizedDialogs({
    journal,
    handleClose,
    authorMode,
    updateJournals,
    handleEdit,
}) {
    const [privacy, setPrivacy] = useState(journal.privacy);
    const [content, setContent] = useState(journal.content);
    const [title, setTitle] = useState(journal.title);
    const [coverImg, setCoverImg] = useState(journal.image);
    const [liked, setLiked] = useState(false);
    const auth = useContext(AuthContext);
    const [files, setFiles] = useState([]);

    const handlePrivacyChange = (event) => {
        setPrivacy(event.target.value);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleDelete = () => {
        handleClose();
        deleteJournal(auth.token, journal._id).then(
            updateJournals()
        ).catch(err => {
            console.log(err);
        });
    }
    const handleLike = () => {
        setLiked((state) => !state);
    };
    const handleSave = (title, date, image, weather, content, privacy) => {
        if (!journal._id) {
            // create a new journal
            createJournal(
                auth.token,
                title,
                date,
                image,
                weather,
                content,
                privacy
            )
                .then((res) => {
                    updateJournals();
                })
                .catch((err) => {
                    console.log(err);
                });
            handleClose();
        } else {
            // edit an existing journal
            editJournal(
                journal.author_id,
                journal._id,
                title,
                date,
                image,
                weather,
                content,
                privacy
            )
                .then((res) => {
                    updateJournals();
                })
                .catch((err) => {
                    console.log(err);
                });
            handleEdit(false);
        }
    };

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        marginBottom: 20,
        justifyContent: 'center',
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        maxHeight: 500,
        padding: 0,
        marginBottom: 20,
        boxSizing: 'border-box',
    };

    const thumbInner = {

        minWidth: 0,
    };

    const img = {
        maxWidth: '100%',
        maxHeight: 500,
        borderRadius: 5,
        border: '5px solid #eaeaea',
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    function changeBackground(e) {
        e.target.style.opacity = '0.3';
      }

    const thumbs = files.map((file) => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img onMouseOver={changeBackground} src={file.preview} style={img} alt={file.size} />
                </div>

            </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Latitude is :', position.coords.latitude);
            console.log('Longitude is :', position.coords.longitude);
        });
    }, []);

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={true}
                fullWidth={true}
                maxWidth='sm'
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    <TitleInput
                        id='outlined-basic'
                        label='Title'
                        variant='outlined'
                        size='small'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </DialogTitle>
                <DialogContent dividers>
                    <section className='container'>
                        {files.length === 0 && (
                            <Dropzone
                                {...getRootProps({ className: 'dropzone' })}
                            >
                                <input {...getInputProps()} />
                                <p>Drag the cover image, or click to upload</p>
                            </Dropzone>
                        )}
                        <aside style={thumbsContainer}>{thumbs}</aside>
                    </section>

                    <Typography component={'span'} gutterBottom>
                        <TextField
                            fullWidth
                            label='Content'
                            id='outlined-basic'
                            variant='outlined'
                            multiline
                            rows='10'
                            value={content}
                            onChange={handleContentChange}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Date>{journal.date}</Date>
                    {authorMode && (
                        <>
                            <Select
                                labelId='demo-customized-select-label'
                                id='demo-customized-select'
                                value={privacy}
                                onChange={handlePrivacyChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value='PUBLIC'>PUBLIC</MenuItem>
                                <MenuItem value='ANONYMOUS'>ANONYMOUS</MenuItem>
                                <MenuItem value='PRIVATE'>PRIVATE</MenuItem>
                            </Select>
                        </>
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
                        <IconButton>
                            <BsFillChatSquareDotsFill />
                        </IconButton>
                        {authorMode && (
                            <>
                                <span onClick={handleDelete}>
                                    <IconButton>
                                        <FaRegTrashAlt />
                                    </IconButton>
                                </span>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() =>
                                        handleSave(
                                            title,
                                            journal.date,
                                            coverImg,
                                            journal.weather,
                                            content,
                                            privacy
                                        )
                                    }
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </>
                </DialogActions>
            </Dialog>
        </div>
    );
}
