var App = window.App = {};
var Util = App.Util = {};
var Api = App.Api = {};
var Page = App.Page = {};
var Config = App.Config = {};
var Consist = App.Consist = {};
var Route = App.Route = {
    bike: 'trans-bike.html'
};


//to do
//create config file and repplace these to the config file
var host = 'http://222.211.86.167:8080/';
var API_root = 'fzapp';
var API_host = host + API_root;
var city_num = "0794";
var map;

/*
 * on domContentLoaded
 */
$(function () {
    /*
     * all
     */
    Util.dispatcher('.', function () {
        Page.all.init();
    });

    Util.dispatcher(Route.bike, function () {
        Config.currentPage = Route.bike;
        Page.bike.init();
    });

    //文件扩展名
    var pathname = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];


    // dispatch
    Util.dispatcher(pathname);

});