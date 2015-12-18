/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function (document) {
    'use strict';   
    
    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');
    
    app.displayInstalledToast = function () {
        document.querySelector('#caching-complete').show();
    };
    
    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function () {
        console.log('Our app is ready to rock!');
    });
    
    // See http://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function (e) {

    });
    
    // Main area's paper-scroll-header-panel custom condensing transformation of
    // the appName in the middle-container and the bottom title in the bottom-container.
    // The appName is moved to top and shrunk on condensing. The bottom sub title
    // is shrunk to nothing on condensing.
    //addEventListener('paper-header-transform', function (e) {
    //    var appName = document.querySelector('.app-name');
    //    var middleContainer = document.querySelector('.middle-container');
    //    var bottomContainer = document.querySelector('.bottom-container');
    //    var detail = e.detail;
    //    var heightDiff = detail.height - detail.condensedHeight;
    //    var yRatio = Math.min(1, detail.y / heightDiff);
    //    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    //    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1 - maxMiddleScale)) + maxMiddleScale);
    //    var scaleBottom = 1 - yRatio;
        
    //    // Move/translate middleContainer
    //    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
        
    //    // Scale bottomContainer and bottom sub title to nothing and back
    //    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);
        
    //    // Scale middleContainer appName
    //    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
    //});
    
    // Close drawer after menu item is selected if drawerPanel is narrow
    app.onMenuSelect = function () {
        var drawerPanel = document.querySelector('#paper-drawer-panel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    };
    
    app.onRoleChange = function (event) {
        app.missions_notify = !app.missions_notify;
        var target = event.target;
        
        if (app.drawer_route === 0) {
            var agentMenu = document.querySelector('#agent-menu');
            agentMenu.select('0');
        }
    };
    
    app.onLogIn = function () {
        app.route = 'missions';
        app.isLogged = true;
        app.user = JSON.parse(window.sessionStorage['user']);
        
        //app.socket = io.connect('http://192.168.1.14:3000',{
        app.socket = io.connect('http://192.168.11.136:3000', {
            query: 'token=' + window.sessionStorage.token,
            forceNew: true
        }).on('connect', function () {
            var e = new Event('socket-connected');
            app.dispatchEvent(e);
            console.log('socket connected');
        }).on('disconnect', function () {
            console.log('disconnected');
        });
    };
    
    app.onLogOut = function (){
        app.route = 'home';
        app.isLogged = false;
        app.user = null;
    };
    
    app.onRequestLogin = function (){
        app.route = 'login';
    };
    
    app.getAgentMenuChoice = function (event){
        var target = event.target;
        
        app.mission_filter = target.selectedItem.id;
        app.missions_notify = !app.missions_notify;
    };
    
    addEventListener('resize', function (e) {
        console.log(e);
    });

    addEventListener('load', function (event) {
        if (window.localStorage['remember'] == "true") {
            window.sessionStorage.token = window.localStorage.token;
            window.sessionStorage['email'] = window.localStorage['email'];
            window.sessionStorage['id'] = window.localStorage['id'];
            window.sessionStorage['user'] = window.localStorage['user'];
            app.isLogged = true;
            //document.getElementById('deconnexionToggle').show(); 
            
            app.onLogIn(); 
        }
        else {
            app.isLogged = false;
        //    document.getElementById('deconnexionToggle').hide();
        }

        app.drawer_route = 0;
        app.lang = navigator.language;             
    });
    
    addEventListener('unload', function (event) {
        if (window.localStorage['remember'] != "true") {
            window.localStorage.token = '';
            window.localStorage['email'] = '';
            window.localStorage['id'] = '';
        }
    });    

    var _wr = function (type) {
        var orig = history[type];
        return function () {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    
    window.addEventListener('pushState', function (event) {
        var currentState = history.state;
        if (currentState.path === "/logout") {
            var splited = window.location.href.split('#!');
            window.history.replaceState(currentState, 'Special-Agency', splited[0]);
        }
    });    

    app.changeLanguage = function (lang){
        app.lang = 'en';       
        var e = new Event('change-language');
        app.dispatchEvent(e);
    }

    app.onGetTranslations = function (e){        
        var e = new Event('load-language');
        app.dispatchEvent(e);
    }
    
})(document);

