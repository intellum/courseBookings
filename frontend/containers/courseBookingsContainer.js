import React from 'react';
import createReactClass from 'create-react-class';
import {connect} from 'react-redux';
import CourseBookings from '../components/courseBookings';
import CourseBookingsItemDialogContainer from '../containers/courseBookingsItemDialogContainer';
import moment from 'moment';
import Scroll from 'react-scroll';
import {addDialog} from 'modules/notifications/actions/notifications';
var Scroller = Scroll.scroller;
var ScrollerEvents = Scroll.Events;

const CourseBookingsContainer = createReactClass({

    getInitialState: function() {
        return {
            selectedDate: moment().toDate()
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
        var correctedDate = moment(date).toDate() === date ? date : moment(date).toDate();
            this.setState({selectedDate: correctedDate});
    },

    onDateSelected: function(date) {
        this.setState({selectedDate: date});
        Scroller.scrollTo(moment(date).format('DD/MM/YYYY'), {
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
            
            const CourseBookingStartDate = moment(courseBooking._startDate).format('MM');
            var MonthDate = moment(date).format('MM');

            if (CourseBookingStartDate === MonthDate && !foundFirstDateInMonth) {
                foundFirstDateInMonth = true;
                
                var scrollToName = moment(date).format('MM') + '-after';
                
                if (moment(date).isBefore(this.state.selectedDate)) {
                    scrollToName = moment(date).format('MM') + '-before';
                }

                this.setState({selectedDate: moment(courseBooking._startDate).toDate()});
                
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