import React from 'react';
import {connect} from 'react-redux';
import CourseBookings from '../components/courseBookings';
import CourseBookingsItemDialogContainer from '../containers/courseBookingsItemDialogContainer';
import Moment from 'moment';
import Scroll from 'react-scroll';
import {addDialog} from 'modules/notifications/actions/notifications';
var Scroller = Scroll.scroller;
var ScrollerEvents = Scroll.Events;

var CourseBookingsContainer = React.createClass({

    getInitialState: function() {
        return {
            selectedDate: Moment()
        }
    },

    componentDidMount: function() {
        ScrollerEvents.scrollEvent.register('begin', () => {
            this.isScrolling = true;
        });

        ScrollerEvents.scrollEvent.register('end', () => {
            this.isScrolling = false;
        });
    },

    componentWillUnmount: function() {
        ScrollerEvents.scrollEvent.remove('begin');
        ScrollerEvents.scrollEvent.remove('end');
    },

    updateCalendarSelectedDate: function(date) {
        if (this.isScrolling) return;
        this.setState({selectedDate: date});
    },

    onDateSelected: function(date) {
        this.setState({selectedDate: date});
        Scroller.scrollTo(date.format('DD/MM/YYYY'), {
            duration: 300,
            delay: 0,
            smooth: true,
            containerId:"course-booking-upcoming-events-items"
        })
    },

    onItemClicked: function(item) {
        this.props.addDialog({
            dialogType: 'default',
            title: item.displayTitle,
            body: item.description,
            customDialog: CourseBookingsItemDialogContainer,
            options: {
                courseBookingId: item._id
            },
            actions: [
                {
                    action: 'done',
                    buttonText: 'DONE',
                    buttonType: 'primary'
                }
            ]
        })
        .then((function(response) {
            if(response.action === 'done') {
                
            }
        }).bind(this));
    },

    onMonthChanged: function(date) {
        var foundFirstDateInMonth = false;
        
        _.each(this.props.courseBookings, (courseBooking) => {
            
            var CourseBookingStartDate = Moment(courseBooking._startDate).format('MM');
            var MonthDate = Moment(date).format('MM');

            if (CourseBookingStartDate === MonthDate && !foundFirstDateInMonth) {
                foundFirstDateInMonth = true;
                
                var scrollToName = date.format('MM') + '-after';
                
                if (date.isBefore(this.state.selectedDate)) {
                    scrollToName = date.format('MM') + '-before';
                }

                this.setState({selectedDate: Moment(courseBooking._startDate)});
                
                Scroller.scrollTo(scrollToName, {
                    duration: 300,
                    delay: 0,
                    smooth: true,
                    containerId:"course-booking-upcoming-events-items"
                });

            }
        });

    },

    render: function() {

        console.log(Object.keys(this.props.courseBookings));

        if (Object.keys(this.props.courseBookings).length === 0) {
            return null;
        }

        return (
            <CourseBookings
                courseBookings={this.props.courseBookings}
                selectedDate={this.state.selectedDate}
                onDateSelected={this.onDateSelected}
                onItemClicked={this.onItemClicked}
                onMonthChanged={this.onMonthChanged}
                updateCalendarSelectedDate={this.updateCalendarSelectedDate}
            />
        );
    }

});

export default connect(function(state, props) {
    return {
        auth: state.auth,
        courseBookings: state.courseBookingsDashboard
    }
}, {
    addDialog
})(CourseBookingsContainer);