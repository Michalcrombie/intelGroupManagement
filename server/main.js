import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Ars } from '../imports/api/ars.js';
import { Intelusers } from '../imports/api/intelusers.js';
import { Events } from '../imports/api/events.js';

Meteor.startup(() => {
    // code to run on server at startup
    Tasks = new Mongo.Collection("tasks");

  smtp = {
      username: 'intelgroupmanagment@gmail.com',
    password: '12345678intel',
    server:   'smtp.gmail.com',
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.methods({
    insertArs: function(doc) {
        Ars.insert(doc);
        console.log(doc);
        //this.unblock();
        //
        // // Send the e-mail
        Email.send({
            to: "tubul.dana@gmail.com",
            from: "intelgroupmanagment@gmail.com",
            subject: "Message From Intel WIFI core system architecture ",
            text: "Hello, You got a new AR"
        });

    },

  insertIntelusers: function(doc) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: doc});
  }
});



Meteor.methods({
    addEvent( event ) {
        check( event, {
            title: String,
            start: String,
            end: String,
            type: String,
            guests: Number
        });

        try {
            return Events.insert( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    editEvent( event ) {
        check( event, {
            _id: String,
            title: Match.Optional( String ),
            start: String,
            end: String,
            type: Match.Optional( String ),
            guests: Match.Optional( Number )
        });

        try {
            return Events.update( event._id, {
                $set: event
            });
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    removeEvent( event ) {
        check( event, String );

        try {
            return Events.remove( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
});

Accounts.onCreateUser(function(options, user) {
  var newFields = {
    employee_id: "",
    first_name: "",
    last_name: "",
    office_address: "",
    email_adress: "",
    qualifications: "",
    sub_qualifications: "",
    group_name: "",
    Permission:""
  };
  _.extend(user, newFields);
  return user;
});