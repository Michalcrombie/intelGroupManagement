
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Tasks } from '../api/tasks.js';
import { Ars } from '../api/ars.js';

import './ar.html';



Template.AR.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.AR.helpers({
  ars() {
    return Ars;
  },
   /* ars() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Ars.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Ars.find({}, { sort: { createdAt: -1 } });
    },*/
   settings: function(){
        return {
            collection:Ars,
            rowsPerPage:10,
            showFilter:true,
            fields:['description','srartDate','dueDate','catagory','subCatagory','owner','seconderyOwner','priorty','status','statusDetails','comments']
        };
    },
    //incompleteCount() {
       // return Ars.find({ checked: { $ne: true } }).count();
    //},
    incompleteCount() {
        return Ars.find().count();
    },
});

/*Template.AR.events({
    'submit .new-ar'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Ars.insert({
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

Template.AR.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Ars.update(this._id, {
            $set: { checked: ! this.checked },
        });
    },
    'click .delete'() {
        Ars.remove(this._id);
    },
});*/
