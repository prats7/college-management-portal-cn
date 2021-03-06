import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {


    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    //Modal toggle
    toggle = () => {

        this.setState({
            isOpen: !this.state.isOpen
        });

    }
    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    {/*Route to profile */}
                    <NavLink
                        to='/profile'
                    >
                        <span className="navbar-text mr-3">
                            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                        </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );
        //For Register and login
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (

            <div>
                <Navbar color="dark blue" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Assignments App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>

                                {isAuthenticated ? authLinks : guestLinks}

                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>

        );

    }
}

//map current state to props
const mapStateToProps = state => ({
    auth: state.auth
});

//Connect react-redux
export default connect(mapStateToProps, null)(AppNavbar);