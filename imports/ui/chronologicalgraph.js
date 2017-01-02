
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
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
            categories: ['AR1','AR2']
        },

        yAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },

        tooltip: {
            formatter: function () {
                console.log(this);
                return '<b>' + this.x + '</b> started at <b>' + Highcharts.dateFormat('%d-%m-%Y', this.point.low) + '</b> and ended at <b>' + Highcharts.dateFormat('%d-%m-%Y', this.point.high) + '</b>';
            }
        },
    

        legend: {
            enabled: false
        },

        series: [{
            name: 'Temperatures',
            data: [
              [Date.UTC(2013, 07, 02, 05, 10, 0), Date.UTC(2013, 10, 02, 05, 15, 0)],
              [Date.UTC(2013, 11, 02, 05, 18, 0), Date.UTC(2013, 12, 02, 06, 10, 0)]
            ]
        }]
    }};



