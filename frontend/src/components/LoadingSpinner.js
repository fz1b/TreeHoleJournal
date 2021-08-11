import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent='center'>
    <CircularProgress />
    </Box>
  );
}
export default LoadingSpinner