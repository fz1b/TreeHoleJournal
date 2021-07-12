import React, { useState } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: red[500],
  },
});

export default function Feelings(props) {
  const classes = useStyles();

  const [showModal, setshowModal] = useState(false);
  const [isPublic, setVisibility] = useState(props.isPublic);

  const toggleModal = () => {
    setshowModal(!showModal);
  };
  

  return (
    <>
    <Card onClick={toggleModal}>
      {isPublic && <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.content.avatar}
          </Avatar>
        }
        title={props.content.author}
        subheader={props.content.date}
      />}
      <CardActionArea>
        <CardMedia
          component="img"
          alt="props.content.title"
          height="200"
          image={props.content.image}
          className={classes.coverImage}
        />
        <CardContent>
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
        {!isPublic && <EditIcon/>}
      </CardActions>
    </Card>
    {showModal && <JournalModal journal={props.content} editing={false} handleClose={toggleModal}/>}
    </>
  );
}
