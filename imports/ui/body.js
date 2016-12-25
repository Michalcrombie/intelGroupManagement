import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './firstGraph.js';
import './body.html';
import './task.js';

//import './index.js'
//import './myTemplate.js';

//knkn
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});
Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        // Show newest tasks at the top
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },

    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },

});
Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();
 
        // Get value from form element
        const target = event.target;
        const text = target.text.value;
 
        // Insert a task into the collection
        Tasks.insert({
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

Template.body.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: Meteor.user() ? Meteor.user().username + "'s top genres" : ""
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver',

                }
            }
        },
        series: [{
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            name: 'genre',
            data: manipulateTasks(Tasks.find())
        }]
    };
};

var manipulateTasks = function(tasks) {
    var result = {};
    tasks.forEach(function(task){
        if (Meteor.userId() === task.owner){
            if (result[task.text]) {
                result[task.text] ++;
            } else {
                result[task.text] = 1;
            }
        }
    });
    result = $.map(result, function(value, index) {
        return [[index,value]];
    });
    return result;
};

/*
Template.body.topGenresChart = function() {
    return {
chart: {
        type: 'pie',
        options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
        }
},
title: {
        text: 'Browser market shares at a specific website, 2014'
},
tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
},
series: [{
    type: 'pie',
    name: 'Browser share',
    data: [
        ['Firefox', 45.0],
        ['IE', 26.8],
        {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true
        },
        ['Safari', 8.5],
        ['Opera', 6.2],
        ['Others', 0.7]
    ]
}]
    };
    return result;
};*/