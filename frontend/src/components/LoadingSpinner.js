import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function LoadingSpinner() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent='center'>
    <CircularProgress />
    </Box>
  );
}
export default LoadingSpinner