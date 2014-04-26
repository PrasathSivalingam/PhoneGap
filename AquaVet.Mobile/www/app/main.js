requirejs.config({
    paths: {
        'text': '../js/text',
        'durandal': '../js/durandal',
        'plugins': '../js/durandal/plugins',
        'transitions': '../js/durandal/transitions',
        'knockout': '../js/knockout-3.1.0',
        'bootstrap': '../js/bootstrap',
        'jquery': '../js/jquery-2.1.0',
        'index': '../js/index',
        'jqm': '../js/jquery.mobile/jquery.mobile-1.4.2',
        'jqm-conf': '../js/jquery.mobile/jqm-config'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jqm-conf': {
            deps: ['jquery'],
            exports: 'jqmConfig'
        },
        'jqm': {
            deps: ['jqm-conf'],
            exports: 'Mobile'
        },
        'jquery': {
            exports: '$'
        }
    }
});
define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/binder', 'utils/routines'],
    function(app, viewLocator, system,binder,routines) {

        // Enable debug message to show in the console 
        system.debug(true);

        require(['jqm'], function (jqm) {
            console.log("jQuery Mobile loaded...");
        });

        binder.bindingComplete = function (data, view, instruction) {
            console.log("---------- bindingComplete --------");
            //if (data.__moduleId__ !== "viewmodels/shell")
                routines.triggerCreate(view);
        };
        app.title = 'AquaVet';
        
        // Specify which plugins to install und their configuation
        app.configurePlugins({
            router: true,
            dialog: true,
            widget:true
        });
       var phonegapApp = {
       // Application Constructor
       initialize: function() {
       this.bindEvents();
       },
       // Bind Event Listeners
       //
       // Bind any events that are required on startup. Common events are:
       // 'load', 'deviceready', 'offline', and 'online'.
       bindEvents: function() {
           document.addEventListener('deviceready', this.onDeviceReady, false);
           document.addEventListener('dataLoaded', this.onDataLoaded, false);
       },
       // deviceready Event Handler
       //
       // The scope of 'this' is the event. In order to call the 'receivedEvent'
       // function, we must explicity call 'app.receivedEvent(...);'
       onDeviceReady: function() {
       phonegapApp.receivedEvent('deviceready');
       },
       onDataLoaded: function () {
           phonegapApp.receivedEvent('splash');
           phonegapApp.checkConnection();
       },
       // Update DOM on a Received Event
       receivedEvent: function (id) {
           var parentElement = document.getElementById(id);
           if (id == 'deviceready') {
               var listeningElement = parentElement.querySelector('.listening');
               var receivedElement = parentElement.querySelector('.received');

               listeningElement.setAttribute('style', 'display:none;');
               receivedElement.setAttribute('style', 'display:block;');
           } else {
               parentElement.setAttribute('style', 'display:none;');
               var mainElement = document.getElementById("home");
               mainElement.setAttribute('style', 'display:block;');
           }
       
       console.log('Received Event: ' + id);
       },
       checkConnection:function () {
           var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }

       };
        app.start().then(function() {
                         
            // Q shim
            /*system.defer = function(action) {
                var deferred = Q.defer();
                action.call(deferred, deferred);
                var promise = deferred.promise;
                deferred.promise = function() {
                    return promise;
                };

                return deferred;
            };*/

            //toastr.options.positionClass = 'toast-bottom-right';
            //toastr.options.backgroundpositionClass = 'toast-bottom-right';

            //router.handleInvalidRoute = function(route, params) {
            //    logger.logError('No Route Found', route, 'main', true);
            //};

            // When finding a viewmodel module, replace the viewmodel string 
            // with view to find it partner view.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application.
            app.setRoot('viewmodels/shell', 'entrance');
            phonegapApp.initialize();
        });
    });