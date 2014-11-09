"use strict";angular.module("iframeScaffolder",["ngSanitize","ui.router","zeroclipboard"]).config(["$stateProvider","$urlRouterProvider","$sceProvider","uiZeroclipConfigProvider",function(e,t,l,a){e.state("home",{url:"/?urls&layout",params:{urls:{value:""},layout:{value:"menu"}},templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("view",{url:"/view?urls&layout",templateUrl:"app/view/view.html",controller:"ViewCtrl"}),t.otherwise("/"),l.enabled(!1),a.setZcConf({swfPath:"./assets/swf/ZeroClipboard.swf"})}]),angular.module("iframeScaffolder").controller("ViewCtrl",["$scope","$stateParams",function(e,t){e.layout=t.layout,e.urls=t.urls.split(",")}]),angular.module("iframeScaffolder").controller("MainCtrl",["$scope","$state","$stateParams","$http","Scaffolder",function(e,t,l,a,i){e.scaffolder=new i,e.layout=l.layout||"menu",e.urls=""===l.urls?[]:l.urls.split(","),e.width=600,e.height=450,e.examples=[],a.get("assets/examples.json").success(function(t){e.examples=t}),e.addUrl=function(){e.newUrl&&(e.urls.push(e.newUrl),e.newUrl=null)},e.removeUrl=function(t){e.urls.splice(t,1)},e.getViewUrl=function(){var l={urls:e.urls.join(","),layout:e.layout};return t.href("view",l,{absolute:!0})},e.getViewIframe=function(){var t=e.getViewUrl(),l=e.width||600,a=e.height||450;return"<iframe src="+t+' width="'+l+'" height="'+a+'" frameborder="0" allowfullscreen></iframe>'},e.pickExample=function(){var t=e.examples[Math.floor(Math.random()*e.examples.length)];angular.extend(e,angular.copy(t))},e.editLabel=function(t){e.labels={},e.labels[t]=e.scaffolder.label(t,"")},e.saveLabel=function(t){var l=e.labels[t]||"";e.labels={},e.urls[t]=""!==l?l+"|"+e.scaffolder.url(t,!0):e.scaffolder.url(t,!0)},e.$watch("urls + layout",function(){e.scaffolder=new i(e.urls,e.layout)},!0)}]),angular.module("iframeScaffolder").controller("ScaffolderCtrl",["$scope","Scaffolder",function(e,t){e.scaffolder=new t,e.iframeWidth=function(){switch(e.layout){case"horizontal":return 100/e.urls.length+"%";case"tail":return"50%";case"head":return"50%";case"menu":return"75%"}},e.iframeHeight=function(t,l,a){return"horizontal"===e.layout||"menu"===e.layout||"head"===e.layout&&l||"tail"===e.layout&&a?"100%":100/(e.urls.length-1)+"%"},e.$watch("urls + layout",function(){e.scaffolder=new t(e.urls,e.layout)},!0)}]),angular.module("iframeScaffolder").directive("scaffolder",function(){return{restrict:"E",controller:"ScaffolderCtrl",templateUrl:"components/scaffolder/scaffolder.html",scope:{urls:"=",layout:"="}}}),angular.module("iframeScaffolder").service("Scaffolder",function(){function e(e,t,l){return angular.extend(this,{urls:e||[],layout:t||"menu"}),this.activate(l||0),this}return e.prototype.url=function(e,t){var l=this.urls[e];return this.isVisible(e)||t?this.hasLabel(e)?l.split("|")[1]:l:void 0},e.prototype.isActive=function(e){return e==this.active},e.prototype.activate=function(e){return this.active=e<this.urls.length?e:0},e.prototype.isVisible=function(e){return"menu"!==this.layout||this.isActive(e)},e.prototype.hasLabel=function(e){return this.urls[e].indexOf("|http")>-1},e.prototype.label=function(e,t){var l=this.urls[e];return this.hasLabel(e)?l.split("|")[0]:"undefined"!=typeof t&&null!==t?t:l},e}),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="introduction"><div class="container"><h2>Iframe Scaffolder</h2><p class="lead text-muted">This tool helps you to quickly build a mosaic of iframes.</p></div></div><div class="container"><div class="row editor"><div class="col-md-4"><div class="panel editor__step panel-default"><div class="editor__step__label"></div><form class="panel-body" role="form" ng-submit="addUrl()"><div class="input-group"><input type="url" required="" ng-model="newUrl" class="form-control" placeholder="An URL to use as new iframe"> <span class="input-group-btn"><button class="btn btn-primary" type="submit">Add</button></span></div></form><ul class="list-group"><li class="list-group-item editor__step__url" ng-repeat="url in urls track by $index"><div><div class="btn-group btn-group-xs pull-right editor__step__url__actions"><button type="button" class="btn btn-default" ng-click="editLabel($index)">Edit label</button> <button type="button" class="btn btn-default" ng-click="removeUrl($index)"><i class="glyphicon glyphicon-trash"></i></button></div><a ng-href="{{scaffolder.url($index)}}" target="_blank" class="editor__step__url__value">{{scaffolder.label($index)}}</a></div><form ng-submit="saveLabel($index)" ng-show="labels[$index] || labels[$index] === \'\'" class="editor__step__url__edit-label"><div class="input-group input-group-sm"><input type="text" ng-model="labels[$index]" class="form-control"> <span class="input-group-btn"><button class="btn btn-default" type="submit">Save</button></span></div></form></li></ul></div><div class="panel editor__step panel-default"><div class="editor__step__label"></div><div class="panel-body"><div class="pull-left">Choose a layout<br><small class="text-muted">How iframes are arranged</small></div><div class="pull-right"><button class="btn btn-default btn-sm" ng-class="{active: layout == \'menu\'}" ng-click="layout = \'menu\'">≡◻</button> <button class="btn btn-default btn-sm" ng-class="{active: layout == \'horizontal\'}" ng-click="layout = \'horizontal\'">▯▯▯</button> <button class="btn btn-default btn-sm" ng-class="{active: layout == \'head\'}" ng-click="layout = \'head\'">▯▤</button> <button class="btn btn-default btn-sm" ng-class="{active: layout == \'tail\'}" ng-click="layout = \'tail\'">▤▯</button></div></div></div><div class="panel editor__step panel-default"><div class="editor__step__label"></div><div class="panel-body"><p><button class="btn btn-default btn-xs pull-right" ui-zeroclip="" zeroclip-model="getViewIframe()">Copy</button> Export the iframe</p><p><textarea class="form-control" readonly="">{{getViewIframe()}}</textarea></p><div class="text-muted"><div class="pull-left">Change the size&nbsp;</div><div class="text-right"><input type="number" ng-model="width" min="50" class="form-control input-sm editor__step__size"> x <input type="number" ng-model="height" min="50" class="form-control input-sm editor__step__size"></div></div></div></div><div class="text-muted small editor__credits"><div class="media"><a class="media-left media-middle" href="http://twitter.com/pirhoo" target="_blank"><img src="https://secure.gravatar.com/avatar/f514016d15f3d5409177c1031eedb0a5?s=32" class="img-circle img-thumbnail"></a><div class="media-body">Hi, I\'m <a href="http://twitter.com/pirhoo" target="_blank">@pirhoo</a>.<br>This is an <a href="http://github.com/pirhoo/iframe-scaffolder/">open source</a> tool.</div></div></div></div><div class="col-md-8"><div class="panel panel-default editor__preview"><div class="editor__preview__empty-alert" ng-hide="urls.length"><div class="lead editor__preview__empty-alert__message"><p>Add your iframe\'s URL on the <span class="hidden-sm hidden-xs">left&nbsp;</span>panel to preview the mosaic here.</p><p><a ng-click="pickExample()" class="btn btn-link" ng-show="examples.length">See an example.</a> {{example}}</p></div></div><div class="panel-heading"><div class="input-group"><input class="form-control" type="text" value="{{getViewUrl()}}" readonly=""> <span class="input-group-btn"><a class="btn btn-link" href="{{getViewUrl()}}" target="_blank"><i class="glyphicon glyphicon-new-window"></i></a></span></div></div><div class="editor__preview__scaffolder"><scaffolder urls="urls" layout="layout"></scaffolder></div></div></div></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/view/view.html",'<div class="view"><div class="view__scaffolder"><scaffolder urls="urls" layout="layout"></scaffolder></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("components/scaffolder/scaffolder.html",'<div class="scaffolder scaffolder--{{layout}}"><aside ng-show="layout == \'menu\'" class="scaffolder__menu"><ul class="nav nav-pills nav-stacked"><li ng-repeat="url in urls track by $index" ng-class="{\'active\': scaffolder.isActive($index) }" class="scaffolder__menu__item"><a ng-click="scaffolder.activate($index)">{{scaffolder.label($index, "Iframe " + ($index+1))}}</a></li></ul></aside><iframe frameborder="0" class="scaffolder__iframe" width="{{iframeWidth($index, $first, $last)}}" height="{{iframeHeight($index, $first, $last)}}" ng-class="{\'scaffolder__iframe--last\': $last, \'scaffolder__iframe--first\': $first}" ng-src="{{scaffolder.url($index)}}" ng-show="scaffolder.isVisible($index)" ng-repeat="url in urls track by $index"></iframe></div>')}])}();