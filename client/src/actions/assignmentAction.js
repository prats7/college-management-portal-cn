import axios from 'axios';

import { GET_ASSIGNMENTS, ADD_ASSIGNMENT, DELETE_ASSIGNMENT, ASSIGNMENTS_LOADING } from './types';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';

export const getAssignments = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/assignments')
        .then(res =>
            dispatch({
                type: GET_ASSIGNMENTS,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addAssignment = assignment => (dispatch, getState) => {
    axios
        .post('/api/assignments', assignment, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ASSIGNMENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};



export const deleteAssignment = id => (dispatch, getState) => {
    axios.delete(`/api/assignments/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ASSIGNMENT,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

};


export const setItemsLoading = () => {
    return {
        type: ASSIGNMENTS_LOADING
    };
};