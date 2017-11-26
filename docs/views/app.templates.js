angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/done.html',
    "<div class=\"row text-center\"><div class=\"col-xs-12 col-sm-8 col-sm-push-2 col-lg-6 col-lg-push-3\"><div class=\"panel panel-default flashcard\" style=\"background: {{color}}\"><div class=\"panel-body\"><i class=\"fa fa-4x fa-smile-o\"></i></div></div></div></div><style>.flashcard {\n" +
    "        margin: 100px;\n" +
    "        font-size: 2em;\n" +
    "    }</style>"
  );


  $templateCache.put('views/flashcards.html',
    "<audio id=\"myaudio\"><source ng-src=\"\"></source></audio><div class=\"row\"><div class=\"col-xs-12 col-sm-8 col-sm-push-2 col-lg-6 col-lg-push-3\"><div class=\"flip-container\" ng-if=\"stage != 'done'\" ng-class=\"stage == 'answer' ? 'hover' : ''\"><div class=\"flipper\"><div class=\"front question\"><div class=\"panel panel-default flashcard\" style=\"background: {{item.color}}\"><div class=\"panel-body\"><h1 class=\"text-center\">{{item.question}}</h1><div class=\"text-center\"><a ng-click=\"play()\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(-1)\" class=\"pull-left\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(1)\" class=\"pull-right\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></a></div></div></div></div><div class=\"back answer\"><div class=\"panel panel-default flashcard\" style=\"background: {{item.color}}\"><div class=\"panel-body text-center\"><h2 class=\"text-center\">{{item.answer || item.question}}</h2><div class=\"btn-group btn-group-lg\" role=\"group\" aria-label=\"...\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"answer('incorrect')\"><i class=\"fa fa-thumbs-down text-danger\"></i></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"play()\"><i class=\"fa fa-refresh\"></i></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"answer('correct')\"><i class=\"fa fa-thumbs-up text-success\"></i></button></div><div class=\"text-center\"><a ng-click=\"go(-1)\" class=\"pull-left\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(1)\" class=\"pull-right\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></a></div></div></div></div></div></div><div ng-if=\"stage == 'done'\"><div class=\"panel panel-default flashcard text-center\" style=\"background: {{item.color}}\"><div class=\"panel-body\"><i class=\"fa fa-4x fa-smile-o\"></i></div></div><div class=\"row\"><div class=\"col-xs-6 text-center clickable\" ng-click=\"filteredList('incorrect')\"><h1><i class=\"fa fa-thumbs-down text-danger\"></i></h1><h2 ng-repeat=\"record in data\" ng-if=\"record.status == 'incorrect'\">{{record.question}}</h2></div><div class=\"col-xs-6 text-center\"><h1><i class=\"fa fa-thumbs-up text-success\"></i></h1><h2 ng-repeat=\"record in data\" ng-if=\"record.status == 'correct'\">{{record.question}}</h2></div></div></div></div></div><footer><!--<div class=\"footer-right\">\n" +
    "        <span class=\"text-success\">Right: {{answers.correct}}</span>\n" +
    "        &nbsp;-&nbsp;\n" +
    "        <span class=\"text-danger\">Wrong: {{answers.incorrect}}</span>\n" +
    "    </div>--><div class=\"footer-left\" ng-if=\"i < total\">Card {{i+1}} of {{total}}</div></footer><style>@import url('https://fonts.googleapis.com/css?family=Muli');\n" +
    "\n" +
    "    .clickable {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .flashcard {\n" +
    "        margin: 100px 0;\n" +
    "        font-size: 2em;\n" +
    "        min-height: 150px;\n" +
    "    }\n" +
    "\n" +
    "    .flashcard h1 {\n" +
    "        font-family: 'Muli', serif;\n" +
    "        font-size: 5em;\n" +
    "        line-height: 1.4em;\n" +
    "    }\n" +
    "\n" +
    "    .flashcard h2 {\n" +
    "        font-family: 'Muli', serif;\n" +
    "        font-weight: bold;\n" +
    "        font-size: 2em;\n" +
    "        line-height: 1.4em;\n" +
    "    }\n" +
    "\n" +
    "    footer div {\n" +
    "        position: absolute;\n" +
    "        bottom: 5px;\n" +
    "    }\n" +
    "    footer .footer-right {\n" +
    "        right: 20px;\n" +
    "    }\n" +
    "    footer .footer-left {\n" +
    "        left: 20px;\n" +
    "    }\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "     /* entire container, keeps perspective */\n" +
    "     .flip-container {\n" +
    "         perspective: 1000px;\n" +
    "     }\n" +
    "    /* flip the pane when hovered */\n" +
    "    .flip-container.hover .flipper {\n" +
    "        transform: rotateY(180deg);\n" +
    "    }\n" +
    "\n" +
    "    .flip-container, .front, .back {\n" +
    "        width: 100%;\n" +
    "        height: 400px;\n" +
    "    }\n" +
    "\n" +
    "    .back {\n" +
    "        overflow-y: auto;\n" +
    "    }\n" +
    "\n" +
    "    /* flip speed goes here */\n" +
    "    .flipper {\n" +
    "        transition: 0.6s;\n" +
    "        transform-style: preserve-3d;\n" +
    "\n" +
    "        position: relative;\n" +
    "    }\n" +
    "\n" +
    "    /* hide back of pane during swap */\n" +
    "    .front, .back {\n" +
    "        backface-visibility: hidden;\n" +
    "\n" +
    "        position: absolute;\n" +
    "        top: 0;\n" +
    "        left: 0;\n" +
    "    }\n" +
    "\n" +
    "    /* front pane, placed above back */\n" +
    "    .front {\n" +
    "        z-index: 2;\n" +
    "        /* for firefox 31 */\n" +
    "        transform: rotateY(0deg);\n" +
    "    }\n" +
    "\n" +
    "    /* back, initially hidden pane */\n" +
    "    .back {\n" +
    "        transform: rotateY(180deg);\n" +
    "    }\n" +
    "\n" +
    "    .btn-toolbar-legend {\n" +
    "        margin-bottom: 1em;\n" +
    "    }</style>"
  );

}]);
