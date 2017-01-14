import { Meteor } from 'meteor/meteor';
import { Ars } from '../imports/api/ars.js';
import { Events } from '../imports/api/events.js';
import { Changes } from '../imports/api/changes.js';

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
        if (doc.owner == Meteor.user().username || Meteor.user().Permission == "Manager"){
            Ars.insert(doc);
            console.log(doc);
            // // Send the e-mail
            Email.send({
                to: Meteor.user().email_adress,
                from: "intelgroupmanagment@gmail.com",
                subject: "Message From Intel WIFI core system architecture ",
                text: "Hello, You got a new AR :"+ doc.description 
            });
        };  
    },
   insertIntelusers: function(doc) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: doc});
   },
   sendmail(doc) {
       var usersnew = Meteor.users.find();
       usersnew.forEach(function(user){
           if (user.first_name==doc.owner)
           {
               var mail=user.email_adress;
               Email.send({       
                   to: mail,
                   from: "intelgroupmanagment@gmail.com",
                   subject: "Message From Intel WIFI core system architecture ",
                   text: "Hello, Your AR was edited by:"+ Meteor.user().first_name
            })
           }
       });
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

Ars.find().observe ({
    changed: function (newDocument, oldDocument){
        oldDate=oldDocument.dueDate.valueOf();
        newDate=newDocument.dueDate.valueOf();
        if (oldDate != newDate && oldDocument.owner !== newDocument.owner){
            Changes.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:true })
        }
        else {
            if (oldDate != newDate){
                Changes.insert({ ArID:oldDocument._id,ownerChanged:false, dueDateChanged:true })
            }
            if (oldDocument.owner != newDocument.owner){
                Changes.insert({ ArID:oldDocument._id,ownerChanged:true , dueDateChanged:false })
            }}
}})