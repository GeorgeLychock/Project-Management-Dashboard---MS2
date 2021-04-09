/* George Lychock - MS2 Widgets Javascript File */
/* This file is used to build all the widget elements on the dashboard and library */
/* Widgets can be Tools such as a calendar or weather app or To-Do list app */

$(document).ready(function() {

    createActiveWidgets();
    createWidgetLibBtns();

})

function createActiveWidgets() {

    if (localStorage.localWidgets) {

        let activeWidgetsSaved = localStorage.getItem('localWidgets');
        let activeWidgets = activeWidgetsSaved.split(',');

        for (let i in activeWidgets) {

            var keyURL = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + activeWidgets[i] + ".json";

            // Grab the api key from the JSON file
            getData(keyURL, function (keydata) {
                
                APIurl = `https://api.openweathermap.org/data/2.5/weather?zip=${keydata.zipcode}&units=imperial&appid=${keydata.key}`;

                // Grab the Open Weather data from the api
                getData(APIurl, function (owdata) {
                    return $("#active-widgets-data").append(buildWidgetPanelMU(owdata, keydata.widgetID));
                });
            });
        }
    }
}

function createWidgetLibBtns() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord

    if (localStorage.localWidgets) {

        //Search " *Foot Note 1 " in Technical Constraints section of README.md for more info on widgetIDs
        var widgetIDs = ["widget0001"];
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
        var widgetBuildIDs = ["widget0001"]; // else all widgets are available in the library
    }

    for (let i in widgetBuildIDs) {
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + widgetBuildIDs[i] + ".json";
        //Build Library buttons for Desktop and Mobile
        getData(url, function(data) {
            return $("#widgets-library").append(buildWidgetLibBtnMU(data)), $("#mobile-widgets-library").append(buildWidgetLibBtnMUMobile(data));
        });
    }
}

/* Widget Library ON/OFF Buttons */
function turnWidgetOn(widgetIdOn, vpcodepass) {

    let elementID = widgetIdOn;
    let vpcode = vpcodepass;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    getData(url, function(data) {

        let keydata = data;

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
                // Initiate localStorage and add widget ID
                let activeWidgets = [];
                activeWidgets.push(elementID);
                localStorage.setItem('localWidgets', activeWidgets);
            }
        } else {
            // NO: no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The widget Management Dashboard in a new browser window.");
        }

        // Grab the Open Weather data from the api
        APIurl = `https://api.openweathermap.org/data/2.5/weather?zip=${keydata.zipcode}&units=imperial&appid=${keydata.key}`;

        getData(APIurl, function (owdata) {
        // Add widget to the dashboard and remove the library buttons from both Desktop and Mobile views
            return $("#active-widgets-data").append(buildWidgetPanelMU(owdata, elementID)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-" + vpcode + "-" + elementID).remove();
        });
    });
}

function turnWidgetOff(widgetIdOff) {
    var elementID = widgetIdOff;
    // remove widget from localStorage
    let activeWidgetsSaved = localStorage.getItem('localWidgets');
    let activeWidgets = activeWidgetsSaved.split(',');
    activeWidgets.pop(elementID);
    localStorage.setItem('localWidgets', activeWidgets);

    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    //Build Library buttons for Desktop and Mobile
    getData(url, function(data) {
        return $("#widgets-library").append(buildWidgetLibBtnMU(data)), $("#mobile-widgets-library").append(buildWidgetLibBtnMUMobile(data));
    });

    // Remove panel from dashboard
    return $("#" + elementID).remove();
}

function buildWidgetPanelMU(owdata, widgetID) {

    var apiData = owdata;
    let bigTemp = apiData.main["temp"];
    bigTemp = bigTemp.toFixed(0);
    var weatherBGClass = "";
    var weatherDesClass = "";

    timeInfo = Unix_timestamp(apiData.dt);
    var currentTime = timeInfo.fulltime;
    var dayTimeHours = timeInfo.hours;

    if(dayTimeHours >= 6 && dayTimeHours <= 18) {
        weatherBGClass = " pmd-weather-icon-bg-day";
        weatherDesClass = " pmd-weather-des-bg-day";
    } else {
        weatherBGClass = " pmd-weather-icon-bg-night";
        weatherDesClass = " pmd-weather-des-bg-night";
    };

    // Create color scheme selector variables
    var colorSchemeFinal01 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-01";
    }

    /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
    return `<div id="${widgetID}" class="col col-md-3 pmd-max-width-250">
    <div class="pmd-panel-head">
        <div class="pmd-icon-wrapper01" onclick="turnWidgetOff('${widgetID}')">
            <div class="pmd-panel-headtext${colorSchemeFinal01}"></div>
            <div class="float-right"><div class="pmd-panel-headtext${colorSchemeFinal01}">Close Panel</div><i class="bi bi-x-circle pmd-icon-01 pmd-acolor-1" aria-hidden="true"></i></div>
        </div>
    </div>
        <div class="pmd-active-widget pmd-bcolor-2">
            <div class="float-right">My Weather</div>
            <h5>${apiData.name}</h5>
            <div>Current Time: ${currentTime}</div>
            <div class="${weatherBGClass}">
                <div class="d-inline"><img src="http://openweathermap.org/img/wn/${apiData.weather[0]["icon"]}@2x.png"></div>
                <div class="pmd-weather-temp">${bigTemp} &#176;</div>
                <div class="pmd-weather-desc${weatherDesClass}">
                <div class="pmd-bg-water"><img src="images/waves-bg-01.png" width="50px" alt="Waves in the background"></div>
                    <div>
                        <div class="pmd-pcolor-1">Currently: ${apiData.weather[0]["main"]}</div>
                        <div class="pmd-pcolor-1">with ${apiData.weather[0]["description"]}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>`;
}

// These next two (2) functions can be made common if we pass the onClick function name from the calling function
function buildWidgetLibBtnMU(data) {

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
    colorSchemeFinal01 = " " + colorScheme + "-04";
    colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-${data.widgetID}">
    <button class="pmd-icon-03" onclick="turnWidgetOn('${data.widgetID}')">
    <i class="bi bi-plus-circle pmd-acolor-2" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-acolor-1 wName${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}

function buildWidgetLibBtnMUMobile(data) {

    let vpcode = convertViewportWidth();
    // Add the viewport code to the ID to make unique ID for mobile library button
    let elementID = vpcode + "-" + data.widgetID;

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-${elementID}">
    <button class="pmd-icon-03" onclick="turnWidgetOn('${data.widgetID}', '${vpcode}')">
    <i class="bi bi-plus-circle pmd-acolor-2" aria-hidden="true"></i>
    <div class="pmd-dinline pmd-acolor-1">${data.name}</div>
    </button>
    </div>`;
}
