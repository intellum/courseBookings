import React from 'react';
import {
    ActionBar,
    Button,
    CollectionItem,
    Loading,
    Pagination,
    SearchBar
} from 'aptr-uikit';
import CourseBookingsCollectionItem from './courseBookingsCollectionItem';
import CourseBookingsCollectionActions from './courseBookingsCollectionActions';
import LP from 'helpers/lp';
import AlertInfo from 'modules/app/components/alertInfo';

var CourseBookingsCollection = React.createClass({

    renderCourseBookingsList: function() {
        return (
            <ul className="collection-items">
                {this.renderLoading()}
                {this.renderCourseBookings()}
            </ul>
        );
    },

    renderLoading: function() {
        if (this.props.isSyncing) {
            return (
                <Loading text="Loading"/>
            );
        }
    },

    renderCourseBookings: function() {

        if(_.isEmpty(this.props.courseBookings)) {
            return (
                <div>
                    <AlertInfo 
                        text="No Course Bookings available"
                        type="info"
                    />
                </div>
            )

        } else { 
            return _.map(this.props.courseBookings, (courseBooking) => {
                return (
                    <CollectionItem
                        contentComponent={
                            <CourseBookingsCollectionItem 
                                courseBooking={courseBooking}/>
                        }
                        actionsComponent={
                            <CourseBookingsCollectionActions 
                                courseBooking={courseBooking}
                                editCourseBooking={this.props.editCourseBooking}
                                />
                        }
                        key={courseBooking._id}
                    />
                );
            })
        }

    },

    render: function() {
        return (
            <div>
                <ActionBar>
                    <div className="action-bar-left">
                        <SearchBar
                            className="action-bar-item"
                            value={this.props.searchValue}
                            onChange={this.props.onSearchBarChanged}
                        />
                    </div>
                    <div className="action-bar-center">
                        <Pagination
                            className="action-bar-item"
                            currentPage={this.props.currentPage}
                            totalPages={this.props.totalPages}
                            buttonType="secondary"
                            onPreviousPageClicked={this.props.onPreviousPageClicked}
                            onNextPageClicked={this.props.onNextPageClicked}
                        />
                    </div>
                    <div className="action-bar-right">
                        <Button 
                            className="action-bar-item"
                            text="Create Course Booking"
                            type="primary" 
                            icon="book" 
                            onClick={this.props.onCreateCourseBookingClicked}/>
                    </div>
                </ActionBar>
                {this.renderCourseBookingsList()}
            </div>
        );
    }

});

export default CourseBookingsCollection;