'use strict';

//***************************************

// Main Application

// To get direct links to audio files in Google Drive:
// http://directlink.booogle.net/

//***************************************

angular.module('app', [
  'ui.router',
  'ngAnimate',
  'firebase'
])

  .run(
    ['$sce', '$timeout', '$rootScope', '$state', '$stateParams', '$window', '$firebaseAuth',
      function ($sce, $timeout, $rootScope, $state, $stateParams, $window, $firebaseAuth) {

        // It's very handy to add references to $state and $stateParams to the
        // $rootScope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.cache = {};

        $rootScope.config = {
          years: [
            {
              label: '2019-20',
              base: 'appZo91w4H8XgpPq7',
              key: 'keypZ19FEomq5gPWe',
              table: 'tblvkAveGOAX1czQY'
            },
            {
              label: 'SIPPS 2018-19',
              base: 'appi58GYei1Bsw8XB',
              key: 'keypZ19FEomq5gPWe',
              table: 'tblO1zaGQptBdjSns'
            },
            {
              label: '2018-19',
              base: 'appWyOO3dIQGwt4wm',
              key: 'keypZ19FEomq5gPWe',
              table: 'tblsufiLPPiGhgOWd'
            },
            {
              label: '2017-18',
              base: 'appKLD3WxfSgA0ad4',
              key: 'keypZ19FEomq5gPWe',
              table: 'tblgH4xE9mkglNUDV'
            },
          ],
          admins: {
            'jeff@albatrossdigital.com': {
              role: 'admin'
            },
            'lisa.perloff@gmail.com': {
              role: 'admin',
              teacher: 'lisa'
            },
            'virginia.mcmanus@lighthousecharter.org': {
              role: 'admin',
              teacher: 'virginia'
            },
            'ana.garcia@lighthousecharter.or': {
              role: 'admin',
              teacher: 'ana'
            },
            'daelana.burrell@lighthousecharter.org': {
              role: 'admin'
            },
            'tiffany.do@lighthousecharter.org': {
              role: 'admin'
            },
            'maricruz.martinez@lighthousecharter.org': {
              role: 'admin'
            },
            'robbie.torney@lighthousecharter.org': {
              role: 'admin'
            }
          },
          default_year: '2018-19'
        }

        // Handle year changing
        $rootScope.activeYear = $window.localStorage.getItem('sightWordsAssessmentYear') ? JSON.parse($window.localStorage.getItem('sightWordsAssessmentYear')) : $rootScope.config.years[0];
        $rootScope.setYear = function(year, e) {
          e.preventDefault();
          $window.localStorage.setItem('sightWordsAssessmentYear', JSON.stringify(year));
          $rootScope.activeYear = year;
          $state.go('students', {reload: true});
          $window.location.href = '/?'+ new Date().getTime() +'#/admin/students';
        }

        // Authentication
        $rootScope.auth = $firebaseAuth();
        var firebaseUser = $window.localStorage.getItem('firebaseUser');
        firebaseUser = firebaseUser ? JSON.parse(firebaseUser) : null;
        $rootScope.firebaseUser = firebaseUser;

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          firebaseUser = JSON.parse(JSON.stringify(firebaseUser));
          if (!firebaseUser) {
            role = null
          }
          else {
            var role;
            var role;
            if (firebaseUser && firebaseUser != null && firebaseUser.email && $rootScope.config.admins[firebaseUser.email] !== undefined) {
              role = $rootScope.config.admins[firebaseUser.email];
            }
            else {
              role = {
                role: 'student'
              };
            }
            firebaseUser.role = role;
            firebaseUser.time = new Date();
            firebaseUser.providerData = undefined;
          }

          if ($rootScope.firebaseUser != firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;
            $window.localStorage.setItem('firebaseUser', JSON.stringify(firebaseUser));
          }

          if (firebaseUser && $state.current.name === 'login') {
            if (role.role === 'admin') {
              var params = (role.teacher != undefined) ? { query: role.teacher } : {};
              $state.go('students', params);
            }
            else {
              $state.go('myFlashcards');
            }
          }
        });

        // Toggle topnav dropdowns
        var resetDropdown = function() {
          $rootScope.dropdown = {
            year: '',
            user: ''
          };
        }
        resetDropdown()

        $rootScope.toggleDropdown = function(key, e) {
          e.preventDefault();
          $rootScope.dropdown[key] = $rootScope.dropdown[key] === 'open' ? '' : 'open';
        }

        // Check login
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          if (toState.auth) {
            if (!$rootScope.firebaseUser) {
              event.preventDefault();
              $state.go('login', {msg: 'You need to login'});
            }
            if (toState.auth && toState.auth != $rootScope.firebaseUser.role.role) {
              event.preventDefault();
              $state.go('login', {msg: 'Sorry, you don\'t have access.'});
            }
          }
          resetDropdown();
        });
        $rootScope.logout = function(e) {
          $rootScope.firebaseUser = null;
          $window.localStorage.setItem('firebaseUser', null);
          $rootScope.auth.$signOut();
        }

        // Airtable
        var Airtable = require('airtable');
        $rootScope.Airtable = new Airtable({apiKey: $rootScope.activeYear.key}).base($rootScope.activeYear.base);

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
          .when('/admin', '/admin/students')
          .when('/me', '/my/flashcards')
          .otherwise('/');

        //////////////////////////
        // State Configurations //
        //////////////////////////
        $stateProvider

          .state("login", {
            url: '/?msg',
            templateUrl: 'views/login.html',
            controller: function ($scope, $rootScope, $state, $filter, $timeout) {
              $scope.msg = $state.params.msg;

              $scope.clickLogin = function(e) {
                e.preventDefault();
              }
            }
          })


          .state("students", {
            url: '/admin/students/:query',
            auth: 'admin',
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
                  {field: 'LastName', direction: 'asc'}
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

              $scope.query = $state.params.query;
              $scope.order = 'Last+Name';
              $scope.setSort = function(key, e) {
                e.preventDefault();
                key = key.replace(/ /g, '+');
                $scope.order = $scope.order == key ? '-' + key : key;
              }

              $scope.checkall = false;
              $scope.checkallClick = function() {
                var arr = $filter('filter')($scope.students, $scope.query);
                for (var i=0; i<arr.length; i++) {
                  arr[i].selected = $scope.checkall;
                }
              };
              $scope.print = function() {
                var students = [];
                for (var i=0; i<$scope.students.length; i++) {
                  if ($scope.students[i].selected) {
                    students.push($scope.students[i].id);
                  }
                }
                if (students.length > 10) {
                  if (!confirm("Printing over 10 students at a time doesn't always work.  If you run in to issues, wait one minute, click Back, and refresh the page. \n\n Are you sure you want to continue?")) {
                    return;
                  }
                }
                if (students.length) {
                  $state.go('printAssessment', {students: students.join(',')});
                }
                else {
                  alert('Please select at least one student');
                }
              }

            }
          })

          .state("editAssessment", {
            url: '/admin/student/:student/:type',
            auth: 'admin',
            template: '<assessment edit="true" type="type" student="student"></assessment>',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              $scope.type = $state.params.type;
              $scope.student = $state.params.student;
            }
          })

          .state("viewAssessment", {
            url: '/student/:student/:type',
            template: '<assessment type="type" student="student"></assessment>',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              $scope.type = $state.params.type;
              $scope.student = $state.params.student;
            }
          })

          .state("printAssessment", {
            url: '/print/:students',
            templateUrl: 'views/print.html',
            auth: 'admin',
            controller: function ($scope, $rootScope, $state, $filter, $http) {
              var students = $state.params.students.split(',');
              $scope.total = students.length;
              $scope.words = 'words';
              $scope.letters = 'letters';
              $scope.students = students;
              /*
              $scope.students = [];
              $scope.loading = true;
              var timeout = function() {
                if (students.length) {
                  $scope.progress = $scope.total - students.length;
                  var student = students.pop()
                  $scope.students.push(student);
                  setTimeout(timeout, 3000);
                }
                else {
                  $scope.loading = false;
                  $scope.$apply();
                }
              }
              timeout();
              */
            }
          })

          .state("myFlashcards", {
            url: '/my/flashcards/:type',
            template: '<assessment type="type" student="student" force-flashcards="true" ng-if="student"></assessment>',
            controller: function ($scope, $rootScope, $state, $filter, $timeout) {

              var formula = 'LOWER(Email) = "' + $rootScope.firebaseUser.email + '"';
              var students = [];
              $rootScope.Airtable('Students').select({
                filterByFormula: formula
              }).eachPage(function page(records, fetchNextPage) {
                records.forEach(function (record) {
                  record.fields.id = record.id;
                  students.push(record.fields);
                });
                fetchNextPage();
              }, function done(error) {
                if (students.length === 1) {
                  $scope.student = students[0].id;
                  $scope.type = students[0].TotalLetters >= 70 ? 'words' : 'letters';
                  $scope.$apply();
                }
              });

            }
          })

          .state("studentFlashcards", {
            url: '/flashcards/:student/:type',
            template: '<assessment type="type" student="student" force-flashcards="true"></assessment>',
            controller: function ($scope, $rootScope, $state, $filter, $timeout) {
              $scope.student = $state.params.student;
              $scope.type = $state.params.type;
            }
          })

          .state("studentSearch", {
            url: '/search',
            templateUrl: 'views/student-search.html',
            controller: function ($scope, $rootScope, $state, $filter, $timeout) {

              var formula = '{Grade} = 0';

              var data = [];
              $rootScope.Airtable('Students').select({
                filterByFormula: formula,
                sort: [
                  {field: 'LastName', direction: 'asc'}
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

              $scope.startsWith = function (actual, expected) {
                var lowerStr = (actual.FirstName + "").toLowerCase();
                return lowerStr.indexOf(expected.toLowerCase()) === 0;
              }

              $scope.go = function(student, e) {
                e.preventDefault();
                $state.go('studentFlashcards', {student: student.id, type: student.TotalLetters >= 70 ? 'words' : 'letters'});
              }

              $timeout(function() {
                document.getElementById('student-search').focus();
              },0);

            }
          });

      }
    ]
  );



