import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'; 
import { Tasks } from '../api/tasks.js';
import './statistics.html';


Template.Statistics.testGraph1 = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: Meteor.user() ? Meteor.user().username + "'s performance" : ""
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
    var result = [["done", 0],["pending", 0]];
    tasks.forEach(function(task){
        if (Meteor.userId() === task.owner) {
            if (task.checked) {
                result[0][1] ++;
            } else {
                result[1][1] ++;
            }
        }
    });
    return result;
};


Template.Statistics.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: Meteor.user() ? Meteor.user().username + "'s AR's" : ""
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
            data: manipulateTasks_owner(Tasks.find())
        }]
    };
};

var manipulateTasks_owner = function(tasks) {
    var result = {};
    tasks.forEach(function(task){
        if (Meteor.userId() === task.owner && !task.checked ){
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



