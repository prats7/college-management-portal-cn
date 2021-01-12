import React, { Fragment, useState } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    CardBody,
    CardTitle,
    CardSubtitle,
    Form,
    FormGroup,
    Input,
    CardText
} from 'reactstrap';

import axios from 'axios';

import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) /
                        progressEvent.total)))
                    //Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });
            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded')
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input type="file" name="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label forHtml="customFile" className="mb-3 custom-file-label">{filename}</label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input type="submit" color="dark" className="btn btn-primary mt-3" value="Upload" />
            </form>
            { uploadedFile ?
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h4 className="text-center">{uploadedFile.fileName}</h4>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div>
                : null}
        </Fragment>
    );
}
export default FileUpload;