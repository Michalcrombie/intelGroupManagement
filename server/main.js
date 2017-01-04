import { Meteor } from 'meteor/meteor';
import { Ars } from '../imports/api/ars.js';
import { Intelusers } from '../imports/api/intelusers.js';

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
  }
});

Meteor.methods({
    insertIntelusers: function(doc) {
        Intelusers.insert(doc);
        console.log(doc);
    }
});