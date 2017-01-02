import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Tasks = new Mongo.Collection("tasks");

  smtp = {
    username: 'mikmik.crombie@gmail.com',
    password: 'Eli241058',
    server:   'smtp.gmail.com',
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.methods({
  insertArs: function(doc) {

      console.log(doc);
    // this.unblock();
    //
    // // Send the e-mail
    // Email.send({
    //   to: "kellner.rotem@gmail.com",
    //   from: "mikmik.crombie@gmail.com",
    //   subject: "Website Contact Form - Message From ",
    //   text: "sdfdsfdsdf"
    // });
  }
});