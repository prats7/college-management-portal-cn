import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AssignmentList from './AssignmentList';
import SubmAssignment from './SubmAssignment';
import FileUpload from './FileUpload';
import ItemModal from './itemModal'


//Dashboard Tabs
const Dashboard = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    return (
        <Container>
            <div>
                <ItemModal />
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Upcoming Assignments
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Submitted Assignments
          </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="8">
                                <AssignmentList />
                            </Col>
                            <Col>
                                <div className="container mt-4">
                                    <h3 className="mt-3">Upload Assignments</h3>
                                    <FileUpload />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="100">
                                <SubmAssignment />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </Container>
    );
}



export default Dashboard;
