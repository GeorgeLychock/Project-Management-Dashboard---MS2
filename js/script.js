$(document).ready(function() {
/* Generate a Library button from JSON  */
var myJSON = '{"name":"George Lychock Career Website", "due-date":"2021-06-09T13:50:51.644000Z", "description":"This project updates my old website with a new Bootstrap4 latout.", "percent-complete":".8", "live-site":"http://www.georgelychock-career.com/pages/test/jquery-module/index.html", "milestones": [["Project Launch", "2020-12-09T13:50:51.644000Z"], "Wireframes", "2021-01-31T13:50:51.644000Z"]}';
var myObj = JSON.parse(myJSON);
$("#library-btn-1").html(`Project Name: ${myObj.name}`);
})

/*Widget Library ON/OFF Buttons */
function turnWidgetOn() {
    this.title = "Project One Due Dates";
    this.progress = "80";
    this.blockers = "2";
    return $("#active-widgets-data").append(`<div><h3>${title}</h3><p>Percent Progress: ${progress}%</p><p>Blockers: ${blockers}</p>`);
}

function turnWidgetOff() {
    this.title = "Project One Due Dates";
    this.progress = "80";
    this.blockers = "2";
    return $("#active-widgets-data").html("");
}



/* myObj.name 


, "start-date": "2020-12-09T13:50:51.644000Z", "due-date":"2021-06-09T13:50:51.644000Z", "description":"This project updates my old website with a new Bootstrap4 latout.", "percent-complete":".8", "live-site":"http://www.georgelychock-career.com/pages/test/jquery-module/index.html"
*/