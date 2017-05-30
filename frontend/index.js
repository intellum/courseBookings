import {registerComponent, registerMenuItem, registerRoute, registerReducer} from 'bloom';
import CourseBookingsContainer from './containers/courseBookingsContainer';
import CourseBookingsAdminContainer from './containers/courseBookingsAdminContainer';
import EditCourseBookingContainer from './containers/editCourseBookingContainer';
import BookedCourseBookingsContainer from './containers/bookedCourseBookingsContainer';
import CourseBookingsReducer from './reducers/courseBookingsReducer';
import CourseBookingReducer from './reducers/courseBookingReducer';
import CourseBookingDashboardReducer from './reducers/courseBookingsDashboardReducer';
import BookedCourseBookingsReducer from './reducers/bookedCourseBookingsReducer';

registerMenuItem({text: 'Course Bookings', _link: "courseBookings", _icon: "calendar-text", _permission: "admin"}, 0);
registerComponent('courseBookings', 'Course Bookings', CourseBookingsContainer, 'dashboard:learner');
registerComponent('bookedCourseBookings', 'Booked Course Bookings', BookedCourseBookingsContainer, 'myLearning');
registerRoute({path: 'courseBookings', component: CourseBookingsAdminContainer});
registerRoute({path: 'courseBookings/:id', component: EditCourseBookingContainer});
registerReducer('courseBookings', CourseBookingsReducer);
registerReducer('courseBooking', CourseBookingReducer);
registerReducer('courseBookingsDashboard', CourseBookingDashboardReducer);
registerReducer('bookedCourseBookings', BookedCourseBookingsReducer);