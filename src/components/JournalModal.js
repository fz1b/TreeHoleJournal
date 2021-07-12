import React from "react";
import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import CardMedia from "@material-ui/core/CardMedia";

import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import CommentArea from "./CommentArea.js"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
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

const useStyles = makeStyles((theme) => ({
  cover: {
    width: 151,
  },
}));

export default function CustomizedDialogs({ journal, handleClose }) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    console.log(liked);
    setLiked(!liked);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="sm"
      >
        <CardMedia
          classname={classes.cover}
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={journal.image}
          title="Contemplative Reptile"
        />
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {journal.title}
          <Typography variant='subtitle1' color="primary">{journal.date}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{journal.content}</Typography>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleLike}>
            <FavoriteIcon color={liked ? "primary" : "disabled"} />
          </IconButton>
          <IconButton>
            <CommentIcon onClick={handleExpandClick}color="primary" />
          </IconButton>
        </DialogActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         <CommentArea/>
        </CardContent>
      </Collapse>
      </Dialog>
    </>
  );
}
