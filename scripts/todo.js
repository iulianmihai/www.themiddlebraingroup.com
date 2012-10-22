var jsonObj, home, work, about, contact;

$.fn.preload = function () {
    this.each(function () {
        $('<img/>')[0].src = 'images/' + this;
    });
};







displayHompage();
//=================================
//=================================
//====Loading homepage=============
//=================================
//=================================
function displayHompage() {
    $.get('data.xml', function (xml) {
        jsonObj = $.xml2json(xml);
        //console.log(jsonObj);
        home = jsonObj.home;
        work = jsonObj.work;
        about = jsonObj.about;
        contact = jsonObj.contact;

        //$(home.image).preload();
        // $(work.item.thumbnail).preload();
        // $(work.item.images).preload();

        var $home = $('#home');
        var scrollablediv = $('<div/>', { id: 'scrollable', 'class': 'scrollable' }).appendTo($home);
        var itemdiv = [];
        var tt = [], desc = [];
        var itemsdiv = $('<div/>', { 'class': 'items' }).appendTo(scrollablediv);
        var titleDiv = [], descriptiondiv = [];
        for (var s = 0; s < home.image.length; s++) {
            itemdiv[s] = $('<div/>').appendTo(itemsdiv);
            tt[s] = home.title[s];
            desc[s] = home.description[s];
            desc[s] = desc[s].replace(new RegExp("{", "g"), '<span class="boldelement">');

            desc[s] = desc[s].replace(new RegExp("}", "g"), '</span>');
            $('<img/>', { src: 'images/' + home.image[s], alt: home.title, 'class': 'homepageimage' }).appendTo(itemdiv[s]);
            titleDiv[s] = $('<div/>', { 'class': 'titlediv' }).appendTo(itemdiv[s]);
            descriptiondiv[s] = $('<div/>', { 'class': 'descriptiondiv' }).appendTo(itemdiv[s]);
            $('<div class="clear"></div>').appendTo(itemdiv[s]);
            tt[s] = $('<h1/>', { html: tt[s] }).appendTo(titleDiv[s]);
            desc[s] = $('<span/>', { html: desc[s] }).appendTo(descriptiondiv[s]);
        }
        $('<a/>', { 'class': 'next browse right rg', text: 'next' }).appendTo($home);
        $('<a/>', { 'class': 'prev browse left lf', text: 'prev' }).appendTo($home);


        $(".scrollable").scrollable().autoscroll({ autoplay: true, interval: 4000, step: 1 });
        //=================================
        //=================================
        //=====Displaying Work Section=====
        //=================================
        //=================================
        for (var i = 0; i < work.item.length; i++) {
            var thumbnail = work.item[i].thumbnail;
            var image;
            if (work.item[i].images.image[0] != 0) {
                image = work.item[i].images.image[0];
            } else {
                image = work.item[i].images.image;
            }
            var title = work.item[i].title;
            var $article = $('<article/>');
            var $figure = $('<figure/>').appendTo($article);
            var $detailsimg = $('<a/>', { href: 'images/img/' + image, 'class': 'thbdetails', arrobj: i }).appendTo($figure);
            $('<img/>', { src: 'images/' + thumbnail, alt: title, rel: '#' + image, border: '0' }).appendTo($detailsimg);
            $('<h2/>', { text: title }).appendTo($figure);
            $('#work').append($article);
            if (i % 3 == 2) {
                $('<div class="clear"></div>').appendTo('#work');
            }
        }
        $('<div class="clear"></div>').appendTo('#work');
        //=================================
        //=================================
        //====Displaying About Section=====
        //=================================
        //=================================
        for (var j = 0; j < about.thumbnail.length; j++) {
            var thb = about.thumbnail[j];
            var img = about.image[j];
            var tlt = about.title[j];
            var links = about.links[j];
            var $art = $('<article/>');
            $('<h2/>', { text: tlt }).appendTo($art);
            var ul = $('<ul/>');

            ul.appendTo($art);
            for (var z = 0; z < links.link.length; z++) {
                var li = $('<li/>');
                li.appendTo(ul);
                if (typeof links.link !== 'string') {
                    $('<a/>', { text: links.link[z], href: tlt.replace(/\s/g, "").toLowerCase() + '.htm#' + links.link[z].replace(/\s/g, "").toLowerCase(), 'class': 'aboutlk' }).appendTo(li);
                } else {
                    $('<a/>', { text: links.link, href: tlt.replace(/\s/g, "").toLowerCase() + '.htm#' + links.link.replace(/\s/g, "").toLowerCase(), 'class': 'aboutlk' }).appendTo(li);
                    break;
                }

            }
            $art.appendTo('#about');
            if (j % 3 == 2) {
                $('<div class="clear"></div>').appendTo('#about');
            }
        }
        $('<div class="clear"></div>').appendTo('#about');
        //=================================
        //=================================
        //==Displaying Contact Section=====
        //=================================
        //=================================
        $('<h3 />', { text: contact.name }).appendTo('#contact');
        $('<span />', { text: contact.position, id: 'position' }).appendTo('#contact');
        $('<span />', { html: contact.city + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: ' + contact.email + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C: ' + contact.cell, id: 'email' }).appendTo('#contact');

        $('<a />', { id: 'linkedin', href: 'http://www.linkedin.com/pub/lia-aran/4/a66/b74', target: '_blank' }).appendTo('#divsocial');
        $('<span />', { id: 'facebook' }).appendTo('#divsocial');
        $('<span />', { id: 'twitter' }).appendTo('#divsocial');
        $('<div />', { 'class': 'clear' }).appendTo('#contact');
        var $form;

        $form = '<table style="margin-top:40px;font: normal 14px HelveticaNeueRoman !important;"><tr><td style="vertical-align:top;"><table style="height:165px;" cellpadding="0" cellspacing="0"><tr><td><label class="formlb" for="txtFirstName">First name:</label><br><input type="text" id="txtFirstName" /></td></tr><tr><td><label class="formlb" for="txtLastName">Last name:</label><br><input type="text" id="txtLastName" /></td></tr><tr><td><label class="formlb" for="txtEmail">Email:</label><br><input type="text" id="txtEmail" /></td></tr></table></td><td style="padding-left:45px;"><label class="formlb" for="txtMessage">Message:</label><br><textarea rows="7" cols="70" id="txtMessage"></textarea></td></tr><tr><td></td><td style="padding-left:45px;"><input type="submit" value="Send" id="btnSend" /></td></tr></table><div style="height:50px;"></div>';

        $($form).appendTo('#contact');

    });
}






