import React from 'react';
import createReactClass from 'create-react-class';
import Moment from 'moment';
import CourseBookingsCalendar from './courseBookingsCalendar';
import CourseBookingsUpcomingEvents from './courseBookingsUpcomingEvents';

const CourseBookings = createReactClass({

    render: function() {
        return (
            <div className="course-booking clearfix">
                <CourseBookingsCalendar
                    selectedDate={this.props.selectedDate}
                    courseBookings={this.props.courseBookings}
                    onDateSelected={this.props.onDateSelected}
                    onMonthChanged={this.props.onMonthChanged}
                />
                <CourseBookingsUpcomingEvents
                    updateCalendarSelectedDate={this.props.updateCalendarSelectedDate}
                    courseBookings={this.props.courseBookings}
                    onItemClicked={this.props.onItemClicked}
                />
            </div>
        );
    }

});

export default CourseBookings;