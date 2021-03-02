$(document).ready(function() {

createLibraryButtons();
createActiveWidgets();

})

function createActiveWidgets() {
    if (localStorage.localWidgets) {

        let activeWidgetsSaved = localStorage.getItem('localWidgets');
        let activeWidgets = activeWidgetsSaved.split(',');
        let elementID;

        for (let i in activeWidgets) {

            var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + activeWidgets[i] + ".json";
            getData(url, function (data) {

                var widgetData = data;
                elementID = widgetData.widgetID;
                
                /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
                return $("#active-widgets-data").append(`
                    <div id="${elementID}" class="col-3 pmd-max-height-400">
                        <button onclick="turnWidgetOff('${widgetData.widgetID}')"><i class="fas fa-angle-right acolor-2" aria-hidden="true"></i></button>
                        <div class="pmd-active-widget-3col pmd-bcolor-2">
                            <h3>${widgetData.name}</h3>
                            <div>Project Due Date:${widgetData.duedate}</div>
                            <div>Project Owner:${widgetData.owner}</div>
                            <div>${widgetData.description}</div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="${widgetData.percentcomplete}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="${widgetData.cpi}" aria-valuemin="0" aria-valuemax="2"></div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="${widgetData.sv}" aria-valuemin="0" aria-valuemax="2"></div>
                            </div>
                            <div><a href="${widgetData.liveSite}" target="_blank">Development Site Link</a></div>
                        </div>
                    </div>`);
            });
        }
    }
}

function createLibraryButtons() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord

    if (localStorage.localWidgets) {

        //*1 Search " *Foot Note 1 " in Technical Constraints section of README.md

        var widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];
        let activeWidgetsSaved = localStorage.getItem('localWidgets');
        var widgetIDsSaved = activeWidgetsSaved.split(',');
        var widgetBuildIDs = [];

        //Search the locally stored active widget IDs and make an array of available widgets that are not already active

        for (let i in widgetIDs) {
            if (widgetIDsSaved.includes(widgetIDs[i]) == false) {
                widgetBuildIDs.push(widgetIDs[i]);
            }
        }
    } else {
        var widgetBuildIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"]; // else all widgets are available in the library
    }

    for (let i in widgetBuildIDs) {
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + widgetBuildIDs[i] + ".json";
        //Build buttons
        getData(url, function(data) {
            return $("#widgets-library").append(`<div class="pmd-hcolor-2 pmd-btncolor-1" id="widget-btn-${data.widgetID}"><button onclick="turnWidgetOn('${data.widgetID}')"><i class="fas fa-angle-left pmd-acolor-2" aria-hidden="true"></i></button> ${data.name}</div>`);
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
function turnWidgetOn(widgetIdOn) {

    let elementID = widgetIdOn;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    // checking to see if the widget panel has been activated yet
    if ($("#" + elementID).length)  {
        // NO: do nothing but alert user
        return alert("Project already active.");
    } else {
        //YES: get widget JSON data; display panel (widget) in the dashboard viewport; update localStorage var
        getData(url, function(data) {

            let widgetData = data;

            // Check if localStorage is enabled
            if (storageAvailable('localStorage')) {
                // YES: We can use localStorage, check if localStorage var has been initiated
                if (localStorage.localWidgets) {
                    // YES: Add widget ID to the localStorage string and store
                    let activeWidgetsSaved = localStorage.getItem('localWidgets'); //returns a string, comma delimited
                    let activeWidgets = activeWidgetsSaved.split(',');
                    activeWidgets.push(elementID);
                    localStorage.setItem('localWidgets', activeWidgets); //stored as a string, comma delimited

                } else {

                    let activeWidgets = [];
                    activeWidgets.push(elementID);
                    localStorage.setItem('localWidgets', activeWidgets);
                }
            } else {
                // NO: no localStorage
                return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
            }
            // QUERY: This chaining of jQuery calls seems to work, although I haven't found any documentation to date to support it's correct
            // Add widget to the dashboard
            return $("#active-widgets-data").append(`
                    <div id="${elementID}" class="col-3 pmd-max-height-400">
                        <button onclick="turnWidgetOff('${elementID}')"><i class="fas fa-angle-right acolor-2" aria-hidden="true"></i></button>
                        <div class="pmd-active-widget-3col pmd-bcolor-2">
                            <h3>${widgetData.name}</h3>
                            <div>Project Due Date:${widgetData.duedate}</div>
                            <div>Project Owner:${widgetData.owner}</div>
                            <div>${widgetData.description}</div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="${widgetData.percentcomplete}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="${widgetData.cpi}" aria-valuemin="0" aria-valuemax="2"></div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="${widgetData.sv}" aria-valuemin="0" aria-valuemax="2"></div>
                            </div>
                            <div><a href="${widgetData.livesite}" target="_blank">Development Site Link</a></div>
                        </div>
                    </div>
                    `), $("#widget-btn-" + elementID).remove();
        });
    }
}

function turnWidgetOff(widgetIdOff) {
    var elementID = widgetIdOff;
    // remove widget from localStorage
    let activeWidgetsSaved = localStorage.getItem('localWidgets');
    let activeWidgets = activeWidgetsSaved.split(',');
    activeWidgets.pop(elementID);
    localStorage.setItem('localWidgets', activeWidgets);

    // **** This should be replaced by a function, see duplication in buildLibraryButtons(), Build Button and add to Library
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    getData(url, function(data) {
        return $("#widgets-library").append(`<div class="hcolor-2 btncolor-1" id="widget-btn-${data.widgetID}"><button onclick="turnWidgetOn('${data.widgetID}')"><i class="fas fa-angle-left acolor-2" aria-hidden="true"></i></button> ${data.name}</div>`);
    });

    // Remove panel from dashboard
    return $("#" + elementID).remove();
}
