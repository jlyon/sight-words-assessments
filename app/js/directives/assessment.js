angular.module('app')

  .directive('assessment', function($rootScope, $state, $sce, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        type: '=',
        student: '=',
        assessment: '=',
        edit: '=',
        print: '@'
      },
      templateUrl: 'views/assessment.html',
      link: function($scope, $element, $attrs, $window) {

        $scope.type = $scope.type.replace(/\b\S/g, function(t) { return t.toUpperCase() });
        $scope.show = false;

        $timeout(function(){
          $scope.link = window.location.href.replace('/admin', '');
        }, 0);

        var colors = [];
        $rootScope.Airtable('Colors').select({
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
          $scope.$apply();
        });

        if ($rootScope.cache[$scope.type] == undefined) {
          var items = [];
          $rootScope.Airtable($scope.type).select({
            sort: [
              {field: 'ID', direction: 'asc'}
            ]
          }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
              record.fields.id = record.id;
              items.push(record.fields);
            });
            fetchNextPage();
          }, function done(error) {
            $rootScope.cache[$scope.type] = items;
            $scope.items = items;
            $scope.$apply();
          });
        }
        else {
          $scope.items = $rootScope.cache[$scope.type];
        }

        if ($rootScope.cache[$scope.type + ' Groups'] == undefined) {
          var groups = [];
          $rootScope.Airtable($scope.type + ' Groups').select({
            sort: [
              {field: 'Order', direction: 'asc'}
            ]
          }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
              record.fields.id = record.id;
              groups.push(record.fields);
            });
            fetchNextPage();
          }, function done(error) {
            $rootScope.cache[$scope.type + ' Groups'] = groups;
            $scope.groups = groups;
            $scope.$apply();
          });
        }
        else {
          $scope.groups = $rootScope.cache[$scope.type + ' Groups'];
        }

        var getStudents = function(cb, assessment) {
          var studentID = typeof $scope.student === 'string' ? $scope.student : $scope.student.id;
          $rootScope.Airtable('Students').find(studentID, function(err, record) {
            record.fields.id = record.id;
            $scope.student = record.fields;
            $scope.show = $scope.print ? false : true;
            $scope.$apply();

            var assessments = [];
            var disabledItems = {};
            var sum = 0;
            $rootScope.Airtable($scope.type + ' Assessments').select({
              filterByFormula: '{Student} = "' + record.fields.ID + '"',
              sort: [
                {field: 'Date', direction: 'asc'}
              ]
            }).eachPage(function page(records, fetchNextPage) {
              records.forEach(function (record) {
                record.fields.id = record.id;
                sum += record.fields.Items ? record.fields.Items.length : 0;
                record.fields.sum = sum;
                assessments.push(record.fields);
              });
              fetchNextPage();
            }, function done(error) {
              $scope.show = assessments.length ? true : false;
              $scope.assessments = assessments;
              for (var j=0; j<assessments.length; j++) {
                if (assessments[j].Items) {
                  for (var i = 0; i < assessments[j].Items.length; i++) {
                    disabledItems[assessments[j].Items[i]] = assessments[j].Color[0];
                  }
                }
              }
              $scope.disabledItems = disabledItems;
              if (cb) {
                cb(assessment, assessments);
              }
              $scope.$apply();
            });
          });
        }
        getStudents();

        $scope.linkClick = function ($event) {
          $event.target.select();
        };

        $scope.toggleWord = function(word) {
          var index = $scope.assessment.Items.indexOf(word);
          if (index != -1) {
            $scope.assessment.Items.splice(index, 1);
          }
          else {
            $scope.assessment.Items.push(word);
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
            Items: [],
            Student: [$scope.student],
            Date: new Date()
          };
        }

        $scope.clickAssessment = function(item, e) {
          if (!$scope.edit) {
            return;
          }
          if ($scope.assessment && item.id == $scope.assessment.id) {
            $scope.assessment = null;
          }
          else {
            for (var j=0; j<$scope.assessments.length; j++) {
              if ($scope.assessments[j].id == item.id) {
                $scope.assessments[j].Date = new Date($scope.assessments[j].Date);
                $scope.assessment = $scope.assessments[j];
                for (var i=0; i<$scope.colors.length; i++) {
                  if ($scope.colors[i].id == $scope.assessment.Color[0]) {
                    $scope.setColor($scope.colors[i]);
                  }
                }
              }
            }
          }
        }

        $scope.cancelAssessment = function() {
          $scope.assessment = null;
        }

        $scope.saveAssessment = function(assessment) {
          if (!assessment.Color || !assessment.Color[0]) {
            alert('You must select a color');
            return false;
          }
          if (assessment.id) {
            var id = assessment.id;
            delete assessment.id;
            delete assessment.ID;
            delete assessment['$$hashKey'];
            delete assessment.sum;
            $rootScope.Airtable($scope.type + ' Assessments').update(id, assessment, function(err, record) {
              if (err) { alert('There was a problem saving this assessment!');console.error(err); return; }
              $scope.assessment = null;
              getStudents(saveAssessmentCallback, assessment);
            });
          }
          else {
            assessment.Date = new Date(assessment.Date).toISOString().slice(0, 10);
            assessment.Student[0] = typeof assessment.Student[0] == 'object' ? assessment.Student[0].id : assessment.Student[0];
            $rootScope.Airtable($scope.type + ' Assessments').create(assessment, function (err, record) {
              if (err) {
                alert('There was a problem saving this assessment!');
                console.log(err);
                return;
              }
              $scope.assessment = null;
              getStudents(saveAssessmentCallback, assessment);
            });
          }

        }

        var saveAssessmentCallback = function (assessment, assessments) {
          var studentEdit = {};
          studentEdit['Last' + $scope.type + 'Assessment'] = assessment.Date;
          var last = assessments.pop();
          studentEdit['Total' + $scope.type] = last.sum;
          $rootScope.Airtable('Students').update($scope.student.id, studentEdit, function(err, record) {
            if (err) { console.log(err); return; }
            $scope.assessment = null;
            getStudents();
          });
        }

        $scope.showFlashcards = false;
        $scope.flashcardPages = 2;
        $scope.toggleShowFlashcards = function() {
          $scope.showFlashcards = $scope.showFlashcards ? false : true;
          $scope.updateFlashcards($scope.flashcardPages);
        }

        $scope.updateFlashcards = function(pages) {
          var items = [];
          var count = 0;
          for (var i=0; i<$scope.items.length; i++) {
            if(count < pages*10 && !$scope.disabledItems[$scope.items[i].id]){
              items.push($scope.items[i]);
              count++;
            }
          }
          $scope.flashcards = items;
        }



      }
    };
  });



