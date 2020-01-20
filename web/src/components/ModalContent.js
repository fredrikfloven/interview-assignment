import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

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

function ModalContent({postContent, handleClose}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [state, setState] = React.useState(postContent);
    const [prevPostId, nextPostId] = [state.id - 1, state.id + 1];

    const handleClickNext = () => {
        axios(`http://localhost:3001/posts/${nextPostId}`)
            .then(function (response) {
                (response ? setState(response.data) : console.log(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleClickPrevious = () => {
        axios(`http://localhost:3001/posts/${prevPostId}`)
            .then(function (response) {
                (response ? setState(response.data) : console.log(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleClickChange = () => {
        axios({
            method: `put`,
            url: `http://localhost:3001/posts/${state.id}`,
            data: {
                "description": "test"
            },
        })
            .then(function (response) {
                (response ? setState(response.data) : console.log(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleClickDelete = () => {
        axios.delete(`http://localhost:3001/posts/${state.id}`)
            .then(function (response) {
                (response ? handleClose() : console.log(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div style={modalStyle} className={classes.paper}>
            <img id="simple-modal-image" style={{maxWidth: "100%"}} alt={state.data.media[0].description}
                 src={state.data.media[0].image}/>
            <h2 id="simple-modal-title">{state.description}</h2>
            <p id="simple-modal-description">
                Author: {state.data.media[0].description}
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
                <Button style={{float: "left"}} variant="contained" color="primary" onClick={handleClickPrevious}>
                    Previous
                </Button>
                <Button style={{float: "right"}} variant="contained" color="primary"
                        onClick={handleClickNext}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default ModalContent;