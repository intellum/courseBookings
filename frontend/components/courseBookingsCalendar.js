import React from 'react';
import createReactClass from 'create-react-class';
import LP from 'helpers/lp';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

const CourseBookingsCalendar = createReactClass({

    render: function() {
        return (
            <div className="course-booking-calendar">
                {/* <DatePicker
                    inline
                    fixedHeight
                    selected={this.props.selectedDate}
                    onChange={(date) => this.props.onDateSelected(date)}
                    onMonthChange={this.props.onMonthChanged}
                    todayButton={LP('courseBookings', 'today', 'titlecase')}
                    key={this.props.selectedDate}
                    includeDates={_.map(this.props.courseBookings, function(courseBooking) {
                        return Moment(courseBooking._startDate);
                    })} /> */}
            </div>
        );
    }

});

export default CourseBookingsCalendar;