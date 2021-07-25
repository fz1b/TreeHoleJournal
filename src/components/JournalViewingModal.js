import React from "react";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { FiEdit } from "react-icons/fi";
import Badge from '@material-ui/core/Badge';
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { BootstrapInput } from "./CustomizedComponents";
import imgPlaceholder from "../assets/photo_placeholder.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CommentArea from "./CommentArea";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;
const Date = styled.span`
  position: absolute;
  right: 80%;
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
  updateJournal,
}) {
  const [visibility, setVisibility] = useState(journal.privacy);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };
  const handleLike = () => {
    setLiked((state) => !state);
  };
  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {journal.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography component={"span"} gutterBottom>
            {!journal.image && (
              <>
                <ImgPlaceholder />{" "}
              </>
            )}

            <Image src={journal.image} alt="" />
            {journal.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Date>{journal.date}</Date>
          {authorMode && (
            <>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={visibility}
                onChange={handleVisibilityChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="PUBLIC">public</MenuItem>
                <MenuItem value="ANONYMOUS">anonymous</MenuItem>
                <MenuItem value="PRIVATE">private</MenuItem>
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
                <IconContext.Provider value={{ color: "#b95050" }}>
                  <IconButton>
                    <FaHeart />
                  </IconButton>
                </IconContext.Provider>
              )}
            </span>
            <span onClick={handleShowComments}>
            
              <IconButton>
              <Badge badgeContent={journal.comments.length} color="secondary">
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
        <Collapse in={showComments} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentArea
              journalID={journal._id}
              comments={journal.comments}
              updateJournal={updateJournal}
            />
          </CardContent>
        </Collapse>
      </Dialog>
    </div>
  );
}
