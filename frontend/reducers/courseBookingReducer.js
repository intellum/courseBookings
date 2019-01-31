import {
    CREATE_COURSE_BOOKING,
    FETCH_COURSE_BOOKING,
    UPDATE_COURSE_BOOKING,
    BOOK_USER_INTO_EVENT,
    CANCEL_USER_FROM_EVENT,
    ADD_USERS_INTO_EVENT
} from '../actions/courseBookingsActions';

export default function(state = {}, action) {

    switch (action.type) {

        case CREATE_COURSE_BOOKING:
            return action.payload._courseBooking;
        case FETCH_COURSE_BOOKING:
            return action.payload._courseBooking;
        case UPDATE_COURSE_BOOKING:
            return action.payload._courseBooking;
        case BOOK_USER_INTO_EVENT:
            return _.extend({}, state, {_users: action.payload._courseBooking._users});
        case CANCEL_USER_FROM_EVENT:
            return _.extend({}, state, {_users: action.payload._courseBooking._users});
        case ADD_USERS_INTO_EVENT:
            return _.extend({}, state, {_users: action.payload._courseBooking._users});
        default:
            return state;
            
    }
}