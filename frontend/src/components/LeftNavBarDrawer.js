import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function LeftNavBarDrawer(props) {
    const drawerWidth = props.dWidth;
    const history = props.histories;

    const useStyles = makeStyles((theme) => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: theme.palette.primary.main,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        contrastColor: {
            color: theme.palette.primary.contrastText,
        },
        title: {
            paddingRight: '7rem',
            color: theme.palette.primary.contrastText,
        },
    }));

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        props.onClose();
    };

    const handleRedirect = (path) => {
        history.push(path);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography variant='h6' noWrap className={classes.title}>
                    Menu
                </Typography>
                <IconButton
                    onClick={handleDrawerClose}
                    className={classes.contrastColor}
                >
                    {theme.direction === 'ltr' ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            <List className={classes.contrastColor}>
                <ListItem
                    button
                    onClick={() => handleRedirect('/')}
                    key='Explore'
                >
                    <ListItemIcon className={classes.contrastColor}>
                        <ExploreIcon />
                    </ListItemIcon>
                    <ListItemText primary='Explore' />
                </ListItem>
                <ListItem button onClick={() => handleRedirect('/me')} key='Me'>
                    <ListItemIcon className={classes.contrastColor}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Me' />
                </ListItem>
            </List>
            <Divider />
            <List className={classes.contrastColor}>
                <ListItem button onClick={() => handleRedirect('/liked')}key='Liked'>
                    <ListItemIcon className={classes.contrastColor}>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Liked'/>
                </ListItem>
            </List>
        </Drawer>
    );
}
