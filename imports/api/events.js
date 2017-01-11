import { Mongo } from 'meteor/mongo';

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
        allowedValues: ['Weekly meeting', 'Monthly meeting','Birthday','Wedding','Other']
    },
    'guests': {
        type: Number,
        label: 'The number of guests expected at this event.'
    },
    'Names_of_external_guests': {
        type: String,
        label: 'The names of external guests expected at this event.'
}
});

Events.attachSchema(EventsSchema);