import React from 'react';
import createReactClass from 'create-react-class';
import {connect} from 'react-redux';
import {
    Loading
} from 'uiKit';
import {
    PageLoader
} from 'modules/app';
import { addDialog } from 'modules/notifications/actions/notifications';
import PaginatedCheckDialog from 'modules/notifications/components/paginatedCheckDialog';
import {updateHeader} from 'modules/app/actions/appActions';
import LP from 'helpers/lp';
import {
    fetchCourseBooking,
    updateCourseBooking,
    addUsersIntoEvent,
    cancelUserFromEvent
} from '../actions/courseBookingsActions';
import {
    fetchUsersByMultipleGroups
} from 'modules/users/actions/usersActions'
import EditCourseBooking from '../components/editCourseBooking';
import getUsersFullName from 'helpers/getUsersFullName';


const EditCourseBookingContainer = createReactClass({

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
        
        this.props.fetchCourseBooking(this.props.match.params.id)
            .then((function(response) {
            this.setState({
                _isSyncing: false,
                _hasDataLoaded: true,
                _schema: response.data._schema
            });
            this.updateHeader();
        }).bind(this))
        .catch((function(response) {
            if (response.error) {
                this.setState({
                    _hasErrored: true,
                    _statusCode: response._statusCode,
                    errorMessage: response.message
                })
            }
        }).bind(this))
    },

    updateHeader: function() {
        const title = this.props.courseBooking.displayTitle || this.props.courseBooking.title;

        return this.props.updateHeader({
            breadcrumbs: [
                {
                    text: LP('courseBookings', 'courseBookings', 'titlecase'),
                    path: '/courseBookings'
                },
                {
                    text: title
                }
            ]
        });
    },

    onAddUsersClicked: function(event) {
        event.preventDefault();

        var currentlySelectedUsers = _.map(this.props.courseBooking._users, '_id');
        var addExistingUserDialog = {
            
            title: 'Add Existing Users',
            actions :[
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
            ],
            options: {
                getItemLabelText: function(item) {
                    return (
                        <div className="users-in-group-dialog-user">
                            <div className="users-in-group-dialog-user-name">{getUsersFullName(item)}</div>
                            <div className="users-in-group-dialog-user-role">
                                {item._role}
                            </div>
                        </div>
                    )
                },
                selectedItems: currentlySelectedUsers,
                className: 'users-in-group-dialog',
                noItemsText: "No Users Available",
                disableCheckboxOnSelectedItems: true
            },
            customDialog: connect(state => {


                return {
                    items: state.availableUsers
                }
            }, { fetchData: (searchValue, currentPage) => fetchUsersByMultipleGroups(this.props.courseBooking._groups, searchValue, currentPage)})(PaginatedCheckDialog),
        };

        this.setState({
            _isSyncing: true
        });

        this.props.addDialog(addExistingUserDialog)
            .then(result => {
                if(result.action === 'add') {
                    var newUsers = _.filter(result.payload, (user) => {
                        if(_.find(this.props.courseBooking._users, { '_id': user })) {
                            return false
                        } else {
                            return true;
                        }
                    });
    
                    this.props.addUsersIntoEvent(this.props.courseBooking._id, newUsers);
                }
        })
        .finally(() => this.setState({_isSyncing: false}));
    },

    onRemoveUserFromEventClicked: function(userId) {
        var removeUserDialog = {
            dialogType: 'default',
            title: 'Remove User',
            body: 'Are you sure you want to remove this user from this course booking event?',
            actions :[
                {
                    action: 'remove',
                    buttonText: 'REMOVE',
                    buttonType: 'primary'
                },
                {
                    action: 'cancel',
                    buttonText: 'CANCEL',
                    buttonType: 'alert'
                }
            ]
        };

        this.props.addDialog(removeUserDialog).then((response) => {
            if (response.action === 'remove') {
                return this.props.cancelUserFromEvent(this.props.courseBooking._id, userId);
            }
        });
    },

    onUpdateField: function(model) {
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
                    onAddUsersClicked={this.onAddUsersClicked}
                    onRemoveUserFromEventClicked={this.onRemoveUserFromEventClicked}
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
    updateCourseBooking,
    addUsersIntoEvent,
    cancelUserFromEvent,
    addDialog
})(EditCourseBookingContainer);