import React, { Component } from 'react';
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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getAssignments, deleteAssignment } from '../actions/assignmentAction';
import PropTypes from 'prop-types';



//Assignment list 
class SubmAssignmentList extends Component {

    static propTypes = {
        getAssignments: PropTypes.func.isRequired,
        assignment: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getAssignments();
    }

    //Delete button fn
    onDeleteClick = id => {
        this.props.deleteAssignment(id);
    };

    render() {
        const { user } = this.props.auth;
        const { assignments } = this.props.assignment;
        return (
            //Assignment List
            this.props.isAuthenticated ?
                <Container>
                    <ListGroup>
                        <TransitionGroup className="assignment-list">

                            {assignments.map(({ _id, name, email, subject, assignment }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <CardBody>
                                            <CardTitle tag="h5">{name} {email}</CardTitle>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">{subject}</CardSubtitle>
                                            <CardText>{assignment}</CardText>
                                            {(this.props.isAuthenticated && user.userType === "Student") ? <Button className="remove-btn"
                                                color="danger"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >Delete
                                    </Button> : null}
                                        </CardBody>

                                    </ListGroupItem>
                                </CSSTransition>
                            ))};
                    </TransitionGroup>
                    </ListGroup>
                </Container> : null
        );
    }
}


const mapStateToProps = (state) => ({
    assignment: state.assignment,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getAssignments, deleteAssignment })(SubmAssignmentList);