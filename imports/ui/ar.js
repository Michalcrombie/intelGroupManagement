import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Ars } from '../api/ars.js';

import './ar.html';
import './ar-edit.js';
import './ar-add.js';

Template.AR.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.AR.helpers({
  ars() {
    return Ars;
  },

   settings: function(){
        return {
            collection:Ars,
            rowsPerPage:10,
            showFilter:true,
            fields:['description','srartDate','dueDate','catagory','subCatagory','owner','seconderyOwner',
                'priorty','status','statusDetails','comments', {
                    key: '', label: '', tmpl: Template.editArRow
                }]
        };
    },
   incompleteCount() {
       return manipulateCount(Ars.find());
   },

   /* //csv export
    'click #buttonDownload': function(Ars) {
        var nameFile = 'fileDownloaded.csv';
        Meteor.call('download', function(err, fileContent) {
            if(fileContent){
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        })}*/

});


var manipulateCount = function (ars) {
    var count = 0;
    ars.forEach (function (ar) {
        if (Meteor.user().username === ar.owner) {
            count++;
        }
    })
    return count;
};

//edit
/*
Template.AR.onRendered( () => {
    $( '#ar-edit' ).ReactiveDict({

        ars( start, end, timezone, callback ) {
            let data = Ars.find().fetch().map( (ar ) => {
                ar.editable = true;
                return ar;
            });
            if ( data ) {
                callback( data );
            }
        },
        
        eventClick( ar ) {
            Session.set( 'arModal', { type: 'edit', ar: ar._id } );
            $( '#add-edit-ar-modal' ).modal( 'show' );
        }
    });

    Tracker.autorun( () => {
        Ars.find().fetch();
        $( '#ar-edit' ).ReactiveDict( 'refetchArs' );
    });

});
*/
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
});

*/

   /* ars() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Ars.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Ars.find({}, { sort: { createdAt: -1 } });
    },*/