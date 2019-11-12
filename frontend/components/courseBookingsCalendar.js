import React from 'react';
import createReactClass from 'create-react-class';
import LP from 'helpers/lp';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const CourseBookingsCalendar = createReactClass({

    render: function() {
        return (
            <div className="course-booking-calendar">
                <DatePicker
                    inline
                    fixedHeight
                    selected={this.props.selectedDate}
                    onChange={(date) => this.props.onDateSelected(date)}
                    onMonthChange={this.props.onMonthChanged}
                    todayButton={LP('courseBookings', 'today', 'titlecase')}
                    key={this.props.selectedDate}
                    includeDates={_.map(this.props.courseBookings, function(courseBooking) {
                        return moment(courseBooking._startDate).toDate();
                    })}
                />
            </div>
        );
    }

});

export default CourseBookingsCalendar;