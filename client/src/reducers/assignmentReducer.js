
import { GET_ASSIGNMENTS, ADD_ASSIGNMENT, DELETE_ASSIGNMENT, ASSIGNMENTS_LOADING } from '../actions/types';


const initialState = {
    assignments: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.payload,
                loading: false
            };
        case DELETE_ASSIGNMENT:
            return {
                ...state,
                assignments: state.assignments.filter(assignment => assignment._id !== action.payload)
            };
        case ADD_ASSIGNMENT:
            return {
                ...state,
                assignments: [action.payload, ...state.assignments]
            };
        case ASSIGNMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}