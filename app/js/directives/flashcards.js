angular.module('app')

  .directive('flashcards', function($rootScope, $state, $sce, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        cards: '=',
        colors: '='
      },
      templateUrl: 'views/flashcards.html',
      link: function($scope, $element, $attrs, $window) {

        // var url  = 'https://docs.google.com/spreadsheets/d/1pyCptrdv3-laxJPSbXda_bfC5HiyOlpeuP_LVgBVuxA/pubhtml';
        // url = $state.params.doc;
        // var matched = url.match(/https:\/\/docs.google.com\/spreadsheets\/d\/(.+)\/pubhtml/);
        // var id = matched[1];

        // var sheet = $state.params.sheet ? $state.params.sheet : 1; // @todo
        // var doc = $state.params.doc;
        // var feed = 'https://spreadsheets.google.com/feeds/list/'+ doc +'/'+ sheet +'/public/values?alt=json';
        //
        // $http({
        //   method: 'GET',
        //   url: feed
        // }).then(function successCallback(response) {
        //   var data = response.data.feed.entry;
        //   var out = [];
        //   for (var i=0; i<data.length; i++) {
        //     out.push({
        //       question: data[i]['gsx$question']['$t'],
        //       color: colors[data[i]['gsx$color']['$t']] ? colors[data[i]['gsx$color']['$t']] : 'white',
        //       recording: data[i]['gsx$recording'] ? data[i]['gsx$recording']['$t'] : null,
        //       answer: data[i]['gsx$answer'] ? data[i]['gsx$answer']['$t'] : null,
        //       pronunciation: data[i]['gsx$pronunciation'] ? data[i]['gsx$pronunciation']['$t'] : null
        //     });
        //   }
        //   out = shuffle(out);
        //   resetList(out);
        //
        // }, function errorCallback(response) {
        //   // called asynchronously if an error occurs
        //   // or server returns response with an error status.
        // });

        console.log($attrs, $scope);


        // Handle colors
        // @todo
        // var color = '';
        // for (var i=0; i<$scope.colors.length; i++) {
        //   if ($scope.colors[i].id == $scope.assessment.Color[0]) {
        //     color = $scope.colors[i];
        //     break;
        //   }
        // }

        // Mapping
        var out = [];
        for (var i=0; i<$scope.cards.length; i++) {
          out.push({
            question: $scope.cards[i].Item,
            color: null,//color,
            recording: $scope.cards[i].Recording,
            answer: null,
            pronunciation: null
          });
        }
        out = shuffle(out);

        var oAudio = document.getElementById('myaudio');

        var go = $scope.go = function(delta) {
          $scope.i += delta;
          if ($scope.i < 0) {
            $scope.i = 0;
          }
          if ($scope.i >= $scope.total) {
            $scope.stage = 'done';
          }
          else {
            $scope.item = $scope.data[$scope.i];
            $scope.stage = 'question';
            oAudio.pause();
            oAudio.src = $scope.item.recording;
          }
        }

        var play = $scope.play = function() {
          $scope.stage = 'answer';
          oAudio.play();
        }

        var resetList = function(data) {
          $scope.data = data;
          $scope.total = data.length;
          $scope.i = 0;
          go(0);
        }
        resetList(out);


        $scope.answers = {
          correct: 0,
          incorrect: 0
        }
        var answer = $scope.answer = function(status) {
          $scope.item.status = status;
          $scope.answers[status] ++;
          go(1);
        }

        $scope.filteredList = function(status) {
          if ($scope.answers[status] > 0) {
            var data = $scope.data.filter(function (record) {
              return (record.status == 'incorrect');
            });
            resetList(data);
          }

        }

        function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }

      }
    };
  });



