import React from 'react';
import Modal from '@material-ui/core/Modal';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ModalContent from './ModalContent'

function ModalListItem({post}) {
    const [open, setOpen] = React.useState(false);
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
                    primary={post.description}
                    secondary={<span>by: {post.data.media[0].description}</span>}
                />
            </ListItem>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <ModalContent postContent={post} handleClose={handleClose}/>
            </Modal>
        </div>
    );
}

export default ModalListItem;