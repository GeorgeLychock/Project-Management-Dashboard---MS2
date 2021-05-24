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

            if (activeWidgets[i] == "widget0001") {
                // Grab the api key from the JSON file
                getData(keyURL, function (keydata) {
                    
                    var APIurl = `https://api.openweathermap.org/data/2.5/weather?zip=${keydata.zipcode}&units=imperial&appid=${keydata.key}`;
    
                    // Grab the Open Weather data from the api
                    getData(APIurl, function (owdata) {
                        return $("#active-widgets-data").append(buildWeatherPanelMU(owdata, keydata.widgetID));
                    });
                });
            } else if (activeWidgets[i] == "widget0002") {
                //Build GitHub pavel since widget0002 is assigned to GitHub widget
                return $("#active-widgets-data").append(buildGitHubPanelMU("widget0002"));
            }
        }
    }
}

function createWidgetLibBtns() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord

    if (localStorage.localWidgets) {

        //Search " *Foot Note 1 " in Technical Constraints section of README.md for more info on widgetIDs
        var widgetIDs = ["widget0001", "widget0002"];
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
        var widgetBuildIDs = ["widget0001", "widget0002"]; // else all widgets are available in the library
    }

    for (let i in widgetBuildIDs) {
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + widgetBuildIDs[i] + ".json";
        //Build Library buttons for Desktop and Mobile
        getData(url, function(data) {
            return $("#widgets-library").append(buildWidgetLibBtnMU(data)), $("#usermenu-widgets-library").append(buildWidgetLibBtnMUUsermenu(data));
        });
    }
}

