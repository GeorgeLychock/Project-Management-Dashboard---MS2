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

/*    this.view = function () {
    $("#active-widgets-data").append(`<div><h3>${title}</h3><p>Percent Progress: ${progress}%</p><p>Blockers: ${blockers}</p>`);
    } */