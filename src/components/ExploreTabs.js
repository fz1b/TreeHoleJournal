import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useState} from 'react';
import Box from '@material-ui/core/Box';
import {HiOutlineLocationMarker,HiFire} from "react-icons/hi"
import {RiTimeLine} from "react-icons/ri";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});



function ExploreTabs(){
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Box my={2}>
      <Paper elevation={0} className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<RiTimeLine/>} label="Newest" />
          <Tab icon={<HiFire/>} label="Hottest" />
          <Tab icon={<HiOutlineLocationMarker/>} label="Nearby" />
        </Tabs>
      </Paper>
        </Box>
    );
}
export default ExploreTabs