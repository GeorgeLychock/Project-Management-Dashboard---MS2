## George Lychock - MS2 Project: Project Management Dashboard
### Salem State University Frontend Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module
-   Live Dev Site - [View](http://www.georgelychock-career.com/pages/test/jquery-module/index.html)
### Use Case:
A configurable user dashboard that displays and organizes key metrics and data from third-party datastreams such as a project schedule, a to do list, or a project metrics aggregator. The third-party datastream can come from a sister API to the dashboard app or some API from a vendor such as Smartsheet. These datastreams are congifured as widget objects that can be added and removed from the main dashboard viewport. A widget library is visible as a side menu giving the user the ablility click various widgets on, and off, the main dashboard viewport.
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
-   Desktop and Tablet Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/main/_documentation/wireframes/pm-dashboard-desktop-01.png)

### Technical Contraints
-   Use JSON objects to simulate/fill widget data streams.

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
-   Correctly render data from an external JSON file