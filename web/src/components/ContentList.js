import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import PostModalComponent from "./PostModalComponent";
import '../App.css';

function ContentList(props) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();

    return (
        <div>
            {props.content !== null ? (
                <List component="nav" className={classes.root} aria-label="contacts">
                    {props.content.map((post) => (
                        <PostModalComponent post={post} key={post.id}/>
                    ))}
                </List>) : ("No content found")}
        </div>

    );

}

export default ContentList;
