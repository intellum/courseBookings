import React from 'react';
import LP from 'helpers/lp';
import Moment from 'moment';
import CourseBookingsEventItem from './courseBookingsEventItem';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

var CourseBookingsUpcomingEvents = React.createClass({

    onEnter: function(inviewData, date) {
        if (inviewData.previousPosition === 'above' && inviewData.currentPosition === 'inside') {
            this.props.updateCalendarSelectedDate(date);
        }
    },

    onLeave: function(inviewData, date) {
        if (inviewData.currentPosition === 'above' && inviewData.previousPosition === 'inside') {
            this.props.updateCalendarSelectedDate(date);
        }
    },

    renderUpcomingEventItems: function() {
        var currentMonthIndex = null;
        return _.map(this.props.courseBookings, (courseBooking) => {
            var monthIndex = Moment(new Date(courseBooking._startDate), 'DD/MM/YYYY').month();
            var isStartOfMonth = false;
            if (currentMonthIndex != monthIndex) {
                isStartOfMonth = true;
                currentMonthIndex = monthIndex;
            }
            return (
                <div key={courseBooking._id}>
                    {this.renderMonthDivider(courseBooking._startDate, isStartOfMonth)}
                    <ScrollElement name={Moment(courseBooking._startDate).format('DD/MM/YYYY')}/>
                    <CourseBookingsEventItem
                        item={courseBooking}
                        key={courseBooking._id}
                        onItemClicked={this.props.onItemClicked}
                        isStartOfMonth={isStartOfMonth}
                    />
                </div>
            );
        })
    },

    renderMonthDivider: function(date, isStartOfMonth) {
        if (isStartOfMonth) {
            return (
                <div className="course-booking-event-divider">
                    <ScrollElement name={Moment(date).format('MM') + '-before'}/>
                    <Waypoint
                        onEnter={(inviewData) => this.onEnter(inviewData, Moment(date))}
                        onLeave={(inviewData) => this.onLeave(inviewData, Moment(date))}
                    />
                    {Moment(date).format('MMMM')}
                    <ScrollElement name={Moment(date).format('MM') + '-after'}/>
                </div>
            );
        }
    },

    render: function() {
        return (
            <div className="course-booking-upcoming-events">
                <div className="course-booking-upcoming-events-title">
                    {LP('courseBookings', 'upcomingEvents', 'titlecase')}
                </div>
                <div className="course-booking-upcoming-events-items" id="course-booking-upcoming-events-items">
                    <div className="course-booking-event-divider">
                        <Waypoint
                            onEnter={(inviewData) => this.onEnter(inviewData, Moment(new Date()))}
                            onLeave={(inviewData) => this.onLeave(inviewData, Moment(new Date()))}
                        />
                        {LP('courseBookings', 'today', 'sentencecase')}
                    </div>
                    {this.renderUpcomingEventItems()}
                </div>
            </div>
        );
    }

});

export default CourseBookingsUpcomingEvents;