## George Lychock - MS2 Project: Project Management Dashboard
### Salem State University Frontend Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module
-   Live Dev Site - [View](http://www.georgelychock-career.com/pages/test/jquery-module/index.html)
### Use Case:
A configurable user dashboard that displays and organizes key metrics and data from third-party datastreams such as a project schedule, a to do list, or a project metrics aggregator. The third-party datastream can come from a sister API of the dashboard app or some API from a vendor such as Smartsheet. These datastreams are congifured as widget elements that can be added and removed from the main dashboard viewport. A widget library is visible as a side menu giving the user the ablility click various widgets on, and off, the main dashboard viewport.
A limited number of widget view settings will be available from the widget window once the widget is added to the main dahsboard viewport.
Activated widgets and viewport/widget settings should be persistent when a user returns to the app.

### User Stories:

“As a [persona], I [want to], [so that].”
#### Story 1
As a logged in project manager, I want to see key project status metrics on my current projects, so that I have a clear, one-stop view of all my projects' status.
-   Acceptance Criteria -- Duplicated in Testing section below
    -   There is an indication that I'm the user logged in
    -   My available projects are indicated in a side panel or other persistent section; called a Library.
    -   I can see further detail of a given project in a larger, more prominent Project Dashboard.
    
#### Story 2
As a logged in project manager, I want to Add or Remove project detail windows from the Project Dashboard
    -   I can Add or Remove project detail windows from the dashboard

### Wireframes
-   Desktop and Tablet Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/pm-dashboard-desktop-01.png)

### Data Structure and Flow
-   I created a simple JSON structure for the project/widget data. I want to show that the app can parse data from JSON since most APIs will supply data in that way:
    ```{
        "name": "George Lychock Career Website",
        "pID": "proj0001",
        "startdate": "2020-12-09T13:50:51.644000Z",
        "duedate": "2021-06-09T13:50:51.644000Z",
        "description": "This project updates my old website with a new Bootstrap4 layout.",
        "percentcomplete": ".8",
        "livesite": "http://www.georgelychock-career.com/pages/test/jquery-module/index.html",
        "milestones": [
            ["2020-12-09T13:50:51.644000Z", "Project Launch"],
            ["2021-01-09T13:50:51.644000Z", "Content Writing"],
            ["2021-01-31T13:50:51.644000Z", "Wireframes"],
            ["2021-02-09T13:50:51.644000Z", "Staging Release 1"]
        ]
    }```

The pID drives everything, it is the unique ID for any widget added to the Dashboard and allows the app to target and track what data is being displayed.

-   I used a visual to help figure out how to create and retain the pID information so that the app can build the library buttons, turn widget panels ON and OFF, and retain the pIDs so that the Dashboard can be built again upoin the app being relaunched.
[pID Data Flow](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/data-structure/MS-2-data-flow-01.png)


### Technical Contraints
-   The site will not have access to a database so all project data will come from JSON files to simulate widget data streams.

### Requirements
-   Widgets Library Viewport
    -   A settings cog should be present to give users access to the following changeable settings:
        -   Change background color
        -   Change Library right/left position
    -   The cog should activate a modal window
-   Widget Library Buttons
    -   Each button panel needs to display the project name and a Add and Remove button
    -   Determine a method for making sure that only one instance each widget is added or removed when clicking the ON/OFF buttons
-   Active Widgets Viewport
    -   A settings cog should be present to give users access to the following changeable settings:
        -   Change background color
    -   The cog should activate a modal window
-   Activated Widgets in Viewport
    -   A settings cog icon should be present in each active widget to allow for the following settings changes:
        -   Change background color
    -    cog should activate a modal window
-   Persistent Settings
    -   Activated widgets and viewport/widget settings should be persistent when a user returns to the app.

    ### (Jasmine) Test Sequences:
-   Create a library button that turns a div ON in the active widet viewport
-   Create a library button that turns a div OFF in the active widet viewport
-   Correctly render data from an external JSON files

### Future Features
-   A Calendar widget
-   A To-Do List widget


## Credits

### Resources Used
-   jQuery: How do I test whether an element exists? - [View](https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/). Used this method to check if the project panel was already added to the dashboard.
-   [MDN Web Docs](https://developer.mozilla.org/) : For Semantic Structure reference.

### Code
-   The XMLHttpRequest callback code in script.js came from Code Institute, Interactive Frontend Development Module, Full Stack Software Deveveloper Program:
    Find code use indicated by "CODE REUSE - Code Institute, jQuery/API Module"
        `gd(JSON.parse(this.responseText));`

-   The skills progress bar code on the Skill Page came from Code Institute, User Centric Module, Full Stack Software Deveveloper Program:
    Find code use indicated by "CODE REUSE - Skills Progress Bar User Centric Module, Code Institute"
        `<div class="row progress-section">`
           `<div class="col">`
                `<div class="progress">`
                   ` <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">`
                       ` <span class="sr-only">90% complete</span>.......`
                   
-   [Bootstrap4](https://getbootstrap.com/docs/4.4/getting-started/introduction/): Bootstrap Library used throughout the project mainly to make site responsive using the Bootstrap Grid System.



### Content

-   All content was written by the developer.

### Media

-   All Images were created by the developer.

### Acknowledgements