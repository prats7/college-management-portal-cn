import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Container, Input, FormText } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateName } from '../actions/authAction';
import { clearErrors } from '../actions/errorAction';

class ProfileModal extends Component {

    //Initialize state
    state = {
        name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        updateName: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'NAME_UPDATE_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }


    //On change fn
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //Function for adding data on form submit
    onSubmit = e => {

        const { name } = this.state;

        //Create new user
        const newName = {
            name
        };
        //Attempt to update
        this.props.updateName(newName);
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
                    </Form></Container>
                </div>
            </div>
        )
    }
}

//Mapping item to state
const mapStateToProps = state => ({
    name: state.name,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

//Connects react and redux of add item
export default connect(mapStateToProps, { updateName, clearErrors })(ProfileModal);