import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { HiOutlineLocationMarker, HiFire } from 'react-icons/hi';
import { RiTimeLine } from 'react-icons/ri';
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function ExploreTabs({handleTab}) {
    const classes = useStyles();
  const [value,setValue] = useState("Newest")
    const handleChange = (event, newValue) => {
      setValue(newValue)
        handleTab(newValue);
    };

    return (
        <Box my={2}>
            <Paper elevation={0} className={classes.root}>
                <Tabs
                  value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                >
                    <Tab value="Newest" icon={<RiTimeLine />} label='Newest' />
                    <Tab value="Hottest" icon={<HiFire />} label='Hottest' />
                    <Tab value="Nearby" icon={<HiOutlineLocationMarker />} label='Nearby' />
                </Tabs>
            </Paper>
        </Box>
    );
}
export default ExploreTabs;
