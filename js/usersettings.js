$(document).ready(function() {
    createUserLoginPanel();
})

/* ******* USER SETTINGS and LOGIN FUNCTIONS JAVASCRIPT ********** */

function updateUserSettings(key, value) {

    var setKey = key;
    var setValue = value;
    var localStoreName = "userSettings";
    var userSettingsStr;
    // The user setting object will contain all user preferences for the predefined customization features
    var userSettingsOBJ = {
        scenario: "",
        librarypos: "",
        location: "",
        username: ""
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
            case 'location': userSettingsOBJ.location = setValue;
            break;
            case 'username': userSettingsOBJ.username = setValue;
            break;
        }
    // Save the user settings in localStorage
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
        switch (setScenario) {
            case "dark": makeDark();
            break;
            case "light": makeLight();
            break;
        }
        // set library position
        let setPosition = checkSetJSON.librarypos;
        switch (setPosition) {
            case "right": posLibRight();
            break;
            case "left": posLibLeft();
            break;
        }
        // set username
        let setUserName = checkSetJSON.username;
        //if username is empty, show default avatar "?"
        //do not show anything in username div
        // else if username, show username in div
        // show avatar
        console.log(setUserName);
    } else {
        console.log("No user settings exist yet");
    }
}

function createUserLoginPanel() {
    // check if user is logged in
    //see if there is a user setting local obj saved
    var localStoreName = "userSettings";

    if (localStorage.getItem(localStoreName)) {
        // yes, grab data
        let checkSet = localStorage.getItem(localStoreName).split(',');
        var checkSetJSON = JSON.parse(checkSet);
        // if logged in, then show log out btn and username block
        if (checkSetJSON.username) {
            return $('#pmd-log-btn').html(`
                <div type="button" class="pmd-icon-04" data-toggle="modal" data-target="#logOutPanel">
                    <i class="bi bi-box-arrow-in-left pmd-acolor-1" aria-hidden="true"></i>
                    Log Out
                </div>
                <div class="pmd-username pmd-pcolor-3">User: ${checkSetJSON.username}</div>
            `);
        // else, show user login btn
        } else {
            return $('#pmd-log-btn').html(`
                <div type="button" class="pmd-icon-04" data-toggle="modal" data-target="#loginPanel">
                    <i class="bi bi-box-arrow-in-right pmd-acolor-1" aria-hidden="true"></i>
                    Login
                </div>
            `);
            }
    // else, show user login btn
    } else {
    return $('#pmd-log-btn').html(`
        <div type="button" class="pmd-icon-04" data-toggle="modal" data-target="#loginPanel">
            <i class="bi bi-box-arrow-in-right pmd-acolor-1" aria-hidden="true"></i>
            Login
        </div>
    `);
    }
}

function saveUserNameModal() {

    var passFormData = {
        username: ""
    };

    //grab input form data from modal
    passFormData.username = document.getElementById("loginFormModal").elements.namedItem("userNameModal").value;
    console.log(passFormData.username);

    // Validate data, and if OK, save data
    let validateInputReply = validateInput(passFormData.username, "Name");
    if (validateInputReply == false) {
        return $("#valUserNameAlert01").html("* Required Field");

    } else {

        updateUserSettings("username", passFormData.username);

        //Clear form
        /* CODE REUSE - Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements */
        var x = document.getElementById("loginFormModal");
        for (var i = 0; i < x.length ;i++) {
        x.elements[i].value = "";
        }
        return $("#valUserNameAlert01").html(""), $("#pmd-log-btn").append(createUserLoginPanel());
    }
}

function clearLogInFormAlerts() {
    return $("#saveUserConfirmModal").html(""), $("#valUserNameAlert01").html("");
}

function logOut() {
    // remove username from localSTorage
}


/* ******* END USER SETTINGS and LOGIN FUNCTIONS JAVASCRIPT ********** */
