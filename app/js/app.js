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


      }
    ]
  )

  .config(
    ['$locationProvider', '$stateProvider', '$urlRouterProvider',
      function ($locationProvider, $stateProvider, $urlRouterProvider) {

        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyNIbNk17BU31gT8'}).base('appKLD3WxfSgA0ad4');

        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////

        // Use $urlRouterProvider to configure any redirects (when) and invalid
        // urls (otherwise).
        $urlRouterProvider
          .when('', '/students');

        //.otherwise(token ? '/sites' : '/start');

        //////////////////////////
        // State Configurations //
        //////////////////////////
        $stateProvider
          .state("students", {
            url: '/students',
            templateUrl: 'views/students.html',
            // auth: true,
            /*resolve: {
                cards: function ($stateParams, $rootScope, $http) {

                }
            },*/
            controller: function ($scope, $rootScope, $state, $filter, $http) {

              var data = [];
              base('Students').select({
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
          .state("assessment", {
            url: '/assessment/:student?assessment',
            templateUrl: 'views/assessment.html',
            // auth: true,
            /*resolve: {
             cards: function ($stateParams, $rootScope, $http) {

             }
             },*/
            controller: function ($scope, $rootScope, $state, $filter, $http) {


              var colors = [];
              base('Colors').select({
                sort: [
                  {field: 'ID', direction: 'asc'}
                ]
              }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                  record.fields.id = record.id;
                  colors.push(record.fields);
                });
                fetchNextPage();
              }, function done(error) {
                $scope.colors = colors;
                console.log(colors);
                $scope.$apply();
              });

              var words = [];
              base('Sight Words').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                  record.fields.id = record.id;
                  words.push(record.fields);
                });
                fetchNextPage();
              }, function done(error) {
                $scope.words = words;
                console.log(words);
                $scope.$apply();
              });


              base('Students').find($state.params.student, function(err, record) {
                record.fields.id = record.id;
                $scope.student = record.fields;
                $scope.$apply();

                var assessments = [];
                var disabledWords = {};
                base('Assessments').select({
                  filterByFormula: '{Student} = "' + record.fields.ID + '"'
                }).eachPage(function page(records, fetchNextPage) {
                  records.forEach(function (record) {
                    record.fields.id = record.id;
                    record.fields.Label = record.fields.Date;
                    assessments.push(record.fields);
                  });
                  fetchNextPage();
                }, function done(error) {
                  $scope.assessments = assessments;
                  for (var j=0; j<assessments.length; j++) {
                    for (var i = 0; i < assessments[j].Words.length; i++) {
                      disabledWords[assessments[j].Words[i]] = assessments[j].Color[0];
                    }
                  }
                  $scope.disabledWords = disabledWords;
                  $scope.$apply();
                });
              });




              $scope.toggleWord = function(word) {
                var index = $scope.assessment.Words.indexOf(word);
                if (index != -1) {
                  $scope.assessment.Words.splice(index, 1);
                }
                else {
                  $scope.assessment.Words.push(word);
                }
                //$scope.$apply();
              }

              $scope.setColor = function(color) {
                $scope.assessment.Color[0] = color.id;
                $scope.activeColor = color;
              }

              $scope.newAssessment = function() {
                $scope.assessment = {
                  Color: [false],
                  Words: [],
                  Student: [$state.params.student],
                  Date: new Date()
                };
              }

              $scope.clickAssessment = function(item) {
                if ($scope.assessment && item.id == $scope.assessment.id) {
                  $scope.assessment = null;
                }
                else {
                  for (var j=0; j<$scope.assessments.length; j++) {
                    if ($scope.assessments[j].id == item.id) {
                      $scope.assessments[j].Date = new Date($scope.assessments[j].Date);
                      $scope.assessment = $scope.assessments[j];
                      for (var i=0; i<$scope.color; i++) {
                        if ($scope.color[i].id == $scope.assessment.Color[0]) {
                          $scope.setColor($scope.color[i]);
                        }
                      }
                      console.log($scope.assessment);
                    }
                  }
                }
              }

              $scope.cancelAssessment = function() {
                $state.go('assessment', {student: $state.params.student});
                $scope.assessment = null;
              }

              $scope.saveAssessment = function(assessment) {
                if (!assessment.Color) {
                  alert('You must select a color');
                  return false;
                }
                //assessment.Date = new Date(assessment.Date).toISOString().slice(0, 10);
                if (assessment.id) {
                  var id = assessment.id;
                  delete assessment.id;
                  delete assessment.ID;
                  delete assessment.Label;
                  delete assessment['$$hashKey'];
                  base('Assessments').update(id, assessment, function(err, record) {
                    if (err) { console.error(err); return; }
                    $state.go('assessment', {student: $state.params.student});
                  });
                }
                base('Assessments').create(assessment, function(err, record) {
                  if (err) { console.log(err); return; }
                  $state.go('assessment', {student: $state.params.student});
                });
              }




            }
          })

      }
    ]
  );



