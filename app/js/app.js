'use strict';

//***************************************

// Main Application

// To get direct links to audio files in Google Drive:
// http://directlink.booogle.net/

//***************************************

angular.module('app', [
  'ui.router',
  'ngAnimate'
])

  .run(
    ['$sce', '$timeout', '$rootScope', '$state', '$stateParams',
      function ($sce, $timeout, $rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the
        // $rootScope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        var Airtable = require('airtable');
        $rootScope.Airtable = new Airtable({apiKey: 'keyNIbNk17BU31gT8'}).base('appKLD3WxfSgA0ad4');


      }
    ]
  )

  .config(
    ['$locationProvider', '$stateProvider', '$urlRouterProvider',
      function ($locationProvider, $stateProvider, $urlRouterProvider) {



        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid
        // urls (otherwise).
        $urlRouterProvider
          .when('/admin', '/admin/students');

        //.otherwise(token ? '/sites' : '/start');

        //////////////////////////
        // State Configurations //
        //////////////////////////
        $stateProvider
          .state("students", {
            url: '/admin/students',
            templateUrl: 'views/students.html',
            // auth: true,
            /*resolve: {
                cards: function ($stateParams, $rootScope, $http) {

                }
            },*/
            controller: function ($scope, $rootScope, $state, $filter, $http) {

              var data = [];
              $rootScope.Airtable('Students').select({
                sort: [
                  {field: 'Last Name', direction: 'asc'}
                ]
              }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                  record.fields.id = record.id;
                  data.push(record.fields);
                });

                fetchNextPage();
              }, function done(error) {
                $scope.students = data;
                $scope.$apply();
              });

            }
          })

          .state("editAssessment", {
            url: '/admin/student/:student/:type',
            template: '<div assessment edit="true" type="type" student="student"></div>',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              $scope.type = $state.params.type;
              $scope.student = $state.params.student;
            }
          })

          .state("viewAssessment", {
            url: '/student/:student/:type',
            template: '<div assessment type="type" student="student"></div>',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              $scope.type = $state.params.type;
              $scope.student = $state.params.student;
            }
          })

          .state("printAssessment", {
            url: '/print/:students',
            templateUrl: 'views/print.html',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              $scope.students = $state.params.students.split(',');
            }
          })

      }
    ]
  );



