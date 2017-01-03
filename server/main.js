import { Meteor } from 'meteor/meteor';
import { Ars } from '../imports/api/ars.js';

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
    // this.unblock();
    //
    // // Send the e-mail
    // Email.send({
    //   to: "kellner.rotem@gmail.com",
    //   from: "intelGroupManagment@gmail.com",
    //   subject: "Website Contact Form - Message From ",
    //   text: "sdfdsfdsdf"
    // });
  }
});