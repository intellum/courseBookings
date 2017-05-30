import React from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

var CourseBookingsCalendar = React.createClass({

    render: function() {
        return (
            <div className="course-booking-calendar">
                <DatePicker
                    inline
                    fixedHeight
                    selected={this.props.selectedDate}
                    onChange={(date) => this.props.onDateSelected(date)}
                    onMonthChange={this.props.onMonthChanged}
                    todayButton={"Today"}
                    key={this.props.selectedDate}
                    includeDates={_.map(this.props.courseBookings, function(courseBooking) {
                        return Moment(courseBooking._startDate);
                    })} />
            </div>
        );
    }

});

export default CourseBookingsCalendar;