import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'; 
import { Ars } from '../api/ars.js';
import { Changes } from '../api/changes.js';

import './statistics-manager.html';

///due date and owner changes - bar chart

Template.ManagerStatistics.barchart = function() {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: manipulateDescription(Ars.find())
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 5,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Due date changed',
            data: manipulateduedate(Ars.find(), Changes.find())
        }, {
            name: 'Owner changed',
            data: manipulateowner(Ars.find(), Changes.find())
        },
        ]
    }};


var manipulateduedate = function(ars, changes) {
    var resultduedate = [];
    var dataPoint = 0 ;
    ars.forEach(function(ar){
        dataPoint = 0 ;
        changes.forEach(function(change){
            if (ar._id == change.ArID ) { // this is the same AR
                if (change.dueDateChanged == true) {
                    dataPoint ++ ;
                }
            }
            })
            resultduedate.push(dataPoint);
    })
    return resultduedate;
};

var manipulateowner = function(ars, changes) {
    var resultowner = [];
    var dataPoint = 0 ;
    ars.forEach(function(ar){
        dataPoint = 0 ;
        changes.forEach(function(change){
            if (ar._id == change.ArID ) { // this is the same AR
                if (change.ownerChanged == true) {
                    dataPoint ++ ;
                }
            }
        })
        resultowner.push(dataPoint);
    })
    return resultowner;
};


//x-axis
var manipulateDescription = function(ars) {
    var result = [];
    ars.forEach(function(ar){
            var dataPoint = [ar.description];
            result.push(dataPoint);
    })
    return result;
};
    