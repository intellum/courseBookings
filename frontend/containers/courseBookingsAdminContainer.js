import React from 'react';
import createReactClass from 'create-react-class';
import {connect} from 'react-redux';
import {
    Loading
} from 'uiKit';
import {
    PageLoader
} from 'modules/app';
import {addDialog} from 'modules/notifications/actions/notifications';
import {updateHeader} from 'modules/app/actions/appActions';
import LP from 'helpers/lp';
import CourseBookingsCollection from '../components/courseBookingsCollection';
import AddCourseBookingForm from '../components/addCourseBookingForm';
import {
    fetchCourseBookings,
    createCourseBooking
} from '../actions/courseBookingsActions';

const CourseBookingsAdminContainer = createReactClass({

    getInitialState: function() {
        return {
            _hasDataLoaded: false,
            _isSyncing: true,
            _currentPage: 1,
            searchValue: '',
            _statusCode: null,
            errorMessage: ''
        }
    },

    componentDidMount: function() {
        this.updateHeader();
        this.fetchData(this.state._currentPage);
    },

    fetchData: function(currentPage) { 
        this.setState({
            _isSyncing: true
        })
        this.props.fetchCourseBookings(this.state.searchValue, currentPage)
        .then((response) => {
            this.setState({
                _isSyncing: false,
                _hasDataLoaded: true,
                _currentPage: response.data._currentPage,
                _totalPages: response.data._totalPages,
                _schema: response.data._schema
            });
        })
        .catch((response) => {
            if (response.data.error) {
                this.setState({
                    _hasErrored: true,
                    _statusCode: response.data._statusCode,
                    errorMessage: response.data.message
                })
            }
        });
    },

    updateHeader: function() {
         this.props.updateHeader({
             breadcrumbs: [
                 {
                     text: 'Course Bookings'
                 }
             ]
        });
    },

    editCourseBooking: function(courseBookingId) {
        this.props.history.push('/courseBookings/' + courseBookingId);
    },

    onCreateCourseBookingClicked: function() {

        const CourseBookingCreateDialog = {
            dialogType: 'default',
            title: 'Add a Course Booking',
            body: '',
            options: {
                schema: this.state._schema
            },
            customDialog: AddCourseBookingForm,
            actions: [
                {
                    action: 'add',
                    buttonText: 'ADD',
                    buttonType: 'primary'
                },
                {
                    action: 'cancel',
                    buttonText: 'CANCEL',
                    buttonType: 'alert'
                }
            ]
        };

        this.props.addDialog(courseBookingCreateDialog)
            .then(response => {
                if(response.action === 'add') {
                    this.props.createCourseBooking(response.payload)
                        .then((response) => {
                            this.props.history.push('/courseBookings/' + this.props.courseBooking._id);
                        });
                }
            });
    },

    onPreviousPageClicked: function() {
        this.fetchData(this.state._currentPage - 1);
    },

    onNextPageClicked: function() {
        this.fetchData(this.state._currentPage + 1);
    },

    onSearchBarChanged: function(value) {
        this.setState({
            searchValue: value
        }, function() {
            this.fetchData(1);
        });
    },

    render: function() {
        return (
            <PageLoader 
                hasLoaded={this.state._hasDataLoaded} 
                hasErrored={this.state._hasErrored}
                statusCode={this.state._statusCode}
                errorMessage={this.state.errorMessage}
                text="Loading"
                >
                <CourseBookingsCollection
                    hasDataLoaded={this.state._hasDataLoaded}
                    currentPage={this.state._currentPage}
                    totalPages={this.state._totalPages}
                    searchValue={this.state.searchValue}
                    isSyncing={this.state._isSyncing}
                    courseBookings={this.props.courseBookings}
                    editCourseBooking={this.editCourseBooking}
                    onPreviousPageClicked={this.onPreviousPageClicked}
                    onNextPageClicked={this.onNextPageClicked}
                    onSearchBarChanged={this.onSearchBarChanged}
                    onCreateCourseBookingClicked={this.onCreateCourseBookingClicked}
                />
            </PageLoader>
        );
    }

});

export default connect(function(state, props) {
    return {
        courseBookings: state.courseBookings,
        courseBooking: state.courseBooking
    }
}, {
    updateHeader,
    fetchCourseBookings,
    createCourseBooking,
    addDialog
})(CourseBookingsAdminContainer);