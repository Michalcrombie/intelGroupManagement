﻿import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection("events");

Events.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Events.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let EventsSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of this event.'
    },
    'start': {
        type: String,
        label: 'When this event will start.'
    },
    'end': {
        type: String,
        label: 'When this event will end.'
    },
    'type': {
        type: String,
        label: 'What type of event is this?',
        allowedValues: ['Weekly meeting', 'Monthly meeting','Birthday','Wedding']
    },
    'guests': {
        type: Number,
        label: 'The number of guests expected at this event.'
    }
});

Events.attachSchema(EventsSchema);