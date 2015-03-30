// Copyright 2014, Logiticks
// Bootstrapper will register all the views and viewmodels

var settingsManager = rapid.resolve('settingsManager');
var pageManager = rapid.resolve('pageManager');
var navigationManager = rapid.resolve('navigationManager'); 
var regionManager = rapid.resolve('regionManager');

// Register all the default Settings
    //eg:-
	//settingsManager.register('viewUrl', ' http://localhost4245/View/');
	//settingsManager.register('apiUrl', ' http://localhost5252/Api/');

// Register all the Regions and Pages (Bind Viewmodel with view)
    //eg:- 
	//var homeViewModel = function() { return HomeViewModel(); };
	//pageManager.register('home', 'Home', homeViewModel);
	//navigationManager.register('/home', 'home');


