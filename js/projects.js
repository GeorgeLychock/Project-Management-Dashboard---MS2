/* George Lychock - MS2 Projects Javascript File */
/* This file is used to build all the project elements on the dashboard and library */
/* All reused and custom scripts are located in script.js. */

$(document).ready(function() {
    createProjectLibBtns();
    createActiveProjects();
    loadUserSettings();
    setDefaultOwner();
})

function createActiveProjects() {
    if (localStorage.activeProjects) {

        var projectBuildIDs = localStorage.getItem('activeProjects').split(',');

        // Build project panels activated on the dashboard based on widgetIDs saved
        for (let i in projectBuildIDs) {

            var elementID = projectBuildIDs[i];

            // If the widget data is stored locally...
            if (localStorage.getItem(elementID)) {
                // YES: Retrieve data and build he panel
                getLocalData(elementID, function(localData) {
                    return $("#active-projects-data").append(buildProjectPanelMU(localData));
                });
            } else {
                //NO: then the data is default JSON data, retrieve and build panel
                var url = JSONFolderURL + elementID + ".json";
                getData(url)
                .then(data => {
                    return $("#active-projects-data").append(buildProjectPanelMU(data));
                });
            }
        }
        loadUserSettings();
    }
}

function createProjectLibBtns() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord
    if (localStorage.activeProjects) {

        //Retrieve all available project IDs
        var widgetIDs = localStorage.getItem('allProjectIDs').split(',');

        //Retrieve all activated project IDs
        var projectIDsSaved = localStorage.getItem('activeProjects').split(',');
        var projectBuildIDs = [];

        //Search the locally stored active widget IDs and make an array of available widgets that are NOT already active
        for (let i in widgetIDs) {
            if (projectIDsSaved.includes(widgetIDs[i]) == false) {
                projectBuildIDs.push(widgetIDs[i]);
            }
        }
    } else if (localStorage.allProjectIDs) {
        //No panels have been activated yet so retrieve all available project IDs
        var projectBuildIDs = localStorage.getItem('allProjectIDs').split(',');
    } else {
        //Default projects. Search " *Foot Note 1 " in Technical Constraints section of README.md for more info on widgetIDs
        var projectBuildIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"]; // else all default widgets are available in the library, no custom ones have been added yet
        localStorage.setItem('allProjectIDs', projectBuildIDs);
    }

    // Build Library buttons based on widgetIDs not already activated to the dashboard
    for (let i in projectBuildIDs) {

        var elementID = projectBuildIDs[i];

        // If the widget data is stored locally...
        if(localStorage.getItem(elementID)) {
            // YES: Retrieve data and rebuild the library button, and remove project panel from dashboard
            getLocalData(elementID, function(localData) {
                return $("#projects-library").append(buildProjectLibBtnMU(localData)), $("#usermenu-projects-library").append(buildProjectLibBtnMUUsermenu(localData));
            });
        } else {
            //NO: then the data is default data stored in JSON, retrieve data and rebuild library button, and remove project panel from dashboard
            var url = JSONFolderURL + elementID + ".json";
            getData(url)
            .then(data => {
                return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#usermenu-projects-library").append(buildProjectLibBtnMUUsermenu(data));
            });
        }
    }
}

/* Project Library Buttons */
function turnProjectOn(widgetIdOn) {

    let elementID = widgetIdOn;

    //is the widgetID is a locally stored object...
    if(localStorage.getItem(elementID)) {
        // YES: Save widgetID to localStorage and get local project data
        var localStoreName = "activeProjects";
        setProjectIDs(localStoreName, elementID);
        getLocalData(elementID, function(localData) {
        // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            return $("#active-projects-data").append(buildProjectPanelMU(localData)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-usermenu-" + elementID).remove();
        });
    } else {
        //NO: if not a locally stored data, get data from JSON
        var url = JSONFolderURL + elementID + ".json";

            getData(url)
            .then(data => {
    
            // Save widgetID to localStorage
            var localStoreName = "activeProjects";
            setProjectIDs(localStoreName, data.widgetID);

            // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            return $("#active-projects-data").append(buildProjectPanelMU(data)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-usermenu-" + elementID).remove();
        });
    }
}

function turnProjectOff(widgetIdOff) {

    let elementID = widgetIdOff;

    // remove active widgetID from localStorage
    removeWidgetID("activeProjects", elementID);

    // If the widget data is stored locally...
    if(localStorage.getItem(elementID)) {
        // YES: Retrieve data and rebuild the library button, and emove project panel from dashboard
        getLocalData(elementID, function(localData) {
            // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            toastr.success(localData.name + ' has been removed from the Dashboard.', 'Project Panel Removed');
            return $("#projects-library").append(buildProjectLibBtnMU(localData)), $("#usermenu-projects-library").append(buildProjectLibBtnMUUsermenu(localData)), $("#" + elementID).remove();
        });
    } else {
        //NO: then the data is default data stored in JSON, retrieve data and rebuild library button, and emove project panel from dashboard
        var url = JSONFolderURL + elementID + ".json";
        getData(url)
        .then(data => {
            toastr.info(data.name + ' has been removed from the Dashboard.', 'Project Panel Removed');
            return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#usermenu-projects-library").append(buildProjectLibBtnMUUsermenu(data)), $("#" + elementID).remove();
        });
    }
}