/* Widget Library Add/Remove Buttons */
function turnWidgetOn(widgetIdOn) {

    let elementID = widgetIdOn;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    getData(url, function(data) {

        var keydata = data;

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

        if (keydata.widgetID == "widget0001") {

            // Grab the Open Weather data from the api
            var APIurl = `https://api.openweathermap.org/data/2.5/weather?zip=${keydata.zipcode}&units=imperial&appid=${keydata.key}`;
            getData(APIurl, function(data) {
                //if wid0001 build weather button
                return $("#active-widgets-data").append(buildWeatherPanelMU(data, elementID)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-usermenu-" + elementID).remove();
            });
        } else if (keydata.widgetID == "widget0002") {
            //Build GitHub pavel since widget0002 is assigned to GitHub widget
            return $("#active-widgets-data").append(buildGitHubPanelMU(elementID)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-usermenu-" + elementID).remove();

        }
    });
}

function turnWidgetOff(widgetIdOff) {
    var elementID = widgetIdOff;

        // remove active widgetID from localStorage
        removeWidgetID("localWidgets", elementID);

    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    //Build Library buttons for Desktop and Mobile
    getData(url, function(data) {
        return $("#widgets-library").append(buildWidgetLibBtnMU(data)), $("#usermenu-widgets-library").append(buildWidgetLibBtnMUUsermenu(data));
    });

    // Remove panel from dashboard
    return $("#" + elementID).remove();
}

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
    <i class="bi bi-plus pmd-acolor-5" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-acolor-5 wName${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}

function buildWidgetLibBtnMUUsermenu(data) {

    // Add the viewport code to the ID to make unique ID for mobile library button
    let elementID = data.widgetID;

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
    colorSchemeFinal01 = " " + colorScheme + "-04";
    colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-usermenu-${elementID}">
    <button class="pmd-icon-03" onclick="turnWidgetOn('${elementID}')">
    <i class="bi bi-plus pmd-acolor-5" aria-hidden="true"></i>
    <div class="pmd-lib-btn pmd-acolor-5 wName${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}
/* END Widget Library Add/Remove Buttons */

/* Dashboard Panels */
function buildWeatherPanelMU(owdata, widgetID) {

    var apiData = owdata;
    let bigTemp = apiData.main["temp"];
    bigTemp = bigTemp.toFixed(0);
    var weatherBGClass = "";
    var weatherDesClass = "";

    // Convert time stamp and set styles according to time of day
    timeInfo = Unix_timestamp(apiData.dt);
    var currentTime = timeInfo.fulltime;
    var dayTimeHours = timeInfo.hours;

    // Determine which background to set, night or day
    if(dayTimeHours >= 6 && dayTimeHours <= 18) {
        weatherBGClass = " pmd-weather-icon-bg-day";
        weatherDesClass = " pmd-weather-des-bg-day";
    } else {
        weatherBGClass = " pmd-weather-icon-bg-night";
        weatherDesClass = " pmd-weather-des-bg-night";
    };

    // Create app color scheme selector variables
    var colorSchemeFinal01 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-01";
    }

    return `<div id="${widgetID}" class="col-12 col-md-6 col-lg-6 col-xl-3 pmd-max-width-250">
    <div class="pmd-panel-head">
        <div class="pmd-panel-headtext${colorSchemeFinal01}">
            <div type="button" class="pmd-icon-03" data-toggle="modal" data-target="#openWeatherSettings">
                <i class="bi bi-gear pmd-bi-gear-ow pmd-acolor-1" aria-hidden="true"></i>
            </div>
        </div>
        <div class="pmd-icon-wrapper01" onclick="turnWidgetOff('${widgetID}')">
            <div class="pmd-panel-headtext${colorSchemeFinal01}">Close Panel</div>
        </div>
    </div>
        <div class="pmd-active-ow-widget pmd-bcolor-2">
            <div class="float-right">My Weather</div>
            <h5>${apiData.name}</h5>
            <div>Current Time: ${currentTime}</div>
            <div class="pmd-weather-bg${weatherBGClass}">
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

function buildGitHubPanelMU(widgetID) {

    // Create app color scheme selector variables
    var colorSchemeFinal01 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-01";
    }

    return `<div id="${widgetID}" class="col-12 col-md-6 col-lg-6">
    <div class="pmd-panel-head">
        <div class="pmd-panel-headtext${colorSchemeFinal01}"></div>
        <div class="pmd-icon-wrapper01" onclick="turnWidgetOff('${widgetID}')">
            <div class="pmd-panel-headtext${colorSchemeFinal01}">Close Panel</div>
        </div>
    </div>
        <div class="pmd-active-gh-widget pmd-bcolor-2">
            <div class="row">
                <div class="col">
                    <div class="d-inline pmd-gh-icon"><i class="bi bi-github"></i></div>
                    <div class="d-inline float-right"><h5 class="text-center">Search GitHub Projects</h5></div>
                    <div class="pmd-gh-inputarea">
                        <div class="pmd-gh-inputtext"><input type="text" id="gh-username" value="GeorgeLychock" oninput="fetchGitHubInformation()" /></div>
                        <div class="pmd-gh-inputlabel">Enter a valid GitHub username: </div>
                    </div>
                    <div class="pmd-gh-user-data">
                        <div id="gh-user-data"></div>
                    </div>
                    <div class="pmd-gh-repo-data">
                        <div id="gh-repo-data"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}
/* END Dashboard Panels */

/* Open Weather Custom Functions */
function saveOpenWeatherLocation() {

    let elementID = "widget0001";
    let key = "location";
    var keyURL = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    // grab form data
    let enteredZip = document.getElementById("openWeatherFormModal").elements.namedItem("weatherZipModal").value;
    let enteredLocation = document.getElementById("openWeatherFormModal").elements.namedItem("weatherLocationModal").value;

        console.log(enteredZip, enteredLocation);

    //validate entered zip and location
    let valItemsList = {
        zipcode: enteredZip,
        location: enteredLocation
    };

    console.log("This is the passed object from Open Weather: " + JSON.stringify(valItemsList));

    let validateInputReply = validateInput(valItemsList);

        console.log("This is the array returned to Open Weather: " + validateInputReply);
        console.log("This is the length of the array: " + validateInputReply.length);

    if(validateInputReply.length) {
        for(let i in validateInputReply) {

            console.log("This is looping thru returned array for OPEN WEATHER" + validateInputReply[i]);

            switch(validateInputReply[i]) {
                case 'zipcode':
                    // Set alerts on all required fields
                    $("#valOpenWeatherAlert01").html("* Required Field");
                    break;
                case 'location':
                // Set alert on URL fields
                    $("#valOpenWeatherAlert02").html("* Required Field");
                    break;
            }
        }
    } else {
        //Clear form
        /* CODE REUSE - Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements */
        var x = document.getElementById("openWeatherFormModal");
        for (let i = 0; i < x.length ;i++) {
            x.elements[i].value = "";
        }
        // determine which parameter to pass, zipcode takes precendence
        if(enteredLocation && !enteredZip) {
            var storedLocation = "q=" + enteredLocation;
        } else {
            var storedLocation = "zip=" + enteredZip;
        }

        //update user settings local storage
        updateUserSettings(key, storedLocation);

        //update the weather panel
        // Grab the api key from the JSON file
        getData(keyURL, function (keydata) {
            
            var APIurl = `https://api.openweathermap.org/data/2.5/weather?${storedLocation}&units=imperial&appid=${keydata.key}`;

            // Grab the Open Weather data from the api
            getData(APIurl, function (owdata) {
                return $("#" + elementID).remove(), $("#active-widgets-data").append(buildWeatherPanelMU(owdata, keydata.widgetID));
            });
        });
        return $(".valAlert01").html(""), $("#saveLocalConfirmModal").html("Your location has been updated!");
    }
}
/* END Open Weather Custom Functions */
