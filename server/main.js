import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Tasks = new Mongo.Collection("tasks");
});
