import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppNavbar from './components/AppNavbar';
//import AssignmentList from './components/AssignmentList';
import Dashboard from './components/Dashboard';
// import ItemModal from './components/itemModal';
import Profile from './components/Profile';
// import FileUpload from './components/FileUpload';

import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';

//Reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Adding Components to App
class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (

      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route component={Profile} path='/profile' />

              <Dashboard />
            </Switch>
            {/* <AssignmentList /> */}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
