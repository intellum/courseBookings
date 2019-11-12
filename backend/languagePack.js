
module.exports = {
    "db": {
        "courseBookings": {"type": String, "default": "course bookings"},
        "addACourseBooking": {"type": String, "default": "add a course booking"},
        "youBooked": {"type": String, "default": "YOU Booked"},
        "noBookedCourses": {"type": String, "default": "You currently don't have any Booked Courses. Check the Dashboard for upcoming events."},
        "noCourseBookingsAvailable": {"type": String, "default": "No Course Bookings available"},
        "createCourseBooking": {"type": String, "default": "create course booking"},
        "downloadCalendarInvite": {"type": String, "default": "download calendar invite"},
        "cancelMyPlace": {"type": String, "default": "cancel my place"},
        "bookMyPlace": {"type": String, "default": "book my place"},
        "placesLeft": {"type": String, "default": "place(s) left"},
        "upcomingEvents": {"type": String, "default": "upcoming events"},
        "noUsersAreAttendingThisEvent": {"type": String, "default": "No users are attending this event"},
        "usersIn": {"type": String, "default": "users in"},
        "today": {"type": String, "default": "today"},
        "courseBooking": {"type": String, "default": "course booking"},
        "courseBookingItemDialogAriaLabel": {"type": String, "default": "this is a course booking dialog. here you will find more details about this booking"}
    },
    "form": {
        "type": "Object",
        "label": "Course Bookings",
        "subSchema": {
            "courseBookings": {
                "type": "Text",
                "label": "Course bookings"
            },
            "addACourseBooking": {
                "type": "Text",
                "label": "Add A Course Booking"
            },
            "youBooked": {
                "type": "Text",
                "label": "You Booked"
            },
            "noBookedCourses": {
                "type": "Text",
                "label": "No Booked Courses"
            },
            "noCourseBookingsAvailable": {
                "type": "Text",
                "label": "No Course Bookings Available"
            },
            "createCourseBooking": {
                "type": "Text",
                "label": "Create Course Booking"
            },
            "downloadCalendarInvite": {
                "type": "Text",
                "label": "Download Calendar Invite"
            },
            "cancelMyPlace": {
                "type": "Text",
                "label": "Cancel My Place"
            },
            "bookMyPlace": {
                "type": "Text",
                "label": "Book My Place"
            },
            "placesLeft": {
                "type": "Text",
                "label": "Places Left"
            },
            "upcomingEvents": {
                "type": "Text",
                "label": "Upcoming Events"
            },
            "noUsersAreAttendingThisEvent": {
                "type": "Text",
                "label": "No Users are Attending this Event"
            },
            "usersIn": {
                "type": "Text",
                "label": "Users In"
            },
            "today": {
                "type": "Text",
                "label": "Today"
            },
            "courseBooking": {
                "type": "Text",
                "label": "Course Booking"
            },
            "courseBookingItemDialogAriaLabel": {
                "type": "Text",
                "label": "Course Booking Dialog Aria Label. This is the text that a screen reader will use to describe this dialog"
            }
        }
    }
}