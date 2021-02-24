$("p").click(function() {
    $(this).slideToggle('slow');
})


$('button').mouseenter(function() {
    $(this).removeClass('makeRed').addClass('makeBlue');
});
$("button").mouseleave(function() {
    $(this).removeClass('makeBlue').addClass('makeRed');
});

$(document).ready(function() {
    $(".box").click(function() {
        var classNames = $(this).attr("class").split(" ");
        $("." + classNames[1]).css("background-color", "red");
    })

})


$(document).ready(function() {
    $(".box").on("click", function() {
        var classNames = $(this).attr("class").split(" ");
        var boxClass = classNames[0];
        var className = classNames[1];
        if $(this).css("background-color") == "rgb(255, 0, 0)") {
            $("." + className).css("background-color", "#000");
        } else {
            $("." + boxClass).css("background-color", "#000");
            $("." + className).css("background-color", "red");
        }
    });
});



function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");

    getData(url, function(data) {
        var pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}



this.title = "Project One";
this.progress = "80";
this.blockers = "2";


/* Widget Library ON/OFF Buttons */
function turnWidgetOn(widgetID) {
    var elementID = widgetID;
    var title;
    var description;
    var livesite;
    var url = "http://www.georgelychock-career.com/pages/test/jquery-module/data/data1.json";

    getData(url, function(data) {
        description = data.description;
        title = data.name;
        livesite = data.livesite;
    
        return $("#active-widgets-data").append(`<div id="${elementID}"><h3>${title}</h3><p>${description}</p><p>Wireframes: ${livesite}</p>`);
    });
}



function turnWidgetOn(widgetID) {
    var elementID = widgetID;
    var title;
    var description;
    var livesite;
    var url = "http://www.georgelychock-career.com/pages/test/jquery-module/data/data1.json";

    // checking to see if the project panel has been activated yet
    if ($("#" + elementID)) {
        // No: do nothing but alert user
        return alert("Project already active.");
    } else {
        //yes: get data and display panel (widget) in the dashboard viewport
        getData(url, function(data) {
            description = data.description;
            title = data.name;
            livesite = data.livesite;
        
            return $("#active-widgets-data").append(`<div id="${elementID}"><h3>${title}</h3><p>${description}</p><p>Wireframes: ${livesite}</p>`);
        });
    }
}


function createLibraryButtons() {
    var url = "http://www.georgelychock-career.com/pages/_sandbox/jquery-module/data/data1.json";

    getData(url, function(data) {
        return $("#widgets-library").html(`<div class="hcolor-2 btncolor-1" id="btn-1">Project: ${data.name} <button onclick="turnWidgetOn('${data.pID}')">ON BTN</button>
        <button onclick="turnWidgetOff('${data.pID}')">OFF BTN</button></div>`);
    });
}



/* CODE REUSE - MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */
/* Checks to make sure localStorage is usuable in the browser */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
/* /CODE REUSE - MDN https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  */



            // Check if localStorage is usable
            if (storageAvailable('localStorage')) {
                // YES: We can use localStorage, Add widget ID to the localStorage array and store
                if (typeof (Storage) !== "undefined") {
                    if (localWidgetStorage.localWidgets) {
                        var activeWidgets = localWidgetStorage.getItem('localWidgets');
                        console.log(activeWidgets);
                    } else {
                        var activeWidgets = [];
                    }
                } else {
                    var localWidgetStorage = window.localStorage;
                    var activeWidgets = [];
                    activeWidgets.push(elementID);
                    console.log(activeWidgets);
                    localWidgetStorage.setItem('localWidgets', activeWidgets);
                    let acheck = localWidgetStorage.getItem('localWidgets');
                    console.log(acheck)
                }
              }
              else {
                // NO: no localStorage
                return alert("Your browser does not support localStorage use for this domain at this time. This will effect how your dashboard looks when you reopen The Project Management Dashboard in a new browser window.");
              }