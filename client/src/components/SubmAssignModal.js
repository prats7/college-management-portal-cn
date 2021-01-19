import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addAssignment } from '../actions/assignmentAction';
import PropTypes from 'prop-types';

class SubmAssignModal extends Component {

    //Initialize state
    state = {
        modal: false,
        name: '',
        email: '',
        subject: '',
        assignment: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }
    //Toggle to hide or display modal during form submit
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //On change fn
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Function for adding data on form submit
    onSubmit = e => {
        e.preventDefault();

        const newAssignment = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            assignment: this.state.assignment
        }

        // Add item via addItem action
        this.props.addAssignment(newAssignment);

        // Close modal
        this.toggle();
    }

    render() {

        const { user } = this.props.auth;

        return (
            <div>
                <Button
                    color="success"
                    onClick={this.toggle}
                >Submit Assignment</Button>


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Submit Assignment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    onChange={this.onChange}
                                />
                                <Label for="name">Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    onChange={this.onChange}
                                />
                                <Label for="subject">Subject</Label>
                                <Input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder="Enter assignment subject"
                                    onChange={this.onChange}
                                />
                                <Label for="assignment">Assignment</Label>
                                <Input
                                    type="text"
                                    name="assignment"
                                    id="assignment"
                                    placeholder="Enter name of your assignment"
                                    onChange={this.onChange}
                                />
                                <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>Add Assignment</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

//Mapping item to state
const mapStateToProps = state => ({
    name: state.name,
    email: state.email,
    subject: state.subject,
    assignment: state.assignment,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

//Connects react and redux of add item
export default connect(mapStateToProps, { addAssignment })(SubmAssignModal);