import { Meteor } from 'meteor/meteor';
import { Ars } from '../imports/api/ars.js';
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
    /*editArs: function(doc) {
       Meteor.ars.update({_id: Ars._id}, {$set: doc});
     }, 
    
    editArs: function ( ar ) {
        check( ar, {
            _id: String,
            description: Match.Optional( String ),
            srartDate: Match.Optional( Date ),
            dueDate: Match.Optional( Date ),
            catagory: Match.Optional( String ),
            subCatagory:Match.Optional( String ),
            priorty:Match.Optional( Number ),
            owner:Match.Optional( String ),
            seconderyOwner:Match.Optional( String ),
            status:Match.Optional( String ),
            statusDetails:Match.Optional( String ),
            comments:Match.Optional( String ),
        }); 
        try {
            return Ars.update( ar._id, {
                $set: ar
            });
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
  },
   
    removeArs( ar ) {
        check( ar, String );
        try {
            return Ars.remove( ar );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
*/
    insertIntelusers: function(doc) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: doc});
    },
});

Meteor.methods({
    addEvent( event ) {
        check( event, {
            title: String,
            start: String,
            end: String,
            type: String,
            guests: Number,
            Names_of_external_guests:String
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
            guests: Match.Optional( Number ),
            Names_of_external_guests: Match.Optional( String )
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
    },
    //CSV exprt
    download: function() {
        var collection = Ars.find().fetch();
        var heading = true; // Optional, defaults to true
        var delimiter = "," // Optional, defaults to ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
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

Meteor.publish(null, function() {

  if (this.userId != null) {
    return Meteor.users.find({
      _id: this.userId
    }, {
        fields: {
            'employee_id':1,
            'first_name': 1,
            'last_name':1,
            'office_address':1,
            'email_adress':1,
            'qualifications':1,
            'sub_qualifications':1,
            'Permission':1,
      },
  
    });
  } else {
    return this.ready();
  }
});


collection2 = new Mongo.Collection('collection2');

Ars.find().observe ({
    changed: function (newDocument, oldDocument){
      //is working
  // console.log 'update 2', collection1.update({_id: newDocument._id}, {updateOnChange: true}) 
    // is not working
        console.log ('insert 1');
        if (oldDocument.owner != newDocument.owner && oldDocument.dueDate != newDocument.dueDate ){
            collection2.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:true })
        } 
        else if (oldDocument.owner != newDocument.owner){
            collection2.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:false })
        }
        else if (oldDocument.dueDate != newDocument.dueDate){
            collection2.insert({ ArID:oldDocument._id,ownerChanged:false, dueDateChanged:true })
        }

}})