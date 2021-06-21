import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FiEdit} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import styled from "styled-components";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Translate } from '@material-ui/icons';
const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        marginTop:'0'
      },
    },
  }))(InputBase);
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
  const { children, classes, onClose,  ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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



export default function CustomizedDialogs({journal}) {

    const Image = styled.img`
    width: 100%;
    border-radius: 10px;
  `;
  const Date = styled.span`
  margin-right: 40%;
  color:grey;
`;
  
  const [open, setOpen] = React.useState(false);
  const [visibility, setVisibility] = React.useState('private');
  const handleChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='sm'>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {journal.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
              <Image src={journal.coverImage} alt=''/>
            {journal.content}
          </Typography>

        </DialogContent>
        <DialogActions>
     
        <Date>{journal.date}</Date>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={visibility}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value='private'>private</MenuItem>
          <MenuItem value='public'>public</MenuItem>
        </Select>
   
          <Button autoFocus color="primary" startIcon={<FiEdit/>}>
          </Button>
          <Button autoFocus  color="primary" startIcon={<FaRegTrashAlt/>}>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
