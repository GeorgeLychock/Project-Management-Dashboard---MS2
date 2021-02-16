$(document).ready(function() {
    
createLibraryButtons();

})

function createLibraryButtons() {

    var title;
    var description;
    var livesite;
    var pID;
    var url = "http://www.georgelychock-career.com/pages/test/jquery-module/data/data1.json";

    getData(url, function(data) {
        description = data.description;
        title = data.name;
        livesite = data.livesite;
        pID = data.pID;

    return $("#widgets-library").html(`<div class="hcolor-2 btncolor-1" id="btn-1">Project: ${data.name} <button onclick="turnWidgetOn('${data.pID}')">ON BTN</button>
    <button onclick="turnWidgetOff('${data.pID}')">OFF BTN</button></div>`);
    });

}

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
