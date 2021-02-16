$(document).ready(function() {
/* Generate a Library button from JSON  */
var myJSON = '{"name":"George Lychock Career Website", "pID":"pm002", "due-date":"2021-06-09T13:50:51.644000Z", "description":"This project updates my old website with a new Bootstrap4 latout.", "percent-complete":".8", "livesite":"http://www.georgelychock-career.com/pages/test/jquery-module/index.html", "milestones": [["Project Launch", "2020-12-09T13:50:51.644000Z"], ["wireframes", "2021-01-31T13:50:51.644000Z"]]}';
var myObj = JSON.parse(myJSON);
$("#widgets-library").html(`<div class="hcolor-2 btncolor-1" id="btn-1">Project: ${myObj.name} <button onclick="turnWidgetOn('${myObj.pID}')">ON BTN</button>
<button onclick="turnWidgetOff('${myObj.pID}')">OFF BTN</button></div>`);
})

/* Get data from JSON file  */
    function getData(url, cb) {

       var xhr = new XMLHttpRequest();

       xhr.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               cb(JSON.parse(this.responseText));
           }
       };
       xhr.open("GET", url);
       xhr.send();
    }

/*Widget Library ON/OFF Buttons */
function turnWidgetOn(widgetID) {
    var elementID = widgetID;
    var title;
    var description;
    var livesite;
    var url = "http://www.georgelychock-career.com/pages/test/jquery-module/data/data1.json";

    getData(url, function(data) {
        description = data.description;
        title = data.name;
        livesite = data.livesite;
    
        return $("#active-widgets-data").append(`<div id="${elementID}"><h3>${title}</h3><p>${description}</p><p>Wireframes: ${livesite}</p>`);
    });
}

function turnWidgetOff(widgetID) {
    var elementID = widgetID;
    return $("#" + elementID).remove();
}
