angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/assessment.html',
    "<!--<div ng-if=\"colors && items && assessments\">--><div><div ng-class=\"show && student['FirstName'] ? '' : 'force-no-print'\" ng-if=\"!toggle.print && !toggle.online\"><h2 ng-if=\"student.FirstName\">{{student['FirstName']}} {{student['LastName']}}'s {{type}} Progress <small>{{student.Crew}}</small></h2><div class=\"form-group row no-print\" ng-if=\"edit\"><div class=\"col-sm-12\"><div class=\"input-group\" style=\"max-width: 500px\"><span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-fw fa-link\"></i></span> <input type=\"text\" class=\"form-control\" aria-describedby=\"basic-addon1\" ng-model=\"link\" ng-click=\"linkClick($event)\"></div></div></div><span ng-repeat=\"color in colors\"><style>.color-{{color.id}} {\n" +
    "      background-color: #{{color.Code}} !important;\n" +
    "    }</style></span><div class=\"row assessments\"><div class=\"col-xs-12 col-sm-7 col-lg-4\"><!--<table ng-if=\"assessments.length\" class=\"table table-striped\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"color-swatch\"><span></span></th>\n" +
    "        <th class=\"date\">Date</th>\n" +
    "        <th>Total</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"item in assessments\">\n" +
    "        <td class=\"color-swatch\"><span class=\"color-{{item.Color[0]}}\">&nbsp;</span></td>\n" +
    "        <td class=\"date\">{{item.Date | date:'MMMM d yyyy'}}</td>\n" +
    "        <td>{{item.sum || 0}}</td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>--><div class=\"list-group\" ng-if=\"assessments\"><a ng-repeat=\"item in assessments\" title=\"Edit this assessment\" ng-click=\"clickAssessment(item)\" ng-class=\"assessment && assessment.id == item.id ? 'active' : ''\" class=\"list-group-item list-group-item list-group-item-action\"><span class=\"color-swatch color-{{item.Color[0]}}\" class=\"btn\"></span> {{item.Date | date:'MMMM d yyyy'}} <span class=\"badge label label-success pull-right\">{{item.sum || 0}}</span></a></div></div><div class=\"col-xs-6 no-print\" ng-if=\"!assessment && edit\"></div></div><p class=\"no-print\" ng-if=\"!assessment && edit\"><button class=\"btn btn-primary\" ng-click=\"newAssessment()\"><i class=\"fa fa-fw fa-plus-circle\"></i>Create New Assessment</button> <button class=\"btn btn-default\" ng-click=\"toggleFlashcards('print')\"><i class=\"fa fa-fw fa-th\"></i>Print Flashcards</button> <button class=\"btn btn-default\" ng-click=\"toggleFlashcards('online')\"><i class=\"fa fa-fw fa-window-maximize\"></i>Online Flashcards</button></p><form class=\"assessment\" ng-class=\"!assessment ? 'form-disabled' : ''\"><div ng-if=\"assessment\" class=\"no-print\"><h2 ng-if=\"assessment.id\">Edit Assessment from {{assessment.Date | date:'MMMM d yyyy'}}</h2><h2 ng-if=\"!assessment.id\">Create new Assessment</h2><div class=\"form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Date</label><div class=\"col-sm-4\"><input type=\"date\" class=\"form-control\" ng-model=\"assessment.Date\"></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Color</label><div class=\"col-sm-10 list-colors\"><a class=\"btn btn-default\" ng-repeat=\"color in colors\" title=\"{{color.Label}}\" ng-click=\"setColor(color)\" ng-class=\"assessment.Color[0] == color.id ? 'active' : ''\" ng-style=\"{backgroundColor: '#' + color.Code}\">&nbsp;</a></div></div><style>.list-items .active{\n" +
    "        background-color: #{{activeColor.Code}} !important;\n" +
    "      }</style></div><div class=\"list-group list-items\" ng-repeat=\"group in groups\" ng-if=\"assessment || assessments.length\"><h4>{{group.Label}}</h4><a ng-repeat=\"item in items\" ng-if=\"item.Group[0] == group.id\" class=\"btn btn-default\" ng-click=\"toggleWord(item.id)\" ng-class=\"assessment && assessment.Items.indexOf(item.id) != -1 ? 'active' : (disabledItems[item.id] ? 'disabled color-' + disabledItems[item.id] : '' )\">{{item.Item}}</a></div><div ng-if=\"assessment\" class=\"no-print form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div></form></div><div class=\"list-group list-items\" ng-if=\"toggle.print\"><div class=\"no-print\"><h2>Print {{type}} Flashcards for {{student['FirstName']}} {{student['LastName']}}</h2><p><button class=\"btn btn-primary\" ng-click=\"toggleFlashcards('print')\"><i class=\"fa fa-fw fa-chevron-left\"></i>Back to Assessments</button></p><hr><form class=\"form-inline\"><div class=\"form-group\"><label>Number of pages</label><input type=\"text\" class=\"form-control\" ng-model=\"flashcardPages\"></div><button class=\"btn btn-default\" ng-click=\"updateFlashcards(flashcardPages)\">Update</button></form><hr><p>Showing {{flashcards.length}} flashcards</p></div><div class=\"flashcards\"><div ng-repeat=\"item in flashcards\" class=\"flashcard\" ng-click=\"toggleWord(item.id)\"><span class=\"color-swatch color-{{item.Color[0]}}\" class=\"btn\"></span><div class=\"student-name\">{{student['FirstName']}} {{student['LastName']}}</div><div class=\"content\">{{item.Item}}</div></div></div></div><div ng-if=\"toggle.online\"><flashcards cards=\"flashcards\" colors=\"color\"></flashcards></div></div>"
  );


  $templateCache.put('views/flashcards.html',
    "<div><!-- This is added in index.html --><!--<audio id=\"myaudio\">--><!--<source ng-src=\"\">--><!--</audio>--><div class=\"row\"><div class=\"col-xs-12 col-sm-8 col-sm-push-2 col-lg-6 col-lg-push-3\"><div class=\"flip-container\" ng-if=\"stage != 'done'\" ng-class=\"stage == 'answer' ? 'hover' : ''\"><div class=\"flipper\"><div class=\"front question\"><div class=\"panel panel-default flashcard\" style=\"background: {{item.color}}\"><div class=\"panel-body\"><h1 class=\"text-center\">{{item.question}}</h1><div class=\"text-center\"><a ng-click=\"play()\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(-1)\" class=\"pull-left\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(1)\" class=\"pull-right\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></a></div></div></div></div><div class=\"back answer\"><div class=\"panel panel-default flashcard\" style=\"background: {{item.color}}\"><div class=\"panel-body text-center\"><h2 class=\"text-center\">{{item.answer || item.question}}</h2><div class=\"btn-group btn-group-lg\" role=\"group\" aria-label=\"...\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"answer('incorrect')\"><i class=\"fa fa-thumbs-down text-danger\"></i></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"play()\"><i class=\"fa fa-refresh\"></i></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"answer('correct')\"><i class=\"fa fa-thumbs-up text-success\"></i></button></div><div class=\"text-center\"><a ng-click=\"go(-1)\" class=\"pull-left\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></a> <a ng-click=\"go(1)\" class=\"pull-right\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></a></div></div></div></div></div></div><div ng-if=\"stage == 'done'\"><div class=\"panel panel-default flashcard text-center\" style=\"background: {{item.color}}\"><div class=\"panel-body\"><i class=\"fa fa-4x fa-smile-o\"></i></div></div><div class=\"row\"><div class=\"col-xs-6 text-center clickable\" ng-click=\"filteredList('incorrect')\"><h1><i class=\"fa fa-thumbs-down text-danger\"></i></h1><h2 ng-repeat=\"record in data\" ng-if=\"record.status == 'incorrect'\">{{record.question}}</h2></div><div class=\"col-xs-6 text-center\"><h1><i class=\"fa fa-thumbs-up text-success\"></i></h1><h2 ng-repeat=\"record in data\" ng-if=\"record.status == 'correct'\">{{record.question}}</h2></div></div></div></div></div><footer><!--<div class=\"footer-right\">\n" +
    "      <span class=\"text-success\">Right: {{answers.correct}}</span>\n" +
    "      &nbsp;-&nbsp;\n" +
    "      <span class=\"text-danger\">Wrong: {{answers.incorrect}}</span>\n" +
    "  </div>--><div class=\"footer-left\" ng-if=\"i < total\">Card {{i+1}} of {{total}}</div><div class=\"footer-right\"><a ng-click=\"back()\" href=\"#\">Back</a></div></footer><style>@import url('https://fonts.googleapis.com/css?family=Didact+Gothic');\n" +
    "\n" +
    "  .clickable {\n" +
    "    cursor: pointer;\n" +
    "  }\n" +
    "\n" +
    "  .flashcard {\n" +
    "    margin: 100px 0;\n" +
    "    font-size: 2em;\n" +
    "    min-height: 150px;\n" +
    "  }\n" +
    "\n" +
    "  .flashcard h1 {\n" +
    "    font-family: 'Didact Gothic', serif;\n" +
    "    font-size: 5em;\n" +
    "    line-height: 1.4em;\n" +
    "    font-weight: bold;\n" +
    "  }\n" +
    "\n" +
    "  .flashcard h2 {\n" +
    "    font-family: 'Didact Gothic', serif;\n" +
    "    font-weight: bold;\n" +
    "    font-size: 2em;\n" +
    "    line-height: 1.4em;\n" +
    "  }\n" +
    "\n" +
    "  footer div {\n" +
    "    position: absolute;\n" +
    "    bottom: 5px;\n" +
    "  }\n" +
    "  footer .footer-right {\n" +
    "    right: 20px;\n" +
    "  }\n" +
    "  footer .footer-left {\n" +
    "    left: 20px;\n" +
    "  }\n" +
    "\n" +
    "\n" +
    "  /* entire container, keeps perspective */\n" +
    "  .flip-container {\n" +
    "    perspective: 1000px;\n" +
    "  }\n" +
    "  /* flip the pane when hovered */\n" +
    "  .flip-container.hover .flipper {\n" +
    "    transform: rotateY(180deg);\n" +
    "  }\n" +
    "\n" +
    "  .flip-container, .front, .back {\n" +
    "    width: 100%;\n" +
    "    height: 400px;\n" +
    "  }\n" +
    "\n" +
    "  .back {\n" +
    "    overflow-y: auto;\n" +
    "  }\n" +
    "\n" +
    "  /* flip speed goes here */\n" +
    "  .flipper {\n" +
    "    transition: 0.6s;\n" +
    "    transform-style: preserve-3d;\n" +
    "\n" +
    "    position: relative;\n" +
    "  }\n" +
    "\n" +
    "  /* hide back of pane during swap */\n" +
    "  .front, .back {\n" +
    "    backface-visibility: hidden;\n" +
    "\n" +
    "    position: absolute;\n" +
    "    top: 0;\n" +
    "    left: 0;\n" +
    "  }\n" +
    "\n" +
    "  /* front pane, placed above back */\n" +
    "  .front {\n" +
    "    z-index: 2;\n" +
    "    /* for firefox 31 */\n" +
    "    transform: rotateY(0deg);\n" +
    "  }\n" +
    "\n" +
    "  /* back, initially hidden pane */\n" +
    "  .back {\n" +
    "    transform: rotateY(180deg);\n" +
    "  }\n" +
    "\n" +
    "  .btn-toolbar-legend {\n" +
    "    margin-bottom: 1em;\n" +
    "  }</style></div>"
  );


  $templateCache.put('views/login.html',
    "<center><h1>Welcome to Lodestar Flashcards</h1><p ng-if=\"!msg\">Please login using your Gmail account.</p><div class=\"alert alert-warning\" ng-if=\"msg\">{{msg}}</div><p class=\"btn-login\"><a href=\"#\" ng-click=\"auth.$signInWithPopup('google');$event.preventDefault();\"><img src=\"images/btn_google_signin_dark_normal_web.png\" alt=\"Login with Google\"></a></p><p><a href=\"#\" ui-sref=\"studentSearch\">Kindergarten Login</a></p></center><style>.btn-login {\n" +
    "    margin: 20px 0 50px 0;\n" +
    "  }</style>"
  );


  $templateCache.put('views/print.html',
    "<div class=\"print\"><div class=\"alert alert-info no-print\" role=\"alert\"><h1 ng-class=\"loading ? '' : 'force-no-print'\" class=\"no-print\"><i class=\"fa fa-fw fa-spinner fa-spin\"></i>Loading {{total}} students...</h1><div ng-class=\"loading ? 'force-no-print' : ''\"><p>This will print Words and Letters reports for {{total}} students and will require at most <strong>{{total*2}}</strong> sheets of paper</p><p><button onclick=\"window.print()\" class=\"btn btn-primary\"><i class=\"fa fa-fw fa-print\"></i>Print all</button></p></div></div><div ng-repeat=\"student in students\"><div assessment type=\"words\" student=\"student\" print=\"true\"></div><div assessment type=\"letters\" student=\"student\" print=\"true\"></div></div></div>"
  );


  $templateCache.put('views/student-search.html',
    "<div class=\"row\"><div class=\"col-md-6\"><input id=\"student-search\" class=\"student-search input-lg\" ng-model=\"query\" placeholder=\"Your name\"></div></div><div class=\"row\" ng-if=\"query.length\"><div class=\"col-sm-4 student\" ng-click=\"go(student, $event)\" ng-repeat=\"student in students | filter: query\"><div class=\"panel panel-default\"><div class=\"panel-body\">{{student.FirstName}} {{student.LastName}}</div></div></div></div><style>.student-search {\n" +
    "    margin-bottom: 2em;\n" +
    "  }\n" +
    "  .student {\n" +
    "    font-size: 1.3em;\n" +
    "  }\n" +
    "  .student:hover {\n" +
    "    cursor: pointer;\n" +
    "  }</style>"
  );


  $templateCache.put('views/students.html',
    "<form class=\"form-inline\"><div class=\"form-group no-print\"><button class=\"btn btn-primary\" ng-click=\"print()\"><i class=\"fa fa-fw fa-print\"></i>Print Selected</button></div><div class=\"form-group\"><input class=\"form-control\" ng-model=\"query\" placeholder=\"Student Name or Crew\"></div></form><hr class=\"no-print\"><table class=\"table table-striped\"><thead><tr><th><input type=\"checkbox\" ng-model=\"checkall\" ng-click=\"checkallClick()\"></th><th><a ng-click=\"setSort('LastName', $event)\" href=\"#\">Name</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('ReadingTeacher', $event)\" href=\"#\">Teacher</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('Crew', $event)\" href=\"#\">Crew</a></th><th><a ng-click=\"setSort('LastLettersAssessment', $event)\" href=\"#\">Letters</a></th><th><a ng-click=\"setSort('LastWordsAssessment', $event)\" href=\"#\">Words</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('TotalLetters', $event)\" href=\"#\">Total Letters</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('TotalWords', $event)\" href=\"#\">Total Words</a></th></tr></thead><tbody><tr ng-repeat=\"student in students | filter: query | orderBy: order\"><td><input type=\"checkbox\" ng-model=\"student.selected\"></td><td>{{student['LastName']}}, {{student['FirstName']}}</td><td class=\"hidden-xs-down\">{{student.ReadingTeacher}}</td><td class=\"hidden-xs-down\">{{student.Crew}}</td><td><a ui-sref=\"editAssessment({type: 'letters', student: student.id})\"><span ng-if=\"student['LastLettersAssessment']\"><span class=\"hidden-xs-down\">Last:</span> {{student['LastLettersAssessment'] | date:'M/d/yyyy'}}</span> <span ng-if=\"!student['LastLettersAssessment']\">+ Create</span></a></td><td><a ui-sref=\"editAssessment({type: 'words', student: student.id})\"><span ng-if=\"student['LastWordsAssessment']\"><span class=\"hidden-xs-down\">Last:</span> {{student['LastWordsAssessment'] | date:'M/d/yyyy'}}</span> <span ng-if=\"!student['LastWordsAssessment']\">+ Create</span></a></td><td class=\"hidden-xs-down\">{{student['TotalLetters']}}</td><td class=\"hidden-xs-down\">{{student['TotalWords']}}</td></tr></tbody></table>"
  );

}]);