//=================================
//=================================
//==============Events=============
//=================================
//=================================
$('#lnkwork').live('click', function (e) {
    if ($('#work').length > 0) {
        $('html, body').animate({
            scrollTop: ($("#work").offset().top) - 130
        }, 1000);
    } else {
        $('.close').click();
        $('html, body').animate({
            scrollTop: ($("#work").offset().top) - 130
        }, 1000);
    }
});
$('#lnkabout').live('click', function (e) {
    if ($('#about').length > 0) {
        $('html, body').animate({
            scrollTop: $("#about").offset().top - 130
        }, 1000);
    } else {
        $('.close').click();
        $('html, body').animate({
            scrollTop: ($("#about").offset().top) - 130
        }, 1000);
    }
});
$('#lnkcontact').live('click', function (e) {
    if ($('#contact').length > 0) {
        $('html, body').animate({
            scrollTop: ($("#contact").offset().top) - 130
        }, 1000);
    } else {
        $('.close').click();
        $('html, body').animate({
            scrollTop: ($("#contact").offset().top) - 130
        }, 1000);
    }
});
$('#divlogo').live('click', function (e) {
    if ($('#work').length > 0) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: ($("#home").offset().top) - 130
        }, 1000);
    } else {
        $('.close').click();
    }
});

$('.thbdetails').live('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    $('#divmain').data('bodydoom', $('#divmain').html());

    $('section').html('').css({ 'margin-top': '0px' });
    $('*').css({ 'background-color': 'black' });
    $('#linkedin').hide();
    $('#facebook').hide();
    $('#twitter').hide();
    var $img = $(this).attr('href');
    var arrobj = $(this).attr('arrobj');

    $('header').css({ 'position': 'static', 'padding': '0' });

    $('#ulmenu').hide();
    $('#divlogomenu').hover(function () {
        $('#ulmenu').slideDown();
    },
     function () {
         $('#ulmenu').slideUp();
     });





    var scrollablediv = $('<div/>', { id: 'scr', 'class': 'scrollable' }).appendTo('section');
    var itemdiv = [];
    var itemsdiv = $('<div/>', { 'class': 'items' }).appendTo(scrollablediv);
    var $images = work.item[arrobj].images.image;
    $('#divlogo').css('background-image', 'url(images/logo_black.png)');


    if (typeof $images !== 'string') {
        for (var s = 0; s < $images.length; s++) {
            if ($images[s]) {
                itemdiv[s] = $('<div/>', { style: 'width:919px;height:507px;margin-left:-20px' }).appendTo(itemsdiv);
                $('<img/>', { src: 'images/img/' + $images[s], 'class': 'homepageimage' }).appendTo(itemdiv[s]);
            }
        }
        $('<a/>', { 'class': 'next browse right', text: 'next' }).css({ 'background': 'url(images/arrows.png) no-repeat right top', 'width': '22px', 'height': '28px' }).appendTo('section');
        $('<a/>', { 'class': 'prev browse left', text: 'prev' }).css({ 'background': 'url(images/arrows.png) no-repeat left top', 'width': '22px', 'height': '28px' }).appendTo('section');

    } else {
        var sss = $('<div/>', { style: 'width:919px;height:507px;margin-left:-20px' }).appendTo(itemsdiv);
        $('<img/>', { src: $img, 'class': 'homepageimage' }).appendTo(sss);
    }
    $(".scrollable").scrollable();
    $('<a/>', { 'class': 'close', text: 'close' }).css({ 'background': 'url(images/close.png) no-repeat left top', 'width': '30px', 'height': '28px' }).appendTo('section');
    //Working here
    var content = $('<div/>', { 'class': 'desc' }).appendTo('section');
    $('<h1/>', { text: work.item[arrobj].title, 'class': 'imgtitle' }).appendTo(content);
    $('<h2/>', { text: work.item[arrobj].subtitle, 'class': 'imgsubtitle' }).appendTo(content);
    $('<p/>', { text: work.item[arrobj].description, 'class': 'imgdescription' }).appendTo(content);
    $('<p/>', { text: work.item[arrobj].read, 'class': 'imgread' }).appendTo(content);
    $('<p/>', { html: work.item[arrobj].casestudy, 'class': 'imgcasestudy' }).appendTo(content);
    $('<div/>', { style: 'height:60px;' }).appendTo('section');


});

