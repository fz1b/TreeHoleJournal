import React, {useEffect, useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import { red, grey } from "@material-ui/core/colors";
import {getJournalAuthor, verifyAuthor} from "../services/JournalServices";
import AuthContext from "../authAPI/auth-context";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: red[500],
  },
  anonymous_avatar: {
    backgroundColor: grey[500],
  }
});

export default function EntryCards(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [showModal, setshowModal] = useState(false);
  const [isPublic, setVisibility] = useState(props.content.privacy === 'PUBLIC');
  const [authorName, setAuthorName] = useState('');
  const [isEditable, setEditable] = useState(false)

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  const isAnonymous = props.content.privacy === 'ANONYMOUS'
  const isMe = props.context === 'me'

  useEffect(() => {
    getJournalAuthor(props.content._id).then(res => {
      setAuthorName(res.name);
    }).catch(err => {
      // do nothing and use empty author
    })
  }, [props.content._id]);

  // useEffect(() => {
  //   verifyAuthor(props.content._id, auth.token).then(res => {
  //     setEditable(res.isEditable)
  //   }).catch(err => {
  //    setEditable(false)
  //   })
  // }, [auth.token, props.content._id]);

  return (
    <>
    <Card >
       <CardHeader
        avatar={
          <Avatar className={isAnonymous ? classes.anonymous_avatar: classes.avatar }>
            {props.content.avatar}
          </Avatar>
        }
        title={isAnonymous? isMe? authorName + ' (Anonymous)' : 'Anonymous': authorName }
        subheader={props.content.date}
      />
      <CardActionArea style={{display: 'block'}}>
        <CardMedia
          component="img"
          alt="props.content.title"
          height="200"
          image={props.content.image}
          className={classes.coverImage}
        />
        <CardContent onClick={toggleModal}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.content.title}
          </Typography>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "18rem",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              noWrap
            >
              {props.content.content}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="edit">
        {!isPublic && <EditIcon/>}
        </IconButton>
        <IconButton aria-label="share">
          {isPublic && <ShareIcon />}
        </IconButton>
      </CardActions>
    </Card>

    {showModal &&
    <JournalModal journal={props.content} editing={false} handleClose={toggleModal}
                  authorMode={isEditable} updateJournal = {props.updateJournal}/>}
    </>
  );
}
