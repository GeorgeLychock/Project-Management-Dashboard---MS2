/* George Lychock - MS2 Main Javascript File */
/* This file is for common js functions called by other custom functions */

$(document).ready(function() {

})

/* CONSTANTS */
const JSONFolderURL = "data/";


/* ******* REUSED JAVASCRIPT ********** */

    /* f0001 Get data from JSON file  */
    /* CODE REUSE - customized, see README.md */
    async function getData(url) {

        let fetchConfig = {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
              },
        };

        var fetchResponse = await fetch(url, fetchConfig)
        .catch(function(error) {
        });
        return fetchResponse.json();
      }

      async function getOWData(url) {
        let fetchResponse = await fetch(url);
        return fetchResponse.json();
      }

    /* Check to make sure localStorage is usuable in the browser */
    /* CODE REUSE - localStorage Check MDN, see README.md  */
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

    /* f002 Converts timestamp for display; captures AM/PM to control weather background
    /* CODE REUSE - Convert UNIX Timestamp */
    function Unix_timestamp(t) {
        var timeMer = "";
        var dhr = "";
        var dt = new Date(t * 1000);
        var hr = dt.getHours();
        if (hr < 12) { //custom js added by developer
            timeMer = "AM";
            if (hr == 0) {
                dhr = 12;
            } else {
                dhr = hr;
            }
        } else {
            timeMer = "PM";
            if (hr == 12) {
                dhr = 12;
            } else {
                dhr = hr - 12;
            }
        }

        var m = "0" + dt.getMinutes();

        //custom js added by developer; create and return timestamp object
        let currentTimeObj = {
            fulltime: dhr + ':' + m.substr(-2) + ' ' + timeMer,
            hours: hr
        };
        return currentTimeObj;
    }

    /* CODE REUSE - Toastr Setup */
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        };


/* ******* END REUSED JAVASCRIPT ********** */



/* ******* CUSTOM LISTENING EVENTS JAVASCRIPT ********** */

    // settings cog hint styling, highlights any settings cog on the dashboard when a user hovers the instruction text
        $(".pmd-cog-instructions").mouseenter(function() {
            $(".bi-gear").addClass("pmd-cog-show");
            $(".pmd-bi-gear").html('<span class="pmd-cog-msgbox"><i class="bi bi-arrow-left-short"></i></span>');
            $(".pmd-bi-gear-ow").html('<span class="pmd-cog-msgbox-2"><i class="bi bi-arrow-left-short"></i></span>');
        });
        $(".pmd-cog-instructions").mouseleave(function() {
            $(".bi-gear").removeClass("pmd-cog-show");
            $(".pmd-bi-gear").html("<span></span>");
            $(".pmd-bi-gear-ow").html("<span></span>");
        });


/* ******* END CUSTOM LISTENING EVENTS JAVASCRIPT ********** */



