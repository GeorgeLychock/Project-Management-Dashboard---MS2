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
/* /CODE REUSE - MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */


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