import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
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
import {
    createJournal,
    deleteJournal,
    editJournal,
} from '../services/JournalServices';
import JournalLocation from './JournalLocation';
import { useDropzone } from 'react-dropzone';
import AuthContext from '../authAPI/auth-context';
import S3 from 'aws-s3';
import sha256 from 'crypto-js/sha256';

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
    right: 75%;
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

const Image = styled.img`
    width: 100%;
    border-radius: 10px;
`;

const config = {
    bucketName: 'treehole',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

export default function CustomizedDialogs({
    journal,
    handleClose,
    authorMode,
    updateJournals,
    handleEdit,
}) {
    const [privacy, setPrivacy] = useState(journal.privacy);
    const [content, setContent] = useState(journal.content);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState(journal.title);
    const [isSaving, setIsSaving] = useState(false);
    const auth = useContext(AuthContext);
    const route = useLocation();

    const handleLocation = (loc) => {
        setLocation(loc);
    };
    const [files, setFiles] = useState([]);
    const [uploaded, setLoaded] = useState(false);
    const S3Client = new S3(config);
    let imageURL = '';

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
        deleteJournal(auth.token, journal._id)
            .then(updateJournals())
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = async (
        title,
        date,
        weather,
        content,
        location,
        privacy
    ) => {
        try {
            setIsSaving(true);
            if (files.length > 0) {
                const data = await S3Client.uploadFile(
                    files[0],
                    sha256(files[0].name)
                );
                setLoaded(true);
                imageURL = data.location;
            }else{
                imageURL = journal.image
            }

            if (!journal._id) {
                await createJournal(
                    auth.token,
                    title,
                    date,
                    imageURL,
                    weather,
                    content,
                    location,
                    privacy
                );
                await updateJournals();
                handleClose();
            } else {
                await editJournal(
                    journal.author_id,
                    journal._id,
                    title,
                    date,
                    imageURL,
                    weather,
                    content,
                    privacy
                );
                await updateJournals();
                setIsSaving(false);
                if (privacy==="PRIVATE" && route.pathname==='/') {
                    handleClose();
                } else {
                    // instead of close the modal, switch to viewing mode
                    handleEdit(false);
                }
            }
        } catch (err) {
            setIsSaving(false);
            console.log(err);
        }
    };

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
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
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        margin: 10,
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

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt={file.size} />
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
                    {files.length === 0 && <Image src={journal.image} alt='' />}
                    <section className='container'>
                        {files.length === 0 && (
                            <Dropzone
                                {...getRootProps({ className: 'dropzone' })}
                            >
                                <input {...getInputProps()} />
                                {!journal.image && (
                                    <p>
                                        Drag the cover image, or click to upload
                                    </p>
                                )}
                                {journal.image && (
                                    <p>
                                        Drag the cover image, or click to
                                        replace current
                                    </p>
                                )}
                            </Dropzone>
                        )}
                        <aside style={thumbsContainer}>{thumbs}</aside>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                            }}
                        >
                            {files.length !== 0 && (
                                <div>
                                    <Button
                                        onClick={() => setFiles([])}
                                        style={buttonStyle}
                                        variant='contained'
                                        color='secondary'
                                        disabled={uploaded}
                                    >
                                        Remove Upload
                                    </Button>
                                </div>
                            )}
                        </div>
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
                <JournalLocation handleLocation={handleLocation} />
                <DialogActions>
                    <Date>{journal.date.toDateString()}</Date>
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
                                    disabled={isSaving}
                                    onClick={() =>
                                        handleSave(
                                            title,
                                            journal.date,
                                            journal.weather,
                                            content,
                                            location,
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
