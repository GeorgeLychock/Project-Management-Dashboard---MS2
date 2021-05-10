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
    var userSettingsOBJ = {};

    // Check if localStorage is enabled
    if (storageAvailable('localStorage')) {
        // YES: We can use localStorage, check if localStorage var has been initiated
        if (!localStorage.getItem(localStoreName)) {
            userSettingsOBJ = {
                scenario: "",
                librarypos: "",
                location: "",
                username: ""
            };
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

        var colorSchemeFinal01 = "";
        var colorScheme = whatColorScheme();
        if (colorScheme != "") {
            colorSchemeFinal01 = " " + colorScheme + "-01";
        }

        // if logged in, then show log out btn and username block
        if (checkSetJSON.username) {
            return $('#pmd-log-btn').html(`
                <div class="pmd-icon-04" data-toggle="modal" onclick="createDeleteUsernameList()" data-target="#logOutPanel">
                    <i class="bi bi-box-arrow-in-left pmd-acolor-1" aria-hidden="true">Log Out</i>
                </div>
                <div class="pmd-username pmd-pcolor-3${colorSchemeFinal01}">${checkSetJSON.username}</div>
            `);
        // else, show user login btn
        } else {
            return $('#pmd-log-btn').html(`
                <div type="button" class="pmd-icon-04" data-toggle="modal" data-target="#loginPanel">
                    <i class="bi bi-box-arrow-in-right pmd-acolor-1${colorSchemeFinal01}" aria-hidden="true"> Login</i>
                </div>
            `);
            }
    // else, show user login btn
    } else {
    return $('#pmd-log-btn').html(`
        <div type="button" class="pmd-icon-04" data-toggle="modal" data-target="#loginPanel">
            <i class="bi bi-box-arrow-in-right pmd-acolor-1${colorSchemeFinal01}" aria-hidden="true"> Login</i>
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

    // Validate data, and if OK, save data
    let validateInputReply = validateInput(passFormData.username, "Name");
    if (validateInputReply == false) {
        return $("#valUserNameAlert01").html("* Required Field");

    } else {

        updateUserSettings("username", passFormData.username);

        //Clear form
        /* CODE REUSE - Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements */
        var x = document.getElementById("loginFormModal");
        for (var i = 0; i < x.length; i++) {
            x.elements[i].value = "";
        }
        return $("#valUserNameAlert01").html(""), $("#pmd-log-btn").append(createUserLoginPanel()), $("#saveUserConfirmModal").html(`
        <div class="pmd-un-confirm">Username Saved!</div>
        `);
    }
}

function clearLogInFormAlerts() {
    return $("#saveUserConfirmModal").html(`
    <div class="pmd-un-confirm">Simulate your login by adding your username
    here.</div>
    `), $("#valUserNameAlert01").html("");
}

function clearLogOutPanelAlerts() {
    return $("#delUserConfirmModal").html("");
}

/* Delete Username Functions */
function createDeleteUsernameList() {
    console.log("Am I getting in?")
    var localStorageName = "userSettings";
    if (localStorage.getItem(localStorageName)) {
        let checkSet = JSON.parse(localStorage.getItem(localStorageName).split(','));
        console.log(checkSet);
        console.log(checkSet.username);
        // Create username button
        return $("#logOutPanelListModal").html(buildUserDelBtnMU(checkSet.username));
    }
}

function buildUserDelBtnMU(un) {

    return `<div class="pmd-btn-library pmd-btncolor-2">
    <button class="pmd-icon-06" onclick="logOut('${un}')">
    <div class="pmd-dinline pmd-acolor-3">${un}</div>
    </button>
    </div>`;
}

function logOut(username) {
    // remove username from localSTorage
    updateUserSettings("username", "");
    createUserLoginPanel();
    return $("#logOutPanelListModal").html(""), $('#delUserConfirmModal').html(`
    <div class="pmd-un-confirm-red">Username Removed!</div>`
    );
}


/* ******* END USER SETTINGS and LOGIN FUNCTIONS JAVASCRIPT ********** */
