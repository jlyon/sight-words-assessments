angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/assessment.html',
    "<!--<div ng-if=\"colors && items && assessments\">--><div><h1>{{student['First Name']}} {{student['Last Name']}}'s {{type}} Progress <small>{{student.Crew}} Crew</small></h1><div class=\"form-group row no-print\" ng-if=\"edit\"><div class=\"col-sm-12\"><div class=\"input-group\" style=\"max-width: 500px\"><span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-fw fa-link\"></i></span> <input type=\"text\" class=\"form-control\" aria-describedby=\"basic-addon1\" ng-model=\"link\" ng-click=\"linkClick($event)\"></div></div></div><span ng-repeat=\"color in colors\"><style>.color-{{color.id}} {\n" +
    "      background-color: #{{color.Code}} !important;\n" +
    "    }</style></span><div class=\"row assessments\"><div class=\"col-xs-6\"><table ng-if=\"assessments.length\" class=\"table table-striped\"><thead><tr><th></th><th>Date</th><th>Total</th></tr></thead><tbody><tr ng-repeat=\"item in assessments\"><td class=\"color-swatch\"><span class=\"color-{{item.Color[0]}}\">&nbsp;</span></td><td>{{item.Date | date:'MMMM d yyyy'}}</td><td>{{item.sum || 0}}</td></tr></tbody></table><!--<ul class=\"list-group\" ng-if=\"assessments\">\n" +
    "      <li ng-repeat=\"item in assessments\"\n" +
    "         title=\"Edit this assessment\"\n" +
    "         ng-class=\"assessment && assessment.id == item.id ? 'active' : ''\"\n" +
    "         class=\"list-group-item list-group-item list-group-item-action\">\n" +
    "        <span class=\"color-swatch color-{{item.Color[0]}}\" class=\"btn\"></span>\n" +
    "        {{item.Date | date:'MMMM d yyyy'}}\n" +
    "      </li>\n" +
    "    </ul>--></div><div class=\"col-xs-6 no-print\" ng-if=\"!assessment && edit\"></div></div><p class=\"no-print\" ng-if=\"!assessment && edit\"><button class=\"btn btn-primary\" ng-click=\"newAssessment()\"><i class=\"fa fa-fw fa-plus-circle\"></i>Create New Assessment</button></p><form class=\"assessment\" ng-class=\"!assessment ? 'form-disabled' : ''\"><div ng-if=\"assessment\" class=\"no-print\"><h2 ng-if=\"assessment.id\">Edit Assessment from {{assessment.Date | date:'MMMM d yyyy'}}</h2><h2 ng-if=\"!assessment.id\">Create new Assessment</h2><div class=\"form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Date</label><div class=\"col-sm-4\"><input type=\"date\" class=\"form-control\" ng-model=\"assessment.Date\"></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Color</label><div class=\"col-sm-10 list-colors\"><a class=\"btn btn-default\" ng-repeat=\"color in colors\" title=\"{{color.Label}}\" ng-click=\"setColor(color)\" ng-class=\"assessment.Color[0] == color.id ? 'active' : ''\" ng-style=\"{backgroundColor: '#' + color.Code}\">&nbsp;</a></div></div><style>.list-items .active{\n" +
    "        background-color: #{{activeColor.Code}} !important;\n" +
    "      }</style></div><div class=\"list-group list-items\" ng-repeat=\"group in groups\" ng-if=\"assessment || assessments.length\"><div><label>{{group.Label}}</label></div><a ng-repeat=\"item in items\" ng-if=\"item.Group[0] == group.id\" class=\"btn btn-default\" ng-click=\"toggleWord(item.id)\" ng-class=\"assessment && assessment.Items.indexOf(item.id) != -1 ? 'active' : (disabledItems[item.id] ? 'disabled color-' + disabledItems[item.id] : '' )\">{{item.Item}}</a></div><div ng-if=\"assessment\" class=\"no-print form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div></form></div>"
  );


  $templateCache.put('views/print.html',
    "<div ng-repeat=\"student in students\"><div assessment type=\"words\" student=\"student\"></div><div assessment type=\"letters\" student=\"student\"></div></div>"
  );


  $templateCache.put('views/students.html',
    "<table class=\"table table-striped\"><thead><tr><th>Name</th><th>Crew</th><th>Last Words</th><th>Last Letters</th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"student in students\"><td>{{student['Last Name']}}, {{student['First Name']}}</td><td>{{student.Crew}}</td><td>{{student['Last Words Assessment'] | date:'M/d/yyyy'}}</td><td>{{student['Last Letters Assessment'] | date:'M/d/yyyy'}}</td><td><a ui-sref=\"editAssessment({type: 'words', student: student.id})\" class=\"btn btn-default\">Words Progress</a></td><td><a ui-sref=\"editAssessment({type: 'letters', student: student.id})\" class=\"btn btn-default\">Letters Progress</a></td></tr></tbody></table>"
  );

}]);
