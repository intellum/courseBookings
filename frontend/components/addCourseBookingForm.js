import React from 'react';
import Bluebird from 'bluebird';
import {DialogTitle, DialogBody, DialogActions} from 'modules/notifications/components/dialogComponents.jsx';
import LP from 'helpers/lp';
import Moment from 'moment';
import {FlatButton, Button} from 'aptr-uikit';
import {Form} from 'modules/form';

var AddCourseBookingForm = React.createClass({

    getInitialState: function() {
        return {}
    },

    handleDialogAction: function(action) {
        this.props.commitAction({
            action: action,
            payload: this.state
        });
    },

    onUpdateField: function(attributes, hasError, fieldKey) { 
        this.setState(attributes)
        return Bluebird.resolve();
    },

    render: function() {
        return (
            <div className="dialog default-dialog course-booking-item-dialog">
                <DialogTitle title={this.props.title} className="dialog-title default-dialog-title"/>
                <DialogBody body={this.props.body} className="dialog-body default-dialog-body"/>
                <Form
                    model={this.state}
                    schema={this.props.options.schema}
                    onUpdate={this.onUpdateField}
                />
                <DialogActions
                    onDialogAction={this.handleDialogAction}
                    actions={this.props.actions} 
                    className="default-dialog-actions"/>
            </div>
        );
    }

});

export default AddCourseBookingForm;