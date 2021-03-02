## George Lychock - MS2 Project: Project Management Dashboard
### Salem State University Fullstack Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module
-   Live Dev Site - [View](http://www.georgelychock-career.com/pages/_sandbox/ms2/index.html)
### Use Case:
A configurable user dashboard that displays and organizes key metrics and data from third-party datastreams such as a project schedule, a to-do-list, or a project metrics aggregator. The third-party datastream can come from a sister API of the dashboard app or some API from a vendor such as Smartsheet. These datastreams are congifured as widget elements that can be added and removed from the main dashboard viewport. A widget library is visible as a side menu giving the user the ablility to click various widgets on, and off, the main dashboard viewport.
A limited number of widget view settings will be available from the widget window once the widget is added to the main dahsboard viewport.
Activated widgets and viewport/widget settings should be persistent when a user returns to the app.

### User Stories:
#### Story 1
As a logged in project manager, I want to see key project status metrics on my current projects, so that I have a clear, one-stop view of all my projects' status.
-   Acceptance Criteria -- Duplicated in Testing section below
    -   There is an indication that I'm the user logged in
    -   My available projects are indicated in a side panel or other persistent section; called a Library.
    -   I can see further detail of a given project in a larger, more prominent Dashboard.
    
#### Story 2
As a logged in project manager, I want to Add or Remove project detail panels from the Dashboard
-   Acceptance Criteria -- Duplicated in Testing section below
    -   I can Add a project detail panel from the dashboard
    -   I can Remove a project detail panel

#### Story 3
As a logged in project manager, I want to see project details of the projects I make active on the Dashboard
-   Acceptance Criteria -- Duplicated in Testing section below
    -   I can view project Title/Name
    -   I can view project Due Date
    -   I can view the project Owner
    -   I can view the project Description

#### Story 4
As a logged in project manager, I want to see project KPIs of the projects I make active on the Dashboard
-   Acceptance Criteria -- Duplicated in Testing section below
    -   I can view project percent complete to date
    -   I can view project Cost Performanace Index (CPI) to date
    -   I can view the project Schedule Variance (SV) to date

#### Story 5
As a logged in project manager, when I return to the site, all widgets I made active are still active on the Dashboard
-   Acceptance Criteria -- Duplicated in Testing section below
    -   Active widegts are present when I return to the site

#### Story 6
As a logged in project manager, I want the ability to change the color scheme of the Dashboard from light to dark
-   Acceptance Criteria -- Duplicated in Testing section below
    -   The color scheme is light when I first log in, view Dashboard
    -   I can change the color Scheme using a button to a dark scheme
    -   I can change the scheme back to light
    -   The color scheme I used last will be present when I come back to the site


### Wireframes
-   Desktop Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/pm-dashboard-desktop-01.png)
-   Active Widget Panel Desktop Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/active-panel-desktop-01.png)

### Design - Look and Feel
-   Emphasis is on an uncluttered, business tool design that has light colors and a lot of white space.
-   A light and dark version have been mocked up to show how the app can change based on a user selection in a settings panel.
-   Mockups:
    -   Desktop Look and Feel - Light - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-light.png)
    -   Desktop Look and Feel - Dark - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-dark.png)


### Data Structure and Flow
-   I created a simple JSON structure for the project/widget data. I want to show that the app can parse data from JSON since many APIs will supply data in that way:
    ```{
        "name": "George Lychock Career Website",
        "widgetID": "proj0001",
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

The widgetID drives everything, it is the unique ID for any widget added to the Dashboard and allows the app to target and track what data is being displayed.

-   I used a visual to help figure out how to create and retain the widgetID information so that the app can build the library buttons, turn widget panels ON and OFF, and retain the widgetIDs so that the Dashboard can be built again upon the app being relaunched.
[widgetID Data Flow](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/data-structure/MS-2-data-flow-01.png)


### Technical and Scope Contraints
-   The site will not have access to a database. All project data will come from JSON files to simulate widget data streams.
-   The project will consist of just a landing page/dashboard; no secondary pages will be active. The focus of the project's first release is to address how the user can configure their primary viewport: a summary of all their projects, displayed in a dashboard.
-   *Foot Note 1: The widgetID variable contains the unique IDs for the data stream avaiable for each widget available to the dashboard; its possible these values would be created with a Create Project module or Third Party app and stored in a database. They are hard coded here since db calls are out of scope. Search " //*1 " to see code in script.js file:
`        var widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];`

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
    -   Ability to 'clear' the dashboard (clear localStorage)

### Technical Requirements for this project:
-   Use template literals
-   Use ternary operator, if possible/needed
-   Access and parse JSON data
-   Store data in localStorage
-   Limit duplication of code, use functions effectively
-   Write Jasmine tests when possible, time permitted

### Future Features
-   A Calendar widget
-   A To-Do List widget
-   Ability to shuffle (re-position) the dashboard panels
-   Add a status indicator to the project panels.

### Release Strategy
-   Sprint 1
    -   Make the ON/OFF buttons only open or close once
    -   Create multiple library buttons
    -   Create code to remove a button after the panel is activated to the dashboard
    -   Create code to add a button to the library after the panel is removed from the dashboard
    -   Figure out how to do local storage
-   Sprint 2
    -   


### (Jasmine) Test Sequences:
-   Create a library button that turns a div ON in the active widet viewport
-   Create a library button that turns a div OFF in the active widet viewport
-   Correctly render data from an external JSON files


## Credits

### Resources Used
-   jQuery: How do I test whether an element exists? - [View](https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/). Used this method to check if the project panel was already added to the dashboard.
-   [MDN Web Docs](https://developer.mozilla.org/) : For Semantic Structure reference.

### Code Credits
-   The XMLHttpRequest callback code in script.js came from Code Institute, Interactive Frontend Development Module, Full Stack Software Deveveloper Program:
    Find code use indicated by "CODE REUSE - XMLHttpRequest Callback"
        `gd(JSON.parse(this.responseText));`

-   The localStorage check code in script.js is from MDN: [CODE REUSE - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). This code checks to make sure that the browser can support localStorage and has it turned on.
    Find code use indicated by "CODE REUSE - localStorage Check "

-   The skills progress bar code on the Skill Page came from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/:
    Find code use indicated by "CODE REUSE - Progress Bar"
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