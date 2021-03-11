/* George Lychock - MS2 Projects Javascript File */
/* This file is used to build all the project elements on the dashboard and library */

$(document).ready(function() {

createLibraryButtons();
createActiveProjects();

})

function createActiveProjects() {

    if (localStorage.localProjects) {

        let activeProjectsSaved = localStorage.getItem('localProjects');
        let activeProjects = activeProjectsSaved.split(',');
        let elementID;

        for (let i in activeProjects) {

            var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + activeProjects[i] + ".json";
            getData(url, function (data) {
                return $("#active-projects-data").append(buildProjectPanelMarkup(data));
            });
        }
    }
}

function createLibraryButtons() {

    // Retrieve widget IDs that have already been activated to the dashboard, if available. Display only buttons for widgets that have not been activated to the dashbaord

    if (localStorage.localProjects) {

        //*1 Search " *Foot Note 1 " in Technical Constraints section of README.md

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
        //Build buttons
        getData(url, function(data) {
            return $("#projects-library").append(buildLibraryButtonMarkup(data));
        });
    }
}

/* Widget Library ON/OFF Buttons */
function turnProjectOn(widgetIdOn) {

    let elementID = widgetIdOn;
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";

    getData(url, function(data) {

        let projectData = data;

        // Check if localStorage is enabled
        if (storageAvailable('localStorage')) {
            // YES: We can use localStorage, check if localStorage var has been initiated
            if (localStorage.localProjects) {
                // YES: Add widget ID to the localStorage string and store
                let activeProjectsSaved = localStorage.getItem('localProjects'); //returns a string, comma delimited
                let activeProjects = activeProjectsSaved.split(',');
                activeProjects.push(elementID);
                localStorage.setItem('localProjects', activeProjects); //stored as a string, comma delimited

            } else {

                let activeProjects = [];
                activeProjects.push(elementID);
                localStorage.setItem('localProjects', activeProjects);
            }
        } else {
            // NO: no localStorage
            return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
        }
        // QUERY: This chaining of jQuery calls seems to work, although I haven't found any documentation to date to support it's correct
        // Add widget to the dashboard
        return $("#active-projects-data").append(buildProjectPanelMarkup(data)), $("#widget-btn-" + elementID).remove();
    });
}

function turnProjectOff(widgetIdOff) {
    var elementID = widgetIdOff;
    // remove widget from localStorage
    let activeProjectsSaved = localStorage.getItem('localProjects');
    let activeProjects = activeProjectsSaved.split(',');
    activeProjects.pop(elementID);
    localStorage.setItem('localProjects', activeProjects);

    // **** This should be replaced by a function, see duplication in buildLibraryButtons(), Build Button and add to Library
    var url = "http://www.georgelychock-career.com/pages/_sandbox/ms2/data/" + elementID + ".json";
    getData(url, function(data) {
        return $("#projects-library").append(buildLibraryButtonMarkup(data));
    });

    // Remove panel from dashboard
    return $("#" + elementID).remove();
}

function buildProjectPanelMarkup(data) {

    var projectData = data;

    /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
    return `<div id="${projectData.widgetID}" class="col-3 pmd-max-height-400">
        <div class="pmd-panel-head">
        <button class="pmd-icon-01" onclick="turnProjectOff('${projectData.widgetID}')"><i class="bi bi-arrow-right-square pmd-acolor-1" aria-hidden="true"></i></button>
        </div>
        <div class="pmd-active-widget-3col pmd-bcolor-2">
            <h5>${projectData.name}</h5>
            <div>Project Due Date:${projectData.duedate}</div>
            <div>Project Owner:${projectData.owner}</div>
            <div>${projectData.description}</div>
            <div class="progress pmd-prg-row">
                <div class="progress-bar pmd-prg-bar" role="progressbar" aria-valuenow="${projectData.percentcomplete}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="progress">
                <div class="progress-bar pmd-prg-bar" role="progressbar" style="width: 25%" aria-valuenow="${projectData.cpi}" aria-valuemin="0" aria-valuemax="2"></div>
            </div>
            <div class="progress">
                <div class="progress-bar pmd-prg-bar" role="progressbar" style="width: 50%" aria-valuenow="${projectData.sv}" aria-valuemin="0" aria-valuemax="2"></div>
            </div>
            <div><a href="${projectData.liveSite}" target="_blank">Development Site Link</a></div>
        </div>
    </div>`;
}

function buildLibraryButtonMarkup(data) {

    return `<div class="pmd-btn-library pmd-btncolor-1" id="widget-btn-${data.widgetID}">
    <button class="pmd-icon-01" onclick="turnProjectOn('${data.widgetID}')">
    <i class="bi bi-arrow-left pmd-acolor-2" aria-hidden="true"></i>
    </button>
    <div class="pmd-dinline pmd-acolor-1">${data.name}</div>
    </div>`;
}

