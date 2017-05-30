import {
    CREATE_COURSE_BOOKING,
    FETCH_COURSE_BOOKING,
    UPDATE_COURSE_BOOKING
} from '../actions/courseBookingsActions';

export default function(state = {}, action) {

    switch (action.type) {

        case CREATE_COURSE_BOOKING:
            return action.payload._courseBooking;
        case FETCH_COURSE_BOOKING:
            return action.payload._courseBooking;
        case UPDATE_COURSE_BOOKING:
            return action.payload._courseBooking;
        default:
            return state;
            
    }
}