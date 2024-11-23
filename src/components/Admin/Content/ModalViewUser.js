import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { getViewUser } from '../../../services/apiServices';
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData(); // Reset dataUpdate after closing the modal
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            // Update state with data from dataUpdate
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password); // Assuming password is available
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage(dataUpdate.image);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    // Remove unused functions
    // const handleUpLoadImage = (event) => { ... };
    // const validateEmail = (email) => { ... };
    // const handleSubmitCreateUser = async () => { ... };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>View User Details</Modal.Title> {/* Update the title */}
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
                            <input type="text" className="form-control" value={username} disabled />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} disabled> {/* Set value and disable */}
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image</label> {/* Keep the image upload section but disable it */}
                            <input type="file" id='labelUpload' hidden disabled />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* Remove the Save button */}
                    {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewUser;