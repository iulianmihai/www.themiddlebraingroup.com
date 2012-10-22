//=========== Defining the main Namespace=============
var LiaAranWeb = LiaAranWeb || {};
//========== end namespace definition=================
LiaAranWeb.routers = LiaAranWeb.routers || {};
LiaAranWeb.model = LiaAranWeb.model || {};
LiaAranWeb.view = LiaAranWeb.view || {};
LiaAranWeb.collection = LiaAranWeb.collection || {};
//==================Models=========================
LiaAranWeb.model.HeaderModel = Backbone.Model.extend({
    defaults: {
        NavBar: ['Work', 'About', 'Contact'],
        Home: 'Home'
    }
});
LiaAranWeb.model.HomeModel = Backbone.Model.extend({});
LiaAranWeb.model.WorkModel = Backbone.Model.extend({});
LiaAranWeb.model.AboutModel = Backbone.Model.extend({});
LiaAranWeb.model.ContactModel = Backbone.Model.extend({});
//==================VIEWS=========================
LiaAranWeb.view.HeaderView = Backbone.View.extend({
    el: $('header'),
    initialize: function () {
        var headerTemplate = _.template($("#header-template").html());
        $(this.el).html(headerTemplate(this.model.toJSON()));
        return this;
    },
    render: function () {
        this.initialize();
    },
    events: {
        'mouseenter .divlogomenu': 'displaymenu',
        'mouseleave .divlogomenu': 'hidemenu'//,
        //'click .navbar': 'url'
    },
    displaymenu: function (e) {
        $('#ulmenu').slideDown();
    },
    hidemenu: function (e) {
        $('#ulmenu').slideUp();
    }//,
//    url: function (e) {
//        e.preventDefault();
//        var app = new LiaAranWeb.routers.WebRoutes();
//        app.navigate(this.model.get("NavBar"), { trigger: true });
//        
//    }
});
LiaAranWeb.view.HomeView = Backbone.View.extend({
    el: $('<article/>', { id: 'home', 'class': 'elem' }),
    initialize: function () {
        var homeTemplate = _.template($("#home-template").html());
        $(this.el).html(homeTemplate(this.model.toJSON()));
        $(this.el).appendTo('section');
        $(".scrollable").scrollable().autoscroll({ autoplay: true, interval: 4000, step: 1 });
        return this;
    },
    render: function () {
        this.initialize();
    }
});
LiaAranWeb.view.WorkView = Backbone.View.extend({
    el: $('<article/>', { id: 'work', 'class': 'elem' }),
    initialize: function () {
        var workTemplate = _.template($("#work-template").html());
        $(this.el).html(workTemplate(this.model.toJSON()));
        $(this.el).appendTo('section');
        return this;
    },
    render: function () {
        this.initialize();
    }
});

LiaAranWeb.view.AboutDetailView = Backbone.View.extend({
    el: $('section'),
    render: function (page, id) {
        page = page + ".htm";
        //$('section').html('');
        //var $href = $(this).attr('href').replace(/\s/g, "").toLowerCase();
        //var id = $href.split('#')[1];
        $("<div/>").load(page, function () {
            $('section').html(this);
            //$(this.el).html($(this)).css({ 'margin-top': '0px' });
            //$('<a/>', { 'class': 'close', text: 'close' }).css({ 'background': 'url(images/close2.png) no-repeat left top', 'width': '30px', 'height': '28px', 'margin-top': '0', 'margin-left': '920px', 'top': '150px', 'position': 'fixed' }).appendTo('section');
            $('html,body').animate({ scrollTop: $("#" + id).offset().top - 130 }, 'slow');
        });
    }
});
LiaAranWeb.view.AboutView = Backbone.View.extend({
    el: $('<article/>', { id: 'about', 'class': 'elem' }),
    initialize: function () {
        var aboutTemplate = _.template($("#about-template").html());
        $(this.el).html(aboutTemplate(this.model.toJSON()));
        $(this.el).appendTo('section');
        return this;
    },
     render: function () {
         this.initialize();
    }
});
LiaAranWeb.view.ContactView = Backbone.View.extend({
    el: $('<article/>', { id: 'contact', 'class': 'elem' }),
    initialize: function () {
        var contactTemplate = _.template($("#contact-template").html());
        $(this.el).html(contactTemplate(this.model.toJSON()));
        $(this.el).appendTo('section');
        return this;
    },
     render: function () {
         this.initialize();
    }
});

LiaAranWeb.view.WorkDetailView = Backbone.View.extend({
    el: $('section'),
    model: LiaAranWeb.model.WorkModel,
    render: function (id) {
        var item = LiaAranWeb.model.WorkModel.get("item");
        $('*').css({ 'background-color': 'black' });
        $('header').css({ 'position': 'static', 'padding': '0' });
        $('#divlogo').css('background-image', 'url(images/logo_black.png)');
        var workdetailsTemplate = _.template($("#workdetails-template").html(), { item: item[id] });
        $(this.el).html(workdetailsTemplate).css({ 'margin-top': '0px' });
        $('#divlogomenu').addClass('divlogomenu');
        $('#ulmenu').css('display', 'none');
        $('#divsocial').css('display','none');
        $(".scrollable").scrollable();
        return this;
    },
    events: {
        'click .close': 'close'
    },
    close: function (event) {
        var id = Backbone.history.fragment.toLowerCase();
        console.log(id.split('/')[1]);
        var route = new LiaAranWeb.routers.WebRoutes;
        route.navigate("/work/" + id.split('/')[1], true);
    }

});
//==================Collections====================
LiaAranWeb.collection.HomePageCollection = Backbone.Collection.extend({});
//==================Routes/Controllers==============
LiaAranWeb.routers.WebRoutes = Backbone.Router.extend({
    /* define the route and function maps for this router */
    routes: {
        "About": "goToSection",
        "Work": "goToSection",
        "Contact": "goToSection",
        "Home": "goToSection",
        "work/:id": "goToSection",
        "workdetail/:id": "getWorkDetail",
        "AboutUs/:page/:id": "getAboutSection",

        "search/:query": "searchPhotos",
        /*We can also define multiple routes that are bound to the same map function,
        in this case searchPhotos(). Note below how we're optionally passing in a 
        reference to a page number if one is supplied*/
        /*Sample usage: http://liaaran.com/#search/lolcats*/

        "search/:query/p:page": "searchPhotos",
        /*As we can see, URLs may contain as many ":param"s as we wish*/
        /*Sample usage: http://liaaran.com/#search/lolcats/p1*/

        "photos/:id/download/*imagePath": "downloadPhoto",
        /*This is an example of using a *splat. splats are able to match any number of 
        URL components and can be combined with ":param"s*/
        /*Sample usage: http://liaaran.com/#photos/5/download/files/lolcat-car.jpg*/

        /*If you wish to use splats for anything beyond default routing, it's probably a good 
        idea to leave them at the end of a URL otherwise you may need to apply regular
        expression parsing on your fragment*/

        "*other": "defaultRoute"
        /*This is a default route that also uses a *splat. Consider the
        default route a wildcard for URLs that are either not matched or where
        the user has incorrectly typed in a route path manually*/
        /*Sample usage: http://liaaran.com/#anything*/

    },
    getAboutSection: function (page, id) {
        console.log("page: " + page + " id: " + id);
        var aboutView = new LiaAranWeb.view.AboutDetailView;
        aboutView.render(page, id);
    },
    goToSection: function (id) {
        id = (id ? 'work' + id : '') || Backbone.history.fragment.toLowerCase();
        if ($('#' + id).length > 0) {
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - 130
            }, 1000);
        } else {
            $('section').html('');
            $('header').removeAttr('style');
            var headerView = new LiaAranWeb.view.HeaderView({ model: LiaAranWeb.model.HeaderModel });
            var homeView = new LiaAranWeb.view.HomeView({ model: LiaAranWeb.model.HomeModel });
            var workView = new LiaAranWeb.view.WorkView({ model: LiaAranWeb.model.WorkModel });
            var aboutView = new LiaAranWeb.view.AboutView({ model: LiaAranWeb.model.AboutModel });
            var contactView = new LiaAranWeb.view.ContactView({ model: LiaAranWeb.model.ContactModel });
            $('section').removeAttr('style');

            $('body,article,div').css({ 'background-color': 'white' });
            $('html, body').animate({
                scrollTop: ($('#' + id).offset().top) - 130
            }, 1000);
        }
    },
    getWorkDetail: function (id) {
        var workdetails = new LiaAranWeb.view.WorkDetailView;
        workdetails.render(id);
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    },

    searchPhotos: function (query, page) {
        console.log("Page number: " + page + " of the results for " + query);
    },

    downloadPhoto: function (id, path) {
    },

    defaultRoute: function (other) {
        //        $('html, body').animate({
        //            scrollTop: ($("#home").offset().top) - 110
        //        }, 1000);

    }
});


