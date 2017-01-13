import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'; 
import { Tasks } from '../api/tasks.js';
import { Ars } from '../api/ars.js';
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
            data: manipulateArs_Done(Ars.find())
        }]
    };
};

var manipulateArs_Done= function(ars) {
    var result = [["Done", 0],["In process", 0],["Open", 0]];
    ars.forEach(function(ar){
        if (Meteor.user().username === ar.owner) {
            if (ar.status === "Done") {
                result[0][1] ++;
            } else if (ar.status === "In process"){
                result[1][1] ++;
            }
            else {
                result[2][1] ++;
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
            data: manipulateArs_owner(Ars.find())
        }]
    };
};

var manipulateArs_owner = function(ars) {
    var result = {};
    ars.forEach(function(ar){
        if (Meteor.user().username === ar.owner ){        //&& !task.checked
            if (result[ar.description]) {
                result[ar.description] ++;
            } else {
                result[ar.description] = 1;
            }
        }
    });
    result = $.map(result, function(value, index) {
        return [[index,value]];
    });
    return result;
};

Template.Statistics.BarChart = function() {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
   
    }};

///due date and owner changes - bar chart
/*
Template.Statistics.BarChart = function() {
    return {
        chart: {
            type: 'column',
            inverted: true
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
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
            y: 25,
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
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
   
    }};
    */