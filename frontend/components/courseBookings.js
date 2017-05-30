import React from 'react';
import Moment from 'moment';
import CourseBookingsCalendar from './courseBookingsCalendar';
import CourseBookingsUpcomingEvents from './courseBookingsUpcomingEvents';

var CourseBookings = React.createClass({

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