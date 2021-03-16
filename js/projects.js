/* George Lychock - MS2 Projects Javascript File */
/* This file is used to build all the project elements on the dashboard and library */

$(document).ready(function() {

    createProjectLibBtns();
    createActiveProjects();

})

function createActiveProjects() {

    if (localStorage.localProjects) {

        let activeProjectsSaved = localStorage.getItem('localProjects');
        let activeProjects = activeProjectsSaved.split(',');

        for (let i in activeProjects) {

            var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + activeProjects[i] + ".json";

            getData(url, function (data) {
                return $("#active-projects-data").append(buildProjectPanelMU(data));
            });
        }
    }
}

function createProjectLibBtns() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord

    if (localStorage.localProjects) {

        //Search " *Foot Note 1 " in Technical Constraints section of README.md for more info on widgetIDs
        var widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];
        let activeProjectsSaved = localStorage.getItem('localProjects');
        var projectIDsSaved = activeProjectsSaved.split(',');
        var projectBuildIDs = [];

        //Search the locally stored active widget IDs and make an array of available widgets that are not already active
        for (let i in widgetIDs) {
            if (projectIDsSaved.includes(widgetIDs[i]) == false) {
                projectBuildIDs.push(widgetIDs[i]);
            }
        }
    } else {
        var projectBuildIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"]; // else all widgets are available in the library
    }

    for (let i in projectBuildIDs) {
        var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + projectBuildIDs[i] + ".json";

        //Build Library buttons for Desktop and Mobile
        getData(url, function(data) {
            return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(data));
        });
    }
}

/* Project Library ON/OFF Buttons */
function turnProjectOn(widgetIdOn, vpcodepass) {

    let elementID = widgetIdOn;
    let vpcode = vpcodepass;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    getData(url, function(data) {

        // Check if localStorage is enabled
        if (storageAvailable('localStorage')) {
            // YES: We can use localStorage, check if localStorage var has been initiated
            if (localStorage.localProjects) {
                // YES: Add widget ID to the localStorage string and store
                let activeProjectsSaved = localStorage.getItem('localProjects'); //returns a string, comma delimited, convert to array
                let activeProjects = activeProjectsSaved.split(',');
                activeProjects.push(elementID);
                localStorage.setItem('localProjects', activeProjects); //stored as a string, comma delimited

            } else {
                // Initiate localStorage and add project ID
                let activeProjects = [];
                activeProjects.push(elementID);
                localStorage.setItem('localProjects', activeProjects);
            }
        } else {
            // NO: no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
        }
        // QUERY: This chaining of jQuery calls seems to work, although I haven't found any documentation to date to support it's correct
        // Add project to the dashboard and remove the library buttons from both Desktop and Mobile views
        return $("#active-projects-data").append(buildProjectPanelMU(data)), $("#widget-btn-" + elementID).remove(), $("#widget-btn-" + vpcode + "-" + elementID).remove();
    });
}

function turnProjectOff(widgetIdOff) {
    let elementID = widgetIdOff;
    // remove widget from localStorage
    let activeProjectsSaved = localStorage.getItem('localProjects');
    let activeProjects = activeProjectsSaved.split(',');
    activeProjects.pop(elementID);
    localStorage.setItem('localProjects', activeProjects);

    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    getData(url, function(data) {
        return $("#projects-library").append(buildProjectLibBtnMU(data)), $("#mobile-projects-library").append(buildProjectLibBtnMUMobile(data));
    });

    // Remove panel from dashboard
    return $("#" + elementID).remove();
}

function buildProjectPanelMU(data) {

    let projectData = data;
    let cpi = projectData.cpi/2 * 100;
    let sv = projectData.sv/2 * 100;

    /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
    return `<div id="${projectData.widgetID}" class="col-sm-12 col-md-3">
        <div class="pmd-panel-head">
            <div class="pmd-icon-wrapper01" onclick="turnProjectOff('${projectData.widgetID}')">
                <div class="pmd-panel-head-text"></div>
                <div class="float-right"><div class="pmd-panel-head-text">Close Panel</div><i class="bi bi-x-circle pmd-icon-01 pmd-acolor-1" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="pmd-active-widget pmd-bcolor-2">
            <h5>${projectData.name}</h5>
            <div>Project Due Date: ${projectData.duedate}</div>
            <div class="pmd-project-data1">Project Owner: ${projectData.owner}</div>
            <div class="pmd-project-data1">${projectData.description}</div>
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

// These next two (2) functions can be made common if we pass the onClick function name from the calling function
function buildProjectLibBtnMU(data) {

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-${data.widgetID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${data.widgetID}')">
    <i class="bi bi-plus-circle pmd-acolor-2" aria-hidden="true"></i>
    <div class="pmd-dinline pmd-acolor-1">${data.name}</div>
    </button>
    </div>`;
}

function buildProjectLibBtnMUMobile(data) {

    let vpcode = convertViewportWidth();
    // Add the viewport code to the ID to make unique ID for mobile library button
    let elementID = vpcode + "-" + data.widgetID;

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-${elementID}">
    <button class="pmd-icon-03" onclick="turnProjectOn('${data.widgetID}', '${vpcode}')">
    <i class="bi bi-plus-circle pmd-acolor-2" aria-hidden="true"></i>
    <div class="pmd-dinline pmd-acolor-1">${data.name}</div>
    </button>
    </div>`;
}


