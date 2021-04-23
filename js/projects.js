/* George Lychock - MS2 Projects Javascript File */
/* This file is used to build all the project elements on the dashboard and library */
/* All reused and custom scripts are located in script.js. */

$(document).ready(function() {
    createProjectLibBtns();
    createActiveProjects();
    loadUserSettings();
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
                var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
                getData(url, function (data) {
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

    var elementID;
    // Build Library buttons based on widgetIDs
    for (let i in projectBuildIDs) {

        elementID = projectBuildIDs[i];

        // If the widget data is stored locally...
        if(localStorage.getItem(elementID)) {
            // YES: Retrieve data and rebuild the library button, and remove project panel from dashboard
            getLocalData(elementID, function(localData) {
                return $("#projects-library").append(buildProjectLibBtnMU(localData)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(localData));
            });
        } else {
            //NO: then the data is default data stored in JSON, retrieve data and rebuild library button, and remove project panel from dashboard
            var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
            getData(url, function(data) {
                return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(data));
            });
        }
    }
}

/* Project Library Buttons */
function turnProjectOn(widgetIdOn, vpcodepass) {

    let elementID = widgetIdOn;
    let vpcode = vpcodepass; //for mobile styling, sets a different unique ID for the mobile library buttons

    //is the widgetID is a locally stored object...
    if(localStorage.getItem(elementID)) {
        // YES: Save widgetID to localStorage and get local project data
        var localStoreName = "activeProjects";
        setProjectIDs(localStoreName, elementID);
        getLocalData(elementID, function(localData) {
        // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            return $("#active-projects-data").append(buildProjectPanelMU(localData)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-" + vpcode + "-" + elementID).remove();
        });
    } else {
        //NO: if not a locally stored data, get data from JSON
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

        getData(url, function(data) {
    
            // Save widgetID to localStorage
            var localStoreName = "activeProjects";
            setProjectIDs(localStoreName, data.widgetID);

            // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            return $("#active-projects-data").append(buildProjectPanelMU(data)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-" + vpcode + "-" + elementID).remove();
        });
    }
}

function turnProjectOff(widgetIdOff) {

    let elementID = widgetIdOff;

    // remove widgetID from localStorage
    let activeProjectsSaved = localStorage.getItem('activeProjects');
    let activeProjects = activeProjectsSaved.split(',');
    activeProjects.pop(elementID);
    localStorage.setItem('activeProjects', activeProjects);

    // If the widget data is stored locally...
    if(localStorage.getItem(elementID)) {
        // YES: Retrieve data and rebuild the library button, and emove project panel from dashboard
        getLocalData(elementID, function(localData) {
            // Add project to the dashboard and remove the library button from both Desktop and Mobile views
            return $("#projects-library").append(buildProjectLibBtnMU(localData)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(localData)), $("#" + elementID).remove();
        });
    } else {
        //NO: then the data is default data stored in JSON, retrieve data and rebuild library button, and emove project panel from dashboard
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
        getData(url, function(data) {
            return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(data)), $("#" + elementID).remove();
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
    return `<div id="${projectData.widgetID}" class="col-6 col-md-3">
    <div class="pmd-panel-head">
        <div class="pmd-panel-headtext${colorSchemeFinal01}"></div>
        <div class="pmd-icon-wrapper01" onclick="turnProjectOff('${projectData.widgetID}')">
            <div class="pmd-panel-headtext${colorSchemeFinal01}">Close Panel</div>
        </div>
    </div>
        <div class="pmd-active-widget pmd-bcolor-2">
            <h5>${projectData.name}</h5>
            <div class="pmd-project-data1">Due Date: ${projectData.duedate}</div>
            <div class="pmd-project-data1">Owner: ${projectData.owner}</div>
            <div class="pmd-project-data2">${projectData.description}</div>
            <div class="progress pmd-prg-row">
                <div class="progress-bar bg-success pmd-prg-bar" role="progressbar" style="width: ${projectData.percentcomplete}%" aria-valuenow="${projectData.percentcomplete}" aria-valuemin="0" aria-valuemax="100">% Complete: ${projectData.percentcomplete}%</div>
            </div>
            <div class="progress pmd-prg-row">
                <div class="progress-bar bg-info pmd-prg-bar" role="progressbar" style="width: ${cpi}%" aria-valuenow="${projectData.cpi}" aria-valuemin="0" aria-valuemax="2">CPI: ${projectData.cpi}</div>
            </div>
            <div class="progress pmd-prg-row">
                <div class="progress-bar bg-warning pmd-prg-bar" role="progressbar" style="width: ${sv}%" aria-valuenow="${projectData.sv}" aria-valuemin="0" aria-valuemax="2">SV: ${projectData.sv}</div>
            </div>
            <div class="pmd-project-data1"><a href="${projectData.liveSite}" target="_blank">Development Site Link</a></div>
        </div>
    </div>`;
}

/* Build Library button markup
These next two (2) functions build the Library buttons, mobile version needs to add a code so the button ids are unique. */
function buildProjectLibBtnMU(data) {

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-04";
        colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-${data.widgetID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${data.widgetID}')">
    <i class="bi bi-plus-circle pmd-acolor-2" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-acolor-1 wName${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
}

function buildProjectLibBtnMUMobile(data) {

    let vpcode = convertViewportWidth();
    // Add the viewport code to the ID to make unique ID for mobile library button
    let elementID = vpcode + "-" + data.widgetID;

    var colorSchemeFinal01 = "";
    var colorSchemeFinal02 = "";
    var colorScheme = whatColorScheme();
    if (colorScheme != "") {
        colorSchemeFinal01 = " " + colorScheme + "-04";
        colorSchemeFinal02 = " " + colorScheme + "-01";
    }

    return `<div class="pmd-btn-library pmd-btncolor-1${colorSchemeFinal01}" id="widget-btn-${elementID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${data.widgetID}', '${vpcode}')">
    <i class="bi bi-plus pmd-acolor-1" aria-hidden="true"></i>
    <div class="pmd-dinline pmd-acolor-1${colorSchemeFinal02}">${data.name}</div>
    </button>
    </div>`;
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
    
       // Validate data, and if OK, assign widgetID and save data, build button
       let validateInputReply = validateInput(passFormData.name, "Name");
       if (validateInputReply == false) {
           return $("#valAlert01").html("* Required Field");
       } else {
        //Add a unique-ish widget ID to the data
        passFormData.widgetID = "widget" + Math.floor(Math.random()*10000000);

            //Clear form
            /* CODE REUSE - Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements */
            var x = document.getElementById("projectFormModal");
            for (var i = 0; i < x.length ;i++) {
            x.elements[i].value = "";
            }

        // Save widgetID to localStorage
        var localStorageName = "allProjectIDs";
        setProjectIDs(localStorageName, passFormData.widgetID);

        // Save widgetID to localStorage to capture all user input IDs
        var localStorageName = "userProjectIDs";
        setProjectIDs(localStorageName, passFormData.widgetID);

        // Save project data to localStorage
        var localStoreDataName = passFormData.widgetID;
        setLocalStorageData(localStoreDataName, passFormData);

        // Build and display the new project library button; show user that the data was saved
        return $("#projects-library").append(buildProjectLibBtnMU(passFormData)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(passFormData)), $("#saveConfirmationModal").html("Project data saved to your local browser storage. This information will be available to the dashboard when you return unless you clear browser cache.");
    }
}

function clearProjectFormAlerts() {
    return $("#saveConfirmationModal").html(""), $("#valAlert01").html("");
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
                    // Add project to the dashboard and remove the library button from both Desktop and Mobile views
                    return $("#delProjectListModal").append(buildProjectDelBtnMU(localData));
                });
            }
        }
    } else {
        alert("There are no user projects entered yet. Please go to Add Project to add one");
    }
}

function delProject(wID, pName) {

    var elementID = wID;
    var pn = pName;
    let vpcode = convertViewportWidth();

    //Confirm deletion
    var txt = "Are you sure you want to delete " + pn;
    if (confirm(txt) == true) {

        //delete project data
        localStorage.removeItem(elementID);

        // delete active widgetID from localStorage
        let activeProjSaved = localStorage.getItem('activeProjects');
        let activeProj = activeProjSaved.split(',');
        activeProj.pop(elementID);
        localStorage.setItem('activeProjects', activeProj);

        // delete widgetID from main list in localStorage
        activeProjSaved = localStorage.getItem('allProjectIDs');
        activeProj = activeProjSaved.split(',');
        activeProj.pop(elementID);
        localStorage.setItem('allProjectIDs', activeProj);

        // delete widgetID from user list in localStorage
        activeProjSaved = localStorage.getItem('userProjectIDs');
        activeProj = activeProjSaved.split(',');
        activeProj.pop(elementID);
        //if that was the last/only project saved locally, delete the item entirely
        if (activeProj == "") {
            localStorage.removeItem('userProjectIDs');
        } else {
            localStorage.setItem('userProjectIDs', activeProj);
        }

        //remove panel
        $("#" + elementID).remove();
        //remove library button
        $("#widget-btn-" + elementID).remove(), $("#widget-btn-" + vpcode + "-" + elementID).remove()
        //remove del button
        $("#widget-btn-del-" + elementID).remove();


        alert("Your project " + pn + " has been deleted");
    }
}

function buildProjectDelBtnMU(data) {

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-del-${data.widgetID}">
    <button class="pmd-icon-03" onclick="delProject('${data.widgetID}', '${data.name}')">
    <i class="bi bi-x-circle pmd-acolor-2" aria-hidden="true"></i>
    <div id="wName" class="pmd-dinline pmd-icon-01 pmd-acolor-1 wName">${data.name}</div>
    </button>
    </div>`;
}