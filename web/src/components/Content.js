import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import SimpleModal from "./SimpleModal";
import '../App.css';

function Content(props) {
    //Use React Hooks useState to initialize local state
    //const [data, setData] = useState([]);
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();

    console.log({props});

    return (
        <div>
            {props.content !== null ? (
                <List component="nav" className={classes.root} aria-label="contacts">
                    {props.content.slice(0, 20).map((post) => (
                        <SimpleModal post={post} key={post.id}/>
                    ))}
                </List>) : ("No content found")}
        </div>

    );

}

export default Content;
