/* George Lychock - MS2 Main Javascript File */
/* This file is for common js functions called by other custom functions */

$(document).ready(function() {


})


/* ******* Reused js ********** */

/* Get data from JSON file  */
/* CODE REUSE - XMLHttpRequest Callback, Code Institute, jQuery/API Module  */
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
/* /CODE REUSE - XMLHttpRequest Callback, Code Institute, jQuery/API Module  */

/* CODE REUSE - localStorage Check MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */
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
/* /CODE REUSE - localStorage Check MDN*/

/* CODE REUSE - Covert UNIX Timestamp https://www.w3resource.com/javascript-exercises/javascript-date-exercise-17.php */
function Unix_timestamp(t) {
    var timeMer = "";
    var dt = new Date(t * 1000);
    var hr = dt.getHours() - 12;
    var dhr = dt.getHours();
    if (dt.getHours <= 12) { //custom js added by developer
        timeMer = "AM";
    } else {
        timeMer = "PM";
    };
    var m = "0" + dt.getMinutes();
    //custom js added by developer; create and return timestamp object
    let currentTimeObj = {
        fulltime: hr + ':' + m.substr(-2) + ' ' + timeMer,
        hours: dhr
    }
    return currentTimeObj;
}
/* CODE REUSE - Covert UNIX Timestamp */



/* ******* END Reused js ********** */

/* ******* Custom Common js ********** */
function convertViewportWidth() {
    let bodyWidth = $("body").width();
    if (bodyWidth < 768) {
        viewportID = "sm";
        return viewportID;
    } else {
        viewportID = "";
        return viewportID;
    }
}

function setProjectIDs(localName, wID) {
    var localStoreName = localName;
    let widgetID = wID;

        // Check if localStorage is enabled
        if (storageAvailable('localStorage')) {
            // YES: We can use localStorage, check if localStorage var has been initiated
            if(localStorage.getItem(localStoreName)) {
                // YES: Add widget ID to the localStorage string and store
                let projectIDsToSave = localStorage.getItem(localStoreName).split(','); //returns a string, comma delimited, convert to array
                projectIDsToSave.push(widgetID);
                localStorage.setItem(localStoreName, projectIDsToSave); //stored as a string, comma delimited
            } else {
                // Initiate localStorage and add project ID
                let projectIDsToSave = [];
                projectIDsToSave.push(widgetID);
                localStorage.setItem(localStoreName, projectIDsToSave);
            }
        } else {
            // NO: no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
        }
    }

function setLocalStorageData(wID, pFD) {

    var localStoreDataID = wID; //using the unique widget ID to create a localStorage object
    var passFormData = pFD;

    // Check if localStorage is enabled
    if (storageAvailable('localStorage')) {
        // YES: We can use localStorage, check if localStorage var has been initiated
        if(localStorage.getItem(localStoreDataID)) {
            // YES: Update project data
            projectDataStr = JSON.stringify(passFormData);
            localStorage.setItem(localStoreDataID, projectDataStr);
            alert("This only gets fired if the project data needs to be updated; functionality TK");
        } else {
            // Initiate localStorage using the widgetID for the localStorage object name and add project data
            projectDataStr = JSON.stringify(passFormData);
            localStorage.setItem(localStoreDataID, projectDataStr);
        }
    } else {
        // NO: no localStorage
        return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
    }
}


/* ******* END Custom Common js ********** */


/* ******* Custom Style js ********** */

function makeDark() {
    $("body").addClass('make-dark');
    $(".pmd-panel-head-text").addClass('make-dark-01');
    $(".pmd-w-library").addClass('make-dark-02');
    $(".pmd-banner").addClass('make-dark-03');
    $(".pmd-btn-library").addClass('make-dark-04');
    $(".wName").addClass('make-dark-01');
}

function makeLight() {
    $("body").removeClass('make-dark');
    $(".pmd-panel-head-text").removeClass('make-dark-01');
    $(".pmd-w-library").removeClass('make-dark-02');
    $(".pmd-banner").removeClass('make-dark-03');
    $(".pmd-btn-library").removeClass('make-dark-04');
    $(".wName").removeClass('make-dark-01');
}

/* ******* END Custom Style js ********** */