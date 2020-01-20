import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ModalListItem from "./ModalListItem";
import '../App.css';

function ContentList({content}) {
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
            {content !== null ? (
                <List component="nav" className={classes.root} aria-label="contacts">
                    {content.map((post) => (
                        <ModalListItem post={post} key={post.id}/>
                    ))}
                </List>) : ("No content found")}
        </div>

    );

}

export default ContentList;
