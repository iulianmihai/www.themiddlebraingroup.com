
var homeTemlate = "\ <div id='scrollable' class='scrollable'> \
        <div class='items'> \
        <% for (var i = 0; i < image.length; i++) {%> \
            <div><img src='images/<%= image[i] %>' alt='<%= title[i] %>' class='homepageimage' /> \
            <div class='titlediv'><h1><%= title[i] %></h1></div> \
            <% var desc = description[i].replace(new RegExp('{', 'g'), '<span class=boldelement>'); desc = desc.replace(new RegExp('}', 'g'), '</span>'); %> \
            <div class='descriptiondiv'><span><%= desc %></span></div> \
            <div class='clear'></div> \
            </div> \
        <% } %> \
        </div> \
        </div> \
        <a class='next browse right rg'>next</a> \
        <a class='prev browse left lf'>prev</a> \
        ";