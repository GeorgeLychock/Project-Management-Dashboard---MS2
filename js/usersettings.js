$(document).ready(function() {

})

/* ******* USER SETTINGS FUNCTIONS JAVASCRIPT ********** */

function updateUserSettings(key, value) {

    var setKey = key;
    var setValue = value;
    var localStoreName = "userSettings";
    var userSettingsStr;
    // The user setting object will contain all user preferences for the predefined customization features
    var userSettingsOBJ = {
        scenario: "",
        librarypos: ""
    };

    // Check if localStorage is enabled
    if (storageAvailable('localStorage')) {
        // YES: We can use localStorage, check if localStorage var has been initiated
        if (!localStorage.getItem(localStoreName)) {
            userSettingsStr = JSON.stringify(userSettingsOBJ);
            localStorage.setItem(localStoreName, userSettingsStr);

        } else {
            let userSettingsJSON = localStorage.getItem(localStoreName).split(',');
            userSettingsOBJ = JSON.parse(userSettingsJSON);
        }

        // Find the key in the user settings object and change value
        switch (setKey) {
            case 'scenario': userSettingsOBJ.scenario = setValue;
            break;
            case 'librarypos': userSettingsOBJ.librarypos = setValue;
            break;
        }

    userSettingsStr = JSON.stringify(userSettingsOBJ);
    localStorage.setItem(localStoreName, userSettingsStr);
    }
}

function loadUserSettings() {

    //see if there is a user setting local obj saved
    var localStoreName = "userSettings";

    if (localStorage.getItem(localStoreName)) {
        // if so, grab data
        let checkSet = localStorage.getItem(localStoreName).split(',');
        var checkSetJSON = JSON.parse(checkSet);

        // set scenario
        let setScenario = checkSetJSON.scenario;
        console.log(setScenario);
        switch (setScenario) {
            case "dark": makeDark();
            break;
            case "light": makeLight();
            break;
        }
        // set library position
        let setPosition = checkSetJSON.librarypos;
        console.log(setPosition);
        switch (setPosition) {
            case "right": posLibRight();
            break;
            case "left": posLibLeft();
            break;
        }

    } else {
        console.log("localStore Does Not exist");
    }
}

/* ******* END USER SETTINGS FUNCTIONS JAVASCRIPT ********** */
