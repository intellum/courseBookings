import {
    BOOK_USER_INTO_EVENT,
    CANCEL_USER_FROM_EVENT,
} from '../actions/courseBookingsActions';

import {
    FETCH_MY_LEARNING
} from 'modules/myLearning/actions/myLearningActions';

export default function(state = {}, action) {
    switch(action.type) {

        case FETCH_MY_LEARNING:
            return _.mapKeys(action.payload._myLearningData._bookedCourseBookings, '_id');
        case CANCEL_USER_FROM_EVENT:
            return _.omit(state, action.payload._courseBooking._id);
    }

    return state;

}