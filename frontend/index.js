import {registerComponent, registerMenuItem, registerRoute, registerReducer} from 'bloom';
import LP from 'helpers/lp';
import CourseBookingsContainer from './containers/courseBookingsContainer';
import CourseBookingsAdminContainer from './containers/courseBookingsAdminContainer';
import EditCourseBookingContainer from './containers/editCourseBookingContainer';
import BookedCourseBookingsContainer from './containers/bookedCourseBookingsContainer';
import CourseBookingsReducer from './reducers/courseBookingsReducer';
import CourseBookingReducer from './reducers/courseBookingReducer';
import CourseBookingDashboardReducer from './reducers/courseBookingsDashboardReducer';
import BookedCourseBookingsReducer from './reducers/bookedCourseBookingsReducer';

registerMenuItem({text: LP('courseBookings', 'courseBookings', 'titlecase'), _link: "courseBookings", _icon: "calendar-text", _permission: "admin"}, 0);
registerComponent('courseBookings', 'Course Bookings', CourseBookingsContainer, 'dashboard:learner');
registerComponent('bookedCourseBookings', 'Booked Course Bookings', BookedCourseBookingsContainer, 'myLearning');
registerRoute('/courseBookings', CourseBookingsAdminContainer);
registerRoute('/courseBookings/:id', EditCourseBookingContainer);
registerReducer('courseBookings', CourseBookingsReducer);
registerReducer('courseBooking', CourseBookingReducer);
registerReducer('courseBookingsDashboard', CourseBookingDashboardReducer);
registerReducer('bookedCourseBookings', BookedCourseBookingsReducer);