function buildProjectPanelMU(data) {

    let projectData = data;

    //convert metrics data to % scales for progress bar settings
    let cpi = projectData.cpi/2 * 100;
    let sv = projectData.sv/2 * 100;

    // Create color scheme selector variables
    var colorSchemeFinal01 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-01";
    }

    /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
    return `<div id="${projectData.widgetID}" class="col-6 col-lg-3">
    <div class="pmd-panel-head">
        <div class="pmd-panel-headtext${colorSchemeFinal01}"></div>
        <div class="pmd-icon-wrapper01" onclick="turnProjectOff('${projectData.widgetID}')">
            <div class="pmd-panel-headtext${colorSchemeFinal01}">Close Panel</div>
        </div>
    </div>
        <div class="pmd-active-widget pmd-bcolor-2">
            <h3 class="pmd-project-panel-heading">${projectData.name}</h3>
            <div class="pmd-project-data1">Due Date: ${projectData.duedate}</div>
            <div class="pmd-project-data2">Owner: ${projectData.owner}</div>
            <div class="pmd-project-data2">${projectData.description}</div>
            <div class="progress pmd-prg-row">
                <div class="pmd-prg-bar-title">% Complete: </div>
                <div class="progress-bar bg-success pmd-prg-bar" role="progressbar" aria-label="Percent Complete" style="width: ${projectData.percentcomplete}%" aria-valuenow="${projectData.percentcomplete}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress pmd-prg-row">
                <div class="pmd-prg-bar-title">CPI: </div>
                <div class="progress-bar bg-info pmd-prg-bar" role="progressbar" aria-label="Cost Performance Index" style="width: ${cpi}%" aria-valuenow="${projectData.cpi}" aria-valuemin="0" aria-valuemax="2"></div>
            </div>
            <div class="progress pmd-prg-row">
                <div class="pmd-prg-bar-title">SV: </div>
                <div class="progress-bar bg-warning pmd-prg-bar" role="progressbar" aria-label="Schedule Variance" style="width: ${sv}%" aria-valuenow="${projectData.sv}" aria-valuemin="0" aria-valuemax="2"></div>
            </div>
            <div class="pmd-project-data2"><a href="${projectData.livesite}" target="_blank">Go To Project Site</a></div>
        </div>
    </div>`;
}

