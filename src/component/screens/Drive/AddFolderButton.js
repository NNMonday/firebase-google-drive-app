import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../../../firebase'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../../context/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFolderButton({ currentFolder }) {
    // console.log(FieldValue);
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => {
        setError("");
        setOpen(false)
    };
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const folderNameRegex = /^([a-zA-Z0-9-_ ]+)$/;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.length === 0) {
            return setError("Folder name cannot be empty");
        } else if (!folderNameRegex.test(name)) {
            return setError("Folder name can only contain alphanumeric characters, dashes, and underscores")
        }

        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER){
            path.push({name: currentFolder.name, id: currentFolder.id})
        }

        try {
            setError("");
            setLoading(true);
            await addDoc(database.folders, {
                name: name,
                parentId: currentFolder.id,
                userId: currentUser.uid,
                path,
                createdAt: serverTimestamp(),
            })

            setName("")
            closeModal();
        } catch (error) {
            setError("Cannot create new folder")
            console.log(error.message);
        }
        setLoading(false);
    }
    return (
        <>
            <Button onClick={openModal} variant='outline-success' size='sm'>
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="folderName">Folder Name: </Form.Label>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form.Control
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal}>
                            Close
                        </Button>
                        <Button disabled={loading} variant='success' type='submit'>Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
