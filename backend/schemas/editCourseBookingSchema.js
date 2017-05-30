module.exports = {
    "title": {
        "type": "Text",
        "label": "Name",
        "help": "",
        "conditions": ["required"]
    },
    "displayTitle": {
        "type": "Text",
        "label": "Display Name",
        "help": "",
        "conditions": ["required"]
    },
    "description": {
        "type": "TextArea:Plain",
        "label": "Description",
        "help": ""
    },
    "_location": {
        "type": "Text",
        "label": "Location",
        "help": "",
        "conditions": ["required"]
    },
    "_startDate": {
        "type": "DateAndTimePicker",
        "label": "Start Date",
        "help": "Format is DD/MM/YYYY",
        "conditions": []
    },
    "_endDate": {
        "type": "DateAndTimePicker",
        "label": "End Date",
        "help": "Format is DD/MM/YYYY",
        "conditions": []
    },
    "_places": {
        "type": "Number",
        "label": "Places"
    },
    "_itemGraphic": {
        "type": "AssetUpload:Image:Small",
        "label": "Item Graphic",
        "help": "This graphic should be 512px width by 120px heights"
    },
    "_groups": {
        "type": "GroupSelection",
        "label": "Select Groups"
    },
    "_isPublished": {
        "type": "Boolean",
        "label": "Published?"
    }
}