/* ******* CUSTOM COMMON JAVASCRIPT ********** */

    function convertViewportWidth() {
        var bodyWidth = $("body").width();
        if (bodyWidth < 768) {
            let viewportID = "sm";
            return viewportID;
        } else {
            let viewportID = "";
            return viewportID;
        }
    }

    function getLocalData(eID, cb) {
        var elementID = eID;

        let dataStrSaved = localStorage.getItem(elementID);

        cb(JSON.parse(dataStrSaved));
    }

    function setProjectIDs(localName, wID) {
        var localStoreName = localName;
        var widgetID = wID;

        // Check if localStorage is enabled
        if (storageAvailable('localStorage')) {
            // We can use localStorage, check if localStorage var has been initiated
            if (localStorage.getItem(localStoreName)) {
                // Add widget ID to the localStorage string and store
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
            // no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
        }
    }

    function setLocalStorageData(wID, pFD) {

        var localStoreDataID = wID; //using the unique widget ID to create a localStorage object
        var passFormData = pFD;

        // Check if localStorage is enabled
        if (storageAvailable('localStorage')) {
            // We can use localStorage, check if localStorage var has been initiated
            if(localStorage.getItem(localStoreDataID)) {
                // Update project data
                let projectDataStr = JSON.stringify(passFormData);
                localStorage.setItem(localStoreDataID, projectDataStr);
                alert("This only gets fired if the project data needs to be updated; functionality TK");
            } else {
                // Initiate localStorage using the widgetID for the localStorage object name and add project data
                let projectDataStr = JSON.stringify(passFormData);
                localStorage.setItem(localStoreDataID, projectDataStr);
            }
        } else {
            // no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
        }
    }

    function removeWidgetID(storeName, uID) {
        //removes widget IDs from all storage objects
        let localStorageName = storeName;
        var elementID = uID;
        // ****** EFFICIENCY MARKER ******* Need to research turning this into an arrow function(s)
        if (localStorage.getItem(localStorageName)) {
            let savedWidgetIDs = localStorage.getItem(localStorageName).split(',');
            let delWidgetIndex = savedWidgetIDs.indexOf(elementID);
            var removedWidgetIDs = savedWidgetIDs.splice(delWidgetIndex, 1);

            localStorage.setItem(localStorageName, savedWidgetIDs);

        } // else capture error, if needed
    }

    function whatColorScheme() {
        // Determine if a color scheme has been applied to the main element yet
        var mainClasses;
          if (mainClasses = $("main").attr("class")) {
              if (mainClasses != "") {
                  let schemeID = mainClasses.split(" ");
                  for (var i in schemeID) {
                      if (schemeID[i] == "make-dark") {
                          return schemeID[i];
                      } else {
                          return "";
                      }
                  }
              } else {
                  return "";
              }
          } else {
              return "";
          }
      }
      
    /* f004 */
    function validateInput(vi) {
        // Validate any input from the user. Intention is to centralize validation processing of any user input.
        var valItemsList = vi;
        var valItemsFailed = [];
        // clear prior alerts
        $(".valAlert01").html("");

        for(let i in valItemsList) { 
            switch (i) {
                case 'name':
                    // Validation Rule #1
                    if (valItemsList[i] == "") {
                        valItemsFailed.push("name");
                    // Validation Rule #2, check against a list of bad words and/or a reg exp to further sanitize data (this validation has not been finished yet but logic has been added to expand in future)
                    } else if (valItemsList[i] == "badword") {
                        alert(i + " should be nicer.");
                        valItemsFailed.push("name");
                    }
                    break;
                case 'url':
                    // Validation Rule #1, need to add a reg exp here to validate url
                    if (valItemsList[i] == "badurl") {
                        valItemsFailed.push("url");
                    }
                    break;
                case 'username':
                    // Validation Rule #1
                    if (valItemsList[i] == "") {
                        valItemsFailed.push("username");
                    // Validation Rule #2
                    } else if (valItemsList[i] == "badword") {
                        alert(i + " should be nicer.");
                        valItemsFailed.push("username");
                    }
                    break;
                // currently the following two cases check for the same result, future additional rules can be added targeting specific criteria for each field
                case 'zipcode':
                    // Validation Rule #1
                    
                    if (valItemsList.zipcode == "" && valItemsList.location == "") {
                        valItemsFailed.push("zipcode");
                    }
                    break;
                case 'location':
                    // Validation Rule #1
                    if (valItemsList.location == "" && valItemsList.zipcode == "") {
                        valItemsFailed.push("location");
                    }
                    break;
            }
        }
        return valItemsFailed;
    }

/* ******* END CUSTOM COMMON JAVASCRIPT ********** */


/* ******* CUSTOM STYLE JAVASCRIPT ********** */

    function makeDark() {
        $("body").addClass('make-dark');
        $("main").addClass('make-dark');
        $(".pmd-panel-headtext").addClass('make-dark-01');
        $(".pmd-w-library").addClass('make-dark-02');
        $(".pmd-banner").addClass('make-dark-03');
        $(".wName").addClass('make-dark-01');
        $(".pmd-hcolor-1").addClass('make-dark-01');
        $(".pmd-weather-desc").addClass('make-weather-dark-01');
        $(".pmd-username").addClass('make-dark-01');
        $(".pmd-dashboard").addClass('make-dark-05');
        $(".pmd-usermenu-lib-btn").addClass('make-dark-01');
        $(".pmd-banner-msg-01").addClass('make-dark-07');
        $(".pmd-tooltiptext").addClass('make-dark-06');
        $(".pmd-login").addClass('make-dark-01');
        
        updateUserSettings("scenario", "dark");
    }

    function makeLight() {
        $("body").removeClass('make-dark');
        $("main").removeClass('make-dark');
        $(".pmd-panel-headtext").removeClass('make-dark-01');
        $(".pmd-w-library").removeClass('make-dark-02');
        $(".pmd-banner").removeClass('make-dark-03');
        $(".wName").removeClass('make-dark-01');
        $(".pmd-hcolor-1").removeClass('make-dark-01');
        $(".pmd-username").removeClass('make-dark-01');
        $(".pmd-dashboard").removeClass('make-dark-05');
        $(".pmd-usermenu-lib-btn").removeClass('make-dark-01');
        $(".pmd-banner-msg-01").removeClass('make-dark-07');
        $(".pmd-tooltiptext").removeClass('make-dark-06');
        $(".pmd-login").removeClass('make-dark-01');
        
        updateUserSettings("scenario", "light");
    }

    function posLibRight() {
        $(".pmd-w-library").addClass('order-10');
        $(".pmd-dashboard-vp").addClass('pmd-lib-right-fix');
        updateUserSettings("librarypos", "right");
    }

    function posLibLeft() {
        $(".pmd-w-library").removeClass('order-10');
        $(".pmd-dashboard-vp").removeClass('pmd-lib-right-fix');
        updateUserSettings("librarypos", "left");
    }

/* ******* END CUSTOM STYLE JAVASCRIPT ********** */

