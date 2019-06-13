import React from 'react';
import LP from 'helpers/lp';
import CourseBookingsEventItem from './courseBookingsEventItem';
import AlertInfo from 'modules/app/components/alertInfo';

var BookedCourseBookings = React.createClass({

    renderBookings: function(column, leftCount) {
        var index = -1;
        return _.map(this.props.bookedCourseBookings, (courseBooking) => {
            
            index ++;

            if (column === 'left' && index < leftCount) {
                return (
                    <CourseBookingsEventItem
                        item={courseBooking}
                        key={courseBooking._id}
                        onItemClicked={this.props.onItemClicked}
                    />
                );
            } else if (column === 'right' && index >= leftCount){
                return (
                    <CourseBookingsEventItem
                        item={courseBooking}
                        key={courseBooking._id}
                        onItemClicked={this.props.onItemClicked}
                    />
                );
            }

        })
    },

    renderItems: function() {
        
        if (Object.keys(this.props.bookedCourseBookings).length === 0) {
            return (
                <div className="booked-course-bookings-items clearfix">
                    <AlertInfo type="info" text={LP('courseBookings', 'noBookedCourses', null)}/>
                </div>
            )
        }
        
        var leftCount = (Object.keys(this.props.bookedCourseBookings).length / 2);

        return (
            <div className="booked-course-bookings-items clearfix">
                <div className="booked-course-bookings-column-left">
                    {this.renderBookings('left', leftCount)}
                </div>
                <div className="booked-course-bookings-column-right">
                    {this.renderBookings('right', leftCount)}
                </div>
            </div>
        );

    },

    render: function() {

        return (
            <section className="booked-course-bookings" aria-label={LP('myLearning', 'courseBookingsSectionAriaLabel', 'sentencecase')}>
                <div className="booked-course-bookings-title">
                    {LP('courseBookings', 'youBooked', null)}
                </div>
                {this.renderItems()}
                
            </section>
        );
    }

});

export default BookedCourseBookings;