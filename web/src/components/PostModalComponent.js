import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';
import ModalContent from './ModalContent'

function PostModalComponent(props) {

    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(props);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem button onClick={handleOpen}>
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
                <ModalContent post={state.post}/>
            </Modal>
        </div>
    );
}

export default PostModalComponent;