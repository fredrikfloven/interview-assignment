import React, {useState} from 'react';
import Logo from './logo.svg'

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import './App.css';

function Content(props) {
    //Use React Hooks useState to initialize local state
    //const [data, setData] = useState([]);
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }));

    const classes = useStyles();

    // Retrieving 900+ images takes way too much memory
    return (
        <List className={classes.root}>
            {props.content.map((post, index) => (
                <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        <Avatar alt={post.data.media[0].description} src={Logo}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={post.description}
                        secondary={<span>by: {post.data.media[0].description}</span>}
                    />
                </ListItem>
            ))}
        </List>
    );

}

export default Content;
