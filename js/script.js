$(document).ready(function() {

createLibraryButtons();
createActiveWidgets();

})

function createActiveWidgets() {
    if (localStorage.localWidgets) {

        let activeWidgetsSaved = localStorage.getItem('localWidgets');
        let activeWidgets = activeWidgetsSaved.split(',');
        let elementID;
        let title;
        let description;
        let livesite;

        for (let i in activeWidgets) {

            var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + activeWidgets[i] + ".json";
            getData(url, function (data) {
                elementID = data.pID;
                description = data.description;
                title = data.name;
                livesite = data.livesite;
                return $("#active-widgets-data").append(`<div id="${elementID}" class="col-3 max-height-400"><div class="active-widget-3 bcolor-2"><h3>${title}</h3><p>${description}</p><p>Live Site Links: ${livesite}</p></div></div>`);
            });
        }
    }
}

function createLibraryButtons() {

    let widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];

    for (let i in widgetIDs) {
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + widgetIDs[i] + ".json";

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

/* CODE REUSE - MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */
/* Checks to make sure localStorage is usuable in the browser */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
/* /CODE REUSE - MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */

/* Widget Library ON/OFF Buttons */
function turnWidgetOn(widgetID) {
    
    let elementID = widgetID;
    let title;
    let description;
    let livesite;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    // checking to see if the widget panel has been activated yet
    if ($("#" + elementID).length)  {
        // No: do nothing but alert user
        return alert("Project already active.");
    } else {
        //yes: get widget JSON data and display panel (widget) in the dashboard viewport
        getData(url, function(data) {

            description = data.description;
            title = data.name;
            livesite = data.livesite;

            // Check if localStorage is usable
            if (storageAvailable('localStorage')) {
                // YES: We can use localStorage, Add widget ID to the localStorage array and store
                if (localStorage.localWidgets) {

                    let activeWidgetsSaved = localStorage.getItem('localWidgets');
                    let activeWidgets = activeWidgetsSaved.split(',');
                    activeWidgets.push(elementID);
                    localStorage.setItem('localWidgets', activeWidgets);

                } else {

                    let activeWidgets = [];
                    activeWidgets.push(elementID);
                    localStorage.setItem('localWidgets', activeWidgets);
                }
            }
            else {
                // NO: no localStorage
                return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
            }

            return $("#active-widgets-data").append(`<div id="${elementID}" class="col-3 max-height-400"><div class="active-widget-3 bcolor-2"><h3>${title}</h3><p>${description}</p><p>Live Site Links: ${livesite}</p></div></div>`);
        });
    }
}

function turnWidgetOff(widgetID) {
    var elementID = widgetID;
    let activeWidgetsSaved = localStorage.getItem('localWidgets');
    let activeWidgets = activeWidgetsSaved.split(',');
    activeWidgets.pop(elementID);
    localStorage.setItem('localWidgets', activeWidgets);

    return $("#" + elementID).remove();
}
