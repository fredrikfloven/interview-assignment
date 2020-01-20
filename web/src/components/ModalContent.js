import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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

const handleClickNext = () => {
    alert("Next clicked");
};

const handleClickPrevious = () => {
    alert("Previous clicked");
};

const handleClickChange = () => {
    alert("Change clicked");
};

const handleClickDelete = () => {
    alert("Delete clicked");
};

function ModalContent(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [state, setState] = React.useState(props);

    return (
        <div style={modalStyle} className={classes.paper}>
            <img style={{maxWidth: "100%"}} alt={state.post.data.media[0].description}
                 src={state.post.data.media[0].image}/>
            <h2 id="simple-modal-title">{state.post.description}</h2>
            <p id="simple-modal-description">
                Author: {state.post.data.media[0].description}
            </p>
            <div id="update-and-delete-buttons" style={{textAlign: "center"}}>
                <Button variant="contained" color="primary" onClick={handleClickChange}>
                    Change
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClickDelete}>
                    Delete
                </Button>
            </div>
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
    )
}

export default ModalContent;