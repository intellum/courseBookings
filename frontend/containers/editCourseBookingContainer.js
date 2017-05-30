import React from 'react';
import {connect} from 'react-redux';
import {
    Loading
} from 'aptr-uikit';
import {
    PageLoader
} from 'modules/app';
import {addDialog} from 'modules/notifications/actions/notifications';
import {updateHeader} from 'modules/app/actions/appActions';
import LP from 'helpers/lp';
import {
    fetchCourseBooking,
    updateCourseBooking
} from '../actions/courseBookingsActions';
import EditCourseBooking from '../components/editCourseBooking';

const EditCourseBookingContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            _hasDataLoaded: false,
            _isSyncing: true,
            _statusCode: null,
            errorMessage: '',
            activeTab: 'edit'
        }
    },

    componentDidMount: function() {
        this.updateHeader();
        this.fetchData();
    },

    fetchData: function() {
        this.setState({
            _isSyncing: true
        })
        
        this.props.fetchCourseBooking(this.props.params.id)
        .then((function(response) {
            this.setState({
                _isSyncing: false,
                _hasDataLoaded: true,
                _schema: response.data._schema
            });
            this.updateHeader();
        }).bind(this))
        .catch((function(response) {
            console.log(response);
            if (response.data.error) {
                this.setState({
                    _hasErrored: true,
                    _statusCode: response.data._statusCode,
                    errorMessage: response.data.message
                })
            }
        }).bind(this))
    },

    updateHeader: function() {
        const title = this.props.courseBooking.displayTitle || this.props.courseBooking.title;

        return this.props.updateHeader({
            breadcrumbs: [
                {
                    text: 'Course Bookings',
                    path: '/courseBookings'
                },
                {
                    text: title
                }
            ]
        });
    },

    onUpdateField: function(model) {
        console.log(model);
        return this.props.updateCourseBooking(this.props.courseBooking._id, model)
            .then(this.updateHeader);
    },

    onTabChanged: function(value) {
        this.setState({
            activeTab: value
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
                <EditCourseBooking
                    courseBooking={this.props.courseBooking}
                    schema={this.state._schema}
                    activeTab={this.state.activeTab}
                    onTabChanged={this.onTabChanged}
                    onUpdateField={this.onUpdateField}
                />
            </PageLoader>
        );
    }

});

export default connect(function(state, props) {
    return {
        courseBooking: state.courseBooking
    }
}, {
    updateHeader,
    fetchCourseBooking,
    updateCourseBooking
})(EditCourseBookingContainer);