//==================================================
//==================END VIEWS=========================
//==================================================


$.get('data.xml', function (xml) {
    var jsonObj;
    jsonObj = $.xml2json(xml);
    LiaAranWeb.model.HeaderModel = new LiaAranWeb.model.HeaderModel();
    LiaAranWeb.model.HomeModel = new LiaAranWeb.model.HomeModel(jsonObj.home);
    LiaAranWeb.model.WorkModel = new LiaAranWeb.model.WorkModel(jsonObj.work);
    LiaAranWeb.model.AboutModel = new LiaAranWeb.model.AboutModel(jsonObj.about);
    LiaAranWeb.model.ContactModel = new LiaAranWeb.model.ContactModel(jsonObj.contact);

    LiaAranWeb.view.renderHeaderView = new LiaAranWeb.view.HeaderView({ model: LiaAranWeb.model.HeaderModel });
    LiaAranWeb.view.renderHomeView = new LiaAranWeb.view.HomeView({ model: LiaAranWeb.model.HomeModel });
    LiaAranWeb.view.renderWorkView = new LiaAranWeb.view.WorkView({ model: LiaAranWeb.model.WorkModel });
    LiaAranWeb.view.renderAboutView = new LiaAranWeb.view.AboutView({ model: LiaAranWeb.model.AboutModel });
    LiaAranWeb.view.renderContactView = new LiaAranWeb.view.ContactView({ model: LiaAranWeb.model.ContactModel });
    
    LiaAranWeb.routers.LiaAranWebApp = new LiaAranWeb.routers.WebRoutes();
    Backbone.history.start();
});




//==============================================
//==========INSPIRATUION========================
//==============================================

//var Status = Backbone.Model.extend({
//    url: '/status'
//});

//var Statuses = Backbone.Collection.extend({
//    model: Status
//});

//var NewStatusView = Backbone.View.extend({
//    events: {
//        'submit form': 'addStatus'
//    },

//    initialize: function () {
//        this.collection.on('add', this.clearInput, this);
//    },

//    addStatus: function (e) {
//        e.preventDefault();

//        this.collection.create({ text: this.$('textarea').val() });
//    },

//    clearInput: function () {
//        this.$('textarea').val('');
//    }
//});

//var StatusesView = Backbone.View.extend({
//    initialize: function () {
//        this.collection.on('add', this.appendStatus, this);
//    },

//    appendStatus: function (status) {
//        this.$('ul').append('<li>' + status.escape('text') + '</li>');
//    }
//});

//$(document).ready(function () {
//    var statuses = new Statuses();
//    new NewStatusView({ el: $('#new-status'), collection: statuses });
//    new StatusesView({ el: $('#statuses'), collection: statuses });
//});