$('.close').live('click', function (e) {
    $('#divmain').html('');
    $('*').css({ 'background-color': 'white' });
    $('#divmain').html($('#divmain').data('bodydoom'));
    $(".scrollable").scrollable({ circular: true });
});

$('.aboutlk').live('click', function (e) {
    e.preventDefault();
    $('#divmain').data('bodydoom', $('#divmain').html());
    //var $href = $(this).attr('href').split(" ").join("").toLowerCase();
    var $href = $(this).attr('href').replace(/\s/g, "").toLowerCase();
    var id = $href.split('#')[1];
    //id = id.split(" ").join("").toLowerCase();


    $('section').html('');

    var dv = $("<div/>").load($href, function () {

        $(this).appendTo('section');
        $('<a/>', { 'class': 'close', text: 'close' }).css({ 'background': 'url(images/close2.png) no-repeat left top', 'width': '30px', 'height': '28px', 'margin-top': '0', 'margin-left': '920px', 'top': '150px', 'position': 'fixed' }).appendTo('section');
        console.log($href);
        console.log(id);
        $('html,body').animate({ scrollTop: $("#" + id).offset().top - 130 }, 'slow');
    });



});





//=================================
//=================================
//===========Functions=============
//=================================
//=================================
function hideAll() {
    $('#home').hide();
    $('#work').hide();
    $('#about').hide();
    $('#contact').hide();
}
