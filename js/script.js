$(document).ready(function() {

createLibraryButtons();

})

function createLibraryButtons() {

    let widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];

    for (let i in widgetIDs) {
        let url = "http://www.georgelychock-career.com/pages/_sandbox/jquery-module/data/" + widgetIDs[i] + ".json";

        getData(url, function(data) {
            return $("#widgets-library").append(`<div class="hcolor-2 btncolor-1" id="btn-1">Project: ${data.name} <button onclick="turnWidgetOn('${data.pID}')">ON BTN</button>
            <button onclick="turnWidgetOff('${data.pID}')">OFF BTN</button></div>`);
        });
    }    
}

/* Get data from JSON file  */
/* CODE REUSE - Code Institute, jQuery/API Module  */
    function getData(url, gd) {

       var xhr = new XMLHttpRequest();

       xhr.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               gd(JSON.parse(this.responseText));
           }
       };
       xhr.open("GET", url);
       xhr.send();
    }
/* /CODE REUSE - Code Institute, jQuery/API Module  */

/* Widget Library ON/OFF Buttons */
function turnWidgetOn(widgetID) {
    let elementID = widgetID;
    let title;
    let description;
    let livesite;
    let url = "http://www.georgelychock-career.com/pages/_sandbox/jquery-module/data/" + elementID + ".json";

    // checking to see if the widget panel has been activated yet
    if ($("#" + elementID).length)  {
        // No: do nothing but alert user
        return alert("Project already active.");
    } else {
        //yes: get data and display panel (widget) in the dashboard viewport
        getData(url, function(data) {
            description = data.description;
            title = data.name;
            livesite = data.livesite;
        
            return $("#active-widgets-data").append(`<div id="${elementID}" class="col-3 max-height-400"><div class="active-widget-3 bcolor-2"><h3>${title}</h3><p>${description}</p><p>Live Site Links: ${livesite}</p></div></div>`);
        });
    }
}

function turnWidgetOff(widgetID) {
    let elementID = widgetID;
    return $("#" + elementID).remove();
}