/* Build Library button markup
These next two (2) functions build the Library buttons, dropdown version adds a code so the button ids are unique. */
function buildProjectLibBtnMU(data) {

    let elementID = data.widgetID;

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-04";
        colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-${elementID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${elementID}')">
    <i class="bi bi-plus pmd-acolor-5" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-acolor-5 wName${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}

function buildProjectLibBtnMUUsermenu(data) {

    let elementID = data.widgetID;

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-04";
        colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-usermenu-${elementID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${elementID}')">
    <i class="bi bi-plus pmd-acolor-5" aria-hidden="true"></i>
    <div class="pmd-lib-btn pmd-acolor-5${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}

function setDefaultOwner() {

    var localStoreName = "userSettings";

    if (localStorage.getItem(localStoreName)) {
        getLocalData(localStoreName, function (localData) {
            if (localData.username) {
                return $('#projectOwner').html(`<label for="projectOwnerModal">Project Owner</label><input type="text" id="projectOwnerModal" name="projectOwnerModal" class="form-control" value="${localData.username}"></input>`);
            } else {
                return $('#projectOwner').html(`<label for="projectOwnerModal">Project Owner</label><input type="text" id="projectOwnerModal" name="projectOwnerModal" class="form-control"></input>`);
            }
        });
    } else {
        return $('#projectOwner').html(`<label for="projectOwnerModal">Project Owner</label><input type="text" id="projectOwnerModal" name="projectOwnerModal" class="form-control"></input>`);
    }
}

function saveProjectDataModal() {

    //should probably use a constructor here
    var passFormData = {
        name: "",
        widgetID: "",
        duedate: "",
        description: "",
        owner: "",
        percentcomplete: "",
        cpi: "",
        sv: "",
        livesite: ""
    };
       //grab input form data from modal
       passFormData.name = document.getElementById("projectFormModal").elements.namedItem("projectNameModal").value;
       passFormData.owner = document.getElementById("projectFormModal").elements.namedItem("projectOwnerModal").value;
       passFormData.description = document.getElementById("projectFormModal").elements.namedItem("projectDesModal").value;
       passFormData.startdate = document.getElementById("projectFormModal").elements.namedItem("startDateModal").value;
       passFormData.duedate = document.getElementById("projectFormModal").elements.namedItem("dueDateModal").value;
       passFormData.percentcomplete = document.getElementById("projectFormModal").elements.namedItem("percentCompleteModal").value;
       passFormData.cpi = document.getElementById("projectFormModal").elements.namedItem("CPIModal").value;
       passFormData.sv = document.getElementById("projectFormModal").elements.namedItem("SVModal").value;
       passFormData.livesite = document.getElementById("projectFormModal").elements.namedItem("projectURLModal").value;

        // create an object of items to be validated
        let valItemsList = {
            name: passFormData.name,
            url: passFormData.livesite
        };

       // Validate data, and if OK, assign widgetID and save data, build button
       let validateInputReply = validateInput(valItemsList);

        if(validateInputReply.length) {
            for(let i in validateInputReply) {
                switch(validateInputReply[i]) {
                    case 'name':
                        // Set alerts on all required fields
                        $("#valPNameAlert01").html("* Required Field");
                        break;
                    case 'url':
                    // Set alert on URL fields
                        $("#valURLAlert01").html("* Please enter a validate url");
                        break;
                }
            }
       } else {
        //Add a unique-ish widget ID to the data
        passFormData.widgetID = "widget" + Math.floor(Math.random()*10000000);

            //Clear form
            /* CODE REUSE - Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements */
            var x = document.getElementById("projectFormModal");
            for (var i = 0; i < x.length ;i++) {
            x.elements[i].value = "";
            }

        // Save widgetID to localStorage, master list
        var localStorageName = "allProjectIDs";
        setProjectIDs(localStorageName, passFormData.widgetID);

        // Save widgetID to localStorage to capture all user input IDs
        var localStorageName = "userProjectIDs";
        setProjectIDs(localStorageName, passFormData.widgetID);

        // Save project data to localStorage
        var localStoreDataName = passFormData.widgetID;
        setLocalStorageData(localStoreDataName, passFormData);

        toastr.success('Your project ' + passFormData.name + ' has been saved!', 'Project Saved!');

        // Build and display the new project library button; show user that the data was saved
        return $("#projects-library").append(buildProjectLibBtnMU(passFormData)), $("#usermenu-projects-library").append(buildProjectLibBtnMUUsermenu(passFormData)), $("#saveConfirmationModal").text("Project data saved to your local browser storage. This information will be available to the dashboard when you return unless you clear browser cache.");
    }
}

function clearProjectFormAlerts() {
    return $("#saveConfirmationModal").text("You can add projects to your libraries here. You activate and deactivate projects on the dashboard by clicking on projects and widgets in your Library"), $("#valAlert01").html(""), $("#delConfirmationModal").text("Click on a project to delete it from local storage.");
}

/* Delete Project Functions */
function createDeleteProjectList() {
    var localStorageName = "userProjectIDs";
    if (localStorage.getItem(localStorageName)) {
        let delWidgetIDList = localStorage.getItem(localStorageName).split(',');
        for (i in delWidgetIDList) {
            if (!$("#widget-btn-del-" + delWidgetIDList[i]).length) {
                var elementID = delWidgetIDList[i];
                getLocalData(elementID, function(localData) {
                    // Add project name to the delete list
                    return $("#delProjectListModal").append(buildProjectDelBtnMU(localData));
                });
            }
        }
    } else {
        return $("#delConfirmationModal").text("There are no user projects entered yet. Please go to Add Project to add one");
    }
}

function delProject(wID, pName) {

    var elementID = wID;
    var pn = pName;

    //Confirm deletion
    var txt = "Are you sure you want to delete " + pn + "?";
    if (confirm(txt) == true) {

        //delete project data
        localStorage.removeItem(elementID);

        // remove active widgetID from localStorage, if its active
        if ($("#" + elementID).length) {
            removeWidgetID("activeProjects", elementID);
        }

        // remove widgetID from master list in localStorage
            removeWidgetID("allProjectIDs", elementID);

        // remove widgetID from user list in localStorage
            removeWidgetID("userProjectIDs", elementID);

        //remove panel
        $("#" + elementID).remove();
        //remove library button
        $("#widget-btn-" + elementID).remove(), $("#widget-btn-usermenu-" + elementID).remove()
        //remove del button
        $("#widget-btn-del-" + elementID).remove();

        toastr.success('Your project ' + pn + ' has been deleted.', 'Project Deleted');

        return $("#delConfirmationModal").text('Your project ' + pn + ' has been deleted.', 'Project Deleted');
    }
}

function buildProjectDelBtnMU(data) {

    let widgetData = data;

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-del-${widgetData.widgetID}">
    <button class="pmd-icon-03" data-dismiss="modal" onclick="delProject('${widgetData.widgetID}', '${widgetData.name}')">
    <i class="bi bi-x pmd-acolor-5" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-icon-01 pmd-acolor-5 wName">${widgetData.name}</div>
    </button>
    </div>`;
}