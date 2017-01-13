﻿import { Ars } from '../api/ars.js';
import './home.html';

Router.configure({
    // the default layout
    layoutTemplate: 'mainSide',
});

Router.route('/', function () {
    this.render('home');
    this.layout('mainSide');
});
 
 Router.route('/Profile', function () {
     this.render('Profile');
     this.layout('mainSide');
 });

 Router.route('/AR', function () {
     this.render('AR');
     this.layout('mainSide');
 });

 Router.route('/ChronologicalGraph', function () {
     this.render('ChronologicalGraph');
     this.layout('mainSide');
 });

 Router.route('/Groupevents', function () {
     this.render('events');
     this.layout('mainSide');
 });

 Router.route('/Statistics', function () {
     this.render('Statistics');
     this.layout('mainSide');
 });
 Router.route('/ProfileEdit', function () {
     this.render('ProfileEdit');
     this.layout('mainSide');
 });
 Router.route('/ARAdd', function () {
     this.render('ARAdd');
     this.layout('mainSide');
 });
 Router.route('/AREdit/:_id', function () {
     this.render('editArRow',{
       data: function () {
         return Ars.findOne({_id: this.params._id});
       }
     });
     this.layout('mainSide');
 });