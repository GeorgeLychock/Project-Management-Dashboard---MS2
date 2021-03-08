/* George Lychock - MS2 Open Weather Javascript File */

$(document).ready(function() {

    createActiveWidgets();
    
    })

/* Get data from JSON file  */
/* CODE REUSE - XMLHttpRequest Callback, Code Institute, jQuery/API Module  */
function getData(url, gd) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gd(JSON.parse(this.responseText));
        }
    };
    xhr.open("GET", url);
    xhr.send();
 }
/* /CODE REUSE - XMLHttpRequest Callback, Code Institute, jQuery/API Module  */

function createActiveWidgets() {

    let zipcode = "02169";
    var cityName = "Adam's Shore";
    let pmdApiKey = "";

    var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${pmdApiKey}`;
    getData(url, function (data) {
        var widgetData = data;
        return $("#active-widgets-data").append(buildWidgetPanelMarkup(data, cityName));
    });
}

function buildWidgetPanelMarkup(data, cn) {

    var elementID = "widget001";
    var widgetData = data;
    cityName = cn;

    console.log(widgetData);

    /* CODE REUSE - Progress Bar below is from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/  */
    return `<div id="${cityName}" class="col-3 pmd-max-height-400">
        <div class="pmd-panel-head">
        <button class="pmd-icon-01" onclick="turnWidgetOff('${elementID}')"><i class="bi bi-arrow-right-square pmd-acolor-1" aria-hidden="true"></i></button>
        </div>
        <div class="pmd-active-widget-3col pmd-bcolor-2">
            <h5>${widgetData.name}</h5>
            <div>Current Temperature: ${widgetData.main["temp"]}</div>
            <div class="pmd-weather-icon-bg">
                <div><img src="http://openweathermap.org/img/wn/${widgetData.weather[0]["icon"]}@2x.png"></div>
                <div>
                    <div class="pmd-pcolor-1">Currently: ${widgetData.weather[0]["main"]}</div>
                    <div class="pmd-pcolor-1">with ${widgetData.weather[0]["description"]}</div>
                </div>
            </div>
        </div>
    </div>`;
}