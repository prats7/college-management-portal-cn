import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Container, Input, FormText } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateName, updatePassword } from '../actions/authAction';

class ProfileModal extends Component {

    //Initialize state
    state = {
        name: '',
        password: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }

    //On change fn
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //Function for adding data on form submit
    onSubmit = e => {

        const { name } = this.state;
        const user = {
            name
        }

        //Attempt to update
        this.props.updateName(user);
    }

    //Function for adding data on form submit
    onSubmitPassword = e => {

        const { password } = this.state;
        const user = {
            password
        }

        //Attempt to update
        this.props.updatePassword(user);
    }

    render() {

        return (
            <div>
                <div><Container style={{ alignItems: 'center', width: 500 }}>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                onChange={this.onChange}
                                type="text" style={{ marginTop: '3rem' }}
                                name="name"
                                id="name"
                                placeholder="Enter new name" />
                        </FormGroup>
                        <Button
                            type="submit"
                            style={{ marginTop: '3rem' }}
                            block>
                            UPDATE</Button>
                    </Form>

                    <Form onSubmit={this.onSubmitPassword}>
                        <FormGroup>
                            <Input
                                onChange={this.onChange}
                                type="text" style={{ marginTop: '3rem' }}
                                name="password"
                                id="password"
                                placeholder="Enter new password" />
                        </FormGroup>
                        <Button
                            type="submit"
                            style={{ marginTop: '3rem' }}
                            block>
                            UPDATE</Button>
                    </Form>
                </Container>
                </div>
            </div>
        )
    }
}

//Mapping item to state
const mapStateToProps = state => ({
    password: state.password,
    name: state.name,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

//Connects react and redux of add item
export default connect(mapStateToProps, { updateName, updatePassword })(ProfileModal);