import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Ars } from '../api/ars.js';
import { Tasks } from '../api/tasks.js';
import './chronologicalgraph.html';

Template.ChronologicalGraph.topGenresChart = function() {
    return {
        chart: {
            type: 'columnrange',
            inverted: true
        },
        title: {
            text: 'Chronological Graph'
        },
        subtitle: {
            text: Meteor.user().username+'s AR'
        },

        xAxis: {
            categories: manipulateDescription(Ars.find())
            
        },
        yAxis: {
            title: {
                text: 'Date'
            },
            labels: {
                format: '{value:%d-%m-%Y}',
                rotation: 45,
                align: 'left'
            }
            
        },

        tooltip: {
            formatter: function () {
                console.log(this);
                return '</b> started at <b>' + Highcharts.dateFormat('%d-%m-%Y', this.point.low) + '</b> and ended at <b>' + Highcharts.dateFormat('%d-%m-%Y', this.point.high) + '</b>';
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Dates',
            data: manipulateArs(Ars.find()),
            //format: {value:Date},
             //   [
            //  [Date.UTC(2013, 07, 02, 05, 10, 0), Date.UTC(2013, 10, 02, 05, 15, 0)],
             // [Date.UTC(2013, 11, 02, 05, 18, 0), Date.UTC(2013, 12, 02, 06, 10, 0)]]
        }]
    }};

var manipulateArs = function(ars) {
    var result = [];
    ars.forEach(function(ar){
        if (Meteor.user().username === ar.owner){ 
            var dataPoint = [Date.UTC(ar.srartDate.getFullYear(),ar.srartDate.getMonth(),ar.srartDate.getDate()),Date.UTC(ar.dueDate.getFullYear(),ar.dueDate.getMonth(),ar.dueDate.getDate())];
            result.push(dataPoint);}})
    return result;
};

var manipulateDescription = function(ars) {
    var result = [];
    ars.forEach(function(ar){
        if (Meteor.user().username === ar.owner){ 
            var dataPoint = [ar.description];
            result.push(dataPoint);}})
    return result;
};

