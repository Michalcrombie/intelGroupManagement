import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'; 
import { Ars } from '../api/ars.js';
import './statistics.html';
import './statistics-manager.js';


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
