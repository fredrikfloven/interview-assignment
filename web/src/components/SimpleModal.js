import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Logo from "../logo.svg";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(props);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickNext = () => {
        alert("Next clicked");
    };

    const handleClickPrevious = () => {
        alert("Previous clicked");
    };

    return (
        <div>
            <ListItem button onClick={handleOpen}>
                <ListItemAvatar>
                    <Avatar alt={state.post.data.media[0].description} src={Logo}/>
                </ListItemAvatar>
                <ListItemText
                    primary={state.post.description}
                    secondary={<span>by: {state.post.data.media[0].description}</span>}
                />
            </ListItem>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <img style={{maxWidth: "100%"}} alt={state.post.data.media[0].description}
                         src={state.post.data.media[0].image}/>
                    <h2 id="simple-modal-title">{state.post.description}</h2>
                    <p id="simple-modal-description">
                        Author: {state.post.data.media[0].description}
                    </p>
                    <div id="modal-navigation-buttons">
                        <Button style={{float: "left"}} variant="contained" color="primary" onClick={handleClickNext}>
                            Previous
                        </Button>
                        <Button style={{float: "right"}} variant="contained" color="primary"
                                onClick={handleClickPrevious}>
                            Next
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
/*
<ListItem button onClick={handleOpen}>
                <ListItemAvatar>
                    <Avatar alt={state.post.data.media[0].description} src={Logo}/>
                </ListItemAvatar>
                <ListItemText
                    primary={state.post.description}
                    secondary={<span>by: {state.post.data.media[0].description}</span>}
                />
            </ListItem>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <img style={{maxWidth: "100%"}} alt={state.post.data.media[0].description}
                         src={state.post.data.media[0].image}/>
                    <h2 id="simple-modal-title">{state.post.description}</h2>
                    <p id="simple-modal-description">
                        Author: {state.post.data.media[0].description}
                    </p>
                    <div id="modal-navigation-buttons">
                        <Button style={{float: "left"}} variant="contained" color="primary" onClick={setState(null)}>
                            Previous
                        </Button>
                        <Button style={{float: "right"}} variant="contained" color="primary" onClick={setState(null)}>
                            Next
                        </Button>
                    </div>
                </div>
            </Modal>

 */