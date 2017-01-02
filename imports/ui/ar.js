
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Tasks } from '../api/tasks.js';
import './ar.html';


Template.AR.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.AR.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    settings: function(){
        return {
            collection:Tasks,
            rowsPerPage:10,
            showFilter:true,
            fields:['username','text','checked']
        };
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },
});

Template.AR.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        // Clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});

var manipulateTasks = function (tasks) {
    var result = {};
    tasks.forEach (function (task) {
        if (Meteor.userId() === task.owner){
            if (result[task.text]) {  
                result[task.text]++;}
            else {
                result[task.text] = 1;
            }
        }
    });
    result = $.map(result, function (value, index) {
        return [[index, value]];
    });
    return result;
};
