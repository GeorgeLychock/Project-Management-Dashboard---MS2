# George Lychock - MS2 Project: Project Management Dashboard
### Salem State University Fullstack Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module
-   [View Live Dev Site](https://georgelychock.github.io/Project-Management-Dashboard---MS2/)

<hr>

<h1 align="center"><img src="_documentation/look-and-feel/montage-screenshot.png" /></h1>

## Table of Contents

- [Use Case](#UC)

- [User Stories](#US)

- [UX/UI](#UXUI)

- [Design](#DES)
    -   [Wireframes](#WF)

- [Technical Background](#TECH)

- [Testing](TESTRM.md)

- [Bugs and Fixes](#BUGS)

- [Deployment](#DPLY)

- [Credits](#CREDS)

- [Project Management](#PROJ)


<a name="UC"></a>
# Use Case
A configurable user dashboard that displays and organizes key metrics and other data from native or third-party data streams such as a project schedule or a to-do-list, or personal tools like a weather or email app. The third-party data streams can come from a sister API of the dashboard app or some API from a vendor such as Smartsheet or OpenWeather. These data streams are configured as widget elements that can be added and removed from the main dashboard view port. A widget library is visible as a menu giving the user the ability to click various widgets on, and off, the main dashboard view port.
A limited number of dashboard settings will be available from a settings cog that will enhance the user experience. Activated widgets and view port/widget settings should be persistent when a user returns to the app.

>
> ### Notes
>
>-   The primary focus of this project is to display JavaScript, jQuery, and API skills learned in the Interactive Frontend Development Module of the Salem State University / Code Institute Full Stack Software Developer Certificate Program. The website will have limited styling and content since functionality takes precedence under the time constraints.
>-   This is a front-end website that gives the user methods to add content and change appearance.
>-   The project consists of one page, a dashboard.
>-   Navbar, banner, and footer sections exist, but only as placeholders, little or no content will be added to them for project submission.
>-   The project is looked at as a "desktop-first" scenario. Styling and structure efforts for tablet and mobile view ports are minimized while keeping main functionality and components/content intact.
>-   The site is not tied into any databases, it only uses localStorage to simulate saving user input for adding projects, user login, and saving dashboard configurations for styling and panel/button visibility.
>-  Minimal user input validation is performed as this would be mostly controlled on the server-side, if there was one.
>-   The user stories below indicate a "logged-in user". Since this is a front-end website (as suggested by Project Idea 3 in the Assessment Handbook) the website cannot register users nor sanitize, store, and recall any user data to a database.

<a name="US"></a>
## User Stories
NOTE: For Acceptance Criteria test results please see TESTRM.md
### Story 1
As a visitor, I want to view the projects and tools available to add to a main dashboard so I can have a clear, one-stop view of all my projects' status and tools I'm currently using.
-   Acceptance Criteria
    -   There is an indication that I'm the user logged in
    -   My available projects are indicated in a side panel or other persistent section; called a Library.
    -   I can see further detail of a given project in a larger, more prominent Dashboard.
    -   It is clear what elements on the dashboard are projects, and which are tools.
    
### Story 2
As a visitor, I want to Add or Remove project detail panels from the Dashboard so I can view and interact with project data and tools.
-   Acceptance Criteria
    -   There is a library of project and tool buttons I can use to add/remove panels to the dashbaord
    -   The buttons clearly indicate what they are for
    -   I can Add a project detail panel from the dashboard
    -   I can Remove a project detail panel
    -   I can Add a tool panel from the dashboard
    -   I can Remove a tool panel from the dashboard

### Story 3
As a visitor, I want to see project details of the projects after making the project panel active on the Dashboard
-   Acceptance Criteria
    -   I can view project Title/Name
    -   I can view project Due Date
    -   I can view the project Owner
    -   I can view the project Description
    -   I can view project percent complete to date
    -   I can view project Cost Performance Index (CPI) to date
    -   I can view the project Schedule Variance (SV) to date
    -   I can view a link to the live development site, if one exists

### Story 4
As a visitor, when I return to the site, all widgets (projects and tools) I made active are still active on the Dashboard.
-   Acceptance Criteria
    -   Active widgets are present when I return to the site
    -   Buttons for any available widgets not already activated to the dashboard are present in the Library

### Story 5
As a visitor, I want the ability to change certain dashboard visual settings to make the app have a more customized experience.
-   Acceptance Criteria
    -   The color scheme is light when I first log in, view Dashboard
    -   I can change the color Scheme using a button to a dark scheme
    -   I can change the scheme back to light
    -   The color scheme I used last will be present when I come back to the site
    -   I can position the Library Panel on the right or the left of desktop or tablet view ports

### Story 6
As a visitor, I want instruction or an indication of how and where to change dashboard visual settings.
-   Acceptance Criteria
    -   A visual message or banner informs me how to change settings

### Story 7
As a visitor, I want to be able to change the location of the active weather Tool.
-   Acceptance Criteria
    -   A method to change the location for the weather tool is available from the Tool panel

### Story 8
As a visitor, I want a method to gain more information on what pmDashboard is and what its features are.
-   Acceptance Criteria
    -   'About this site' information is available in a link to the user
    -   The information is a simple list of purpose and features of pmDashboard

### Story 9
As a visitor, I want a method to save my username so my user menu is displayed offering certain user options.
-   Acceptance Criteria
    -   A login button is present when a user first enters the app
    -   My username can be saved
    -   My username appears along with a user menu once the username is saved
    -   My username and menu appears when I return to the site
    -   My username can be removed

### Story 10
As a logged in user, I want the ability to access my Projects and Tools Library from a dropdown in the user menu so I can add and remove widgets.
-   Acceptance Criteria
    -   A Library dropdown appears from the user menu
    -   I can add a panel to the dashboard from the dropdown
    -   When I remove a panel from the dashboard, a button reappears in the dropdown for that widget
    -   I can close the Library dropdown

### Story 11
As a logged in user, I want the ability to access all user settings from a dropdown in the user menu so I can access all options from a single location.
-   Acceptance Criteria
    -   A settings dropdown appears in the user menu
    -   In desktop vp, I can access and control Color Scheme, Library Panel position, and weather Tool location
    -   In a mobile vp, I CAN NOT access the Library Panel position settings
    -   I can close the settings dropdown

### Story 12
As a visitor, I want the ability to view a valid GitHub User's repo list and basic information.
-   Acceptance Criteria
    -   A GitHub Tool is accessible from the Libraries
    -   I can input a GitHub username into a field
    -   The Tool returns a user repo list and basic user information and a user avatar once I enter a valid username
    -   The basic user information includes: Avatar, username, user profile link, # of followers, # of users the user is following, total # of repos
    -   I can close the GitHub Tool panel
    -   GitHub username input does not persist when I return to the app


<a name="UXUI"></a>
# UX/UI
## Requirements
-   Widgets Library View Port
    -   A settings cog should be present to give users access to the following changeable settings:
        -   Change Library right/left position
    -   The cog should activate a modal window
-   Widget Library Buttons
    -   Each button panel needs to display the project name on an Add button
    -   Determine a method for making sure that only one instance of each widget is added or removed when clicking the Add/Close buttons
-   Dashboard View Port
    -   A settings cog should be present to give users access to the following changeable settings:
        -   Change overall app color scheme, offering a Light and a Dark scheme to choose from
    -   The cog should activate a modal window
-   Persistent Settings
    -   Activated widgets should be persistent when a user returns to the app.
    -   Save and recall dashboard settings (eg color scheme choice) in localStorage
    -   Save and recall library settings (eg position choice) in localStorage
-   OpenWeather Widget
    -   The background styling should be an indicator it is daytime(light blue) or nighttime (dark blue)
    -   Ability for user to input zip code or location to access weather data (currently default setting is Quincy, MA, USA locale); should activate a modal
    -   The location should be persistent when a user returns to the app
-   Adding/Removing User Projects
    -   App should provide a method for adding a new user project to the app.
    -   The projects should be persistent when the user returns to the app
    -   The user should be able to delete a user project from the app
-   Instructional text and tips should not take up much dashboard space but be effective in message and visual queues.
    -   Provide a means for a user to gain brief, but concise information on what the app's function is and it's features are
    -   Describe what a user can do with the settings cogs
    -   Instruct user on how to add and remove panels from the dashboard
-   User Login Simulation
    -   Display a method for a visitor to add a username to the dashboard app
    -   Saved username should be persistent
    -   Display a method for a user to remove the username from the dashboard app
-   User Menu
    -   Create a button panel in the user panel. Button 1: Library dropdown; Button 2: Profile dropdown; Button 3: Settings dropdown
-   User Menu Tool Tips
    -   A simple, lightweight tooltip should display when user hovers user menu icons
-   User Settings dropdown for the User Menu
    -   Consolidate all user settings available into one dropdown
-   Add Project modal should display the logged in user as the default Project Owner, if a user is logged in
-   Design and add a fav icon

## Technical Requirements for this project:
-   Use template literals, if possible/needed
-   Use ternary operator, if possible/needed
-   Access and parse JSON data
-   Store data in localStorage
-   Connect app to an open source api
-   Limit duplication of code, use functions efficiently
-   Write Jasmine tests when possible, time permitted
-   Use JSHint to check Javascript syntax
-   Use arrow functions, if possible/needed
-   Apply semantic markup
-   Change all XMLHttpRequests to fetch routines

## Future Features / Updates
-   A Calendar widget
-   A To-Do List widget (looked at ToDoist, it required Python or curl to make api calls)
-   Ability to shuffle (re-position) the dashboard panels
-   Add a project status indicator to the project panels.
-   OpenWeather Widget
    -   Add wind speed, wind chill, and time zone data to panel view
    -   Ideally the day/night background would change at the sunset/sunrise times, currently set at 7pm/am
-   Finish the project form validation function to check against a list of 'bad' words or other offending input
-   Build a user Profile dropdown for the user menu (currently has a placeholder drop msg)
-   Add animation to fill the progress bars in the project panels
-   You can currently save a project with the same name; that might not be a desired event or a confirmation should be presented
-   Add Update Project functionality to the app
-   Enhance validation routines for all user input
    -   A validation function has been created but only simple rules have been coded at this point. The following are validation rules for future implementation:
        -   Add max length restriction to username input
        -   Validate the location format and length for Open Weather user settings
        -   Add max length restriction to project name input
-   Replace imported icon library with native SVG and styles
-   Incorporate substring method to Project Descriptions and (maybe) Project Names in buttons.

<a name="DES"></a>
# Design
<a name="WF"></a>
## Wireframes
-   Desktop Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/pm-dashboard-desktop-01.png)
-   Mobile Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/pm-dasboard-mobile-01.png)
-   Active Widget Panel Desktop Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/active-panel-desktop-01.png)
-   User Access Panel Wireframe - [View](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/wireframes/user-access-panel-01.png)

## Design - Look and Feel
-   Emphasis is on an uncluttered, business tool design that has light colors and a lot of white space.
-   Although a fully functioning rendering of the site will be accessible from any device, the app is optimized for desktop use.
-   A light and dark version have been mocked up to show how the app can change based on a user selection in a settings panel.
        Mockups:
        -   Desktop Look and Feel - Light - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-light.png)
        -   Desktop Look and Feel - Dark - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-dark.png)

## Dashboard Structure
-   Nav, Header, and Banner sections span the top of the desktop view port (vp)
-   Main Dashboard, split between a Projects section and a Tools/Widgets section, taking up approximately 2/3 the width of the desktop view port;  these will be stacked in mobile vp.
-   Projects and Tools/Widgets Libraries are connected and in a column that spans 1/3 the desktop viewport
-   Projects and Tools/Widgets Libraries are NOT presented in mobile vp's
-   A footer section spans the bottom of all view ports
-   A user menu displays on the right of the header in all viewports when a vistor logs in

<a name="TECH"></a>
# Technical Background
## Project Folder Structure
-   The css/, js/ folders are located directly off the root folder
-   All JSON files are located in folder data/

## Data Structure and Flow
-   The widgetID (for projects and widgets/tools) drives everything; it is the unique ID for any content added to the Dashboard and allows the app to target and track what data is being displayed.
-   I used a visual to help figure out how to create and retain the widgetID information so that the app can build the library buttons, turn widget panels ON and OFF, and retain the widgetIDs so that the Dashboard can be built again upon the app being relaunched.
[widgetID Data Flow](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/data-structure/MS-2-data-flow-01.png)
-   For Projects data, I created a simple JSON structure for the project/widget data. I want to show that the app can parse data from JSON since many APIs will supply data in that way:
    ```{
	"name": "George Lychock Career Website 1",
	"widgetID": "proj0001",
	"startdate": "2020-12-09",
	"duedate": "2021-06-09",
	"description": "This project updates my old website with a new Bootstrap4 layout.",
	"owner": "George Lychock",
	"percentcomplete": 20.0,
	"cpi": 1.06,
	"sv": 0.99,
	"livesite": "http://www.georgelychock-career.com/index.html",
	"milestones": [
		["2020-12-09T13:50:51.644000Z", "Project Launch"],
		["2021-01-09T13:50:51.644000Z", "Content Writing"],
		["2021-01-31T13:50:51.644000Z", "Wireframes"],
		["2021-02-09T13:50:51.644000Z", "Staging Release 1"]
	]
    }
-   There are 5 JS files: script.js contains most reused and custom scripts called by custom functions in projects.js and widget.js. Both project.js and widget.js are very similar and control how panels are added to the main dashboard sections. These are separated because 1) each dashboard section stores active widget data locally in different localStorage variables; 2) the markup and data retrieval for the API data is different enough to warrant separate functions from the functions that add the project panels to the dashboard. Otherwise every effort was taken to keep duplication of code to a minimum.


## Technical and Scope Constraints
-   The site will not have access to a database. All default project data will come from JSON files to simulate widget data streams.
-   The project will consist of just a landing page/dashboard; no secondary pages will be active. The focus of the project's first release is to address how the user can configure their primary view port: a summary of all their projects, displayed in a dashboard.
-   *Foot Note 1: The widgetID variable contains the unique IDs for the data stream avaiable for each widget available to the dashboard; its possible these values would be created with a Create Project module or Third Party app and stored in a database. They are hard coded here since db calls are out of scope. Search " //*1 " to see code in script.js file:
`        var widgetIDs = ["proj0001", "proj0002", "proj0003", "proj0004", "proj0005"];`

## Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
-   [JavaScript](https://www.javascript.com/)

## Frameworks, Libraries, & Programs Used

1. [Bootstrap 4.6:](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
    - Bootstrap was used to assist with the responsiveness and styling of the website.
2. [Google Fonts:](https://fonts.google.com/)
    - Google fonts were used to import the 'Montserrat' and 'Raleway' fonts into the style.css file which is used on all pages throughout the project.
3. [Bootstrap Icons:](https://icons.getbootstrap.com/)
    - Bootstrap Icons was used for all app icons
4. [jQuery:](https://jquery.com/)
    - jQuery came with Bootstrap and is used in custom JS.
5. [Git](https://git-scm.com/)
    - Git was used for version control by utilizing Visual Studio on my Linux laptop to commit to Git and Push to GitHub.
6. [GitHub:](https://github.com/)
    - GitHub is used to store the projects code after being pushed from Git.
7. [Font Awesome:](https://fontawesome.com/)
    - Font Awesome was used for a few of the icons where I did not like the Bootstrap versions or BS did not have a suitable icon.
8. [Toastr:](https://github.com/CodeSeven)
    - A notifications library recommended by my mentor Maranatha Ilesanmi.

### Resources Used
-   [jQuery: How do I test whether an element exists?](https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/). Used this method to check if the project panel was already added to the dashboard.
-   [MDN General Web Docs: ](https://developer.mozilla.org/) For semantic structure reference, arrays, localStorage, fetch.
-   [W3Schools.com](https://www.w3schools.com/), For Color Picker, html/css/js general refernece, semantic structure reference, arrays, localStorage.
-   [MDN - CSS Scrollbars](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars)
-   [How To Create a Custom Scrollbar (w3schools.com)](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp)
-   [Numeric Inputs – A Comparison of Browser Defaults](https://css-tricks.com/numeric-inputs-a-comparison-of-browser-defaults/), to adjust presence of spinner controls in FF

### APIs Used
-   [OpenWeather: ](https://openweathermap.org/api/one-call-api) Used the One-Call API to request weather information displayed in the weather Tool.
    -   Obtaining an API Key:
        -   Create an account at [OpenWeather.](https://openweathermap.org/)
        -   Choose API Keys from the user menu
        -   Give your key a nem.
        -   Copy the key into the value for 'key' in the widget0001.json file located in teh data/ folder

-   [GitHub API: ](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api) The GitHub API code came from Code Institute, see Code Credits, but information was used from the GitHub link provided here.

<a name="DPLY"></a>
## Deployment
### Hosting

The project was deployed to GitHub Pages hosting service:

[URL to GitHub Pages Site](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2)

### *CLOANING INFORMATION from CODE INSTITUTE README.md template from User Centric Module, edits have been made for changes in GH UI*
GitHub Pages
The project was deployed to GitHub Pages using the following steps...
   1. Log in to GitHub and locate the [Project-Management-Dashboard---MS2 GitHub Repository](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2)
   2. At the top of the Repository (not top of page), locate the "Settings" Button on the menu.
   3. Scroll down the Settings page until you locate the "GitHub Pages" Section.
   4. Under "Source", click the dropdown called "None" and select "Master Branch".
   5. The page will automatically refresh.
   6. Scroll back down through the page to locate the now published site link in the "GitHub Pages" section.

### Forking the GitHub Repository

1. Log in to GitHub and locate the [Project-Management-Dashboard---MS2 GitHub Repository](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2)
2. At the top of the Repository (not top of page) on the far right, locate the "Fork" Button. Sign in if needed.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [Project-Management-Dashboard---MS2 GitHub Repository](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2)
2. On the right of the file listings box, click the "Code" button.
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

```
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

7. Press Enter. Your local clone will be created.

```
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `CI-Clone`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Click [Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop) to retrieve pictures for some of the buttons and more detailed explanations of the above process.

<a name="CREDS"></a>
## Credits

### Code Credits
-   All Reused styles are in reused-styles.css
-   Scrollbar CSS Styling: from Digital Ocean: https://www.digitalocean.com/community/tutorials/css-scrollbars, in reused-styles.css

-   GitHub Widget Code from [Code Institute](https://codeinstitute.net/)
    -   This code originated from Code Institute's Interactive Frontend Development module for the Full Stack Software Developer course. Modifcations were mostly applied for struture and style.
    -   All JS code is in the github-information.js file.

-   The localStorage check code in script.js is from [MDN - Using_the_Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). This code checks to make sure that the browser can support localStorage and has it turned on. Find code use indicated by "CODE REUSE - localStorage Check "

-   Progress bars in the Project Panels came from Bootstrap Documentation: https://getbootstrap.com/docs/4.6/components/progress/:
    Find code use indicated by "CODE REUSE - Progress Bar"

-   Clear form
        Clearing loop reused from W3Schools.com: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements 
        
        var x = document.getElementById("projectFormModal");
        var i;
        for (i = 0; i < x.length ;i++) {
          x.elements[i].value = "";`
        }
-   Tooltips
    -   Used the CSS based tooltips code from W3Schools: https://www.w3schools.com/css/css_tooltip.asp
-   fetch
    -   Based on https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, but customized 
-   timestamp conversion, customized to capture AM/PM to control weather background; from Convert UNIX Timestamp https://www.w3resource.com/javascript-exercises/javascript-date-exercise-17.php

## Content

-   All content was written by the developer.

## Media

-   All Images were created by the developer.

## Acknowledgements
-   N/A

<a name="PROJ"></a>
# Project Management
## Sprints and Release Strategy
-   Sprint 1 2/21 - 2/27
    -   Make the ON/OFF buttons only open or close once
    -   Create multiple library buttons
    -   Create code to remove a button after the panel is activated to the dashboard
    -   Create code to add a button to the library after the panel is removed from the dashboard
    -   Figure out how to do local storage
    -   Code the Rebuild Library Buttons function from the localStorage
    -   Add Progress Bar to project panels
    -   Wireframe active project panels

-   ** First Mentor Session

-   Sprint 2 2/28 - 3/6
    -   Create Look and Feel
    -   Create a light and dark shade color scheme for overall appearance
    -   Add dashboard settings button
    -   Add clear dashboard button (in dashboard settings?)
    -   wireframe mobile home page

-   Sprint 3 3/7 - 3/13
    -   Add a third-party widget to the library
    -   Style widget panels
    -   Style Progress Bar to project panels
    -   Make a function for .append to pass the widget panel MU

-   Sprint 4 3/14 - 3/20
    -   Update Dark view styles
    -   Style dashboard settings modal
    -   Add clear dashboard button (in dashboard settings?)
    -   Wireframe mobile home page
    -   Create a Library settings modal to change R/L position of Library

-   ** Second Mentor Session

-   Sprint 5 3/21 - 3/28
    -   Research Firebase
    -   Setup Firebase account and key
    -   Create Firebase API html/JS files
    -   Test Firebase API
    -   FIX: When adding a project or widget to the dashboard while in the Dark Dashboard Scheme, the added panel is not styled correctly
    -   FIX: When reentering the site or refreshing the browser the scenario doesn't persist in the project panel heads on the dashboard in dark mode. 

-   Sprint 6 3/29 - 4/4
    -   Add Project Add Modal to Nav
    -   Create LocalStorage schema for user setting saving
    -   Add Project Delete Modal
    -   Style Project Add/Del Modals
    -   Add validation to Add Nodal
    -   Create Project Delete messaging/responses

-   Sprint 7 4/5 - 4/11
    -   Add cog tip to nav
    -   Create cog tip JS to highlight cogs
    -   Restyle Open Weather widget
    -   Add location input for Open Weather widget
    -   Save location to user settings localStorage

-   Sprint 8 4/12 - 4/18
    -   Restyle dark color scheme
    -   Create Mobile wireframe
    -   Apply mobile styling
    -   Apply desktop css media styles

-   Sprint 9 4/19 - 4/25
    -   Create Tablet wireframe
    -   Apply Tablet styling
    -   Apply Tablet Landscape css media styles

-   Sprint 10 4/26 - 5/2
    -   Add GitHub API widget to Library
    -   Add GitHub API widget to Dashboard

-   ** Third Mentor Session
-   5/4 - 5/5 - Sprint Planning

-   Sprint 11 5/3 - 5/9
    -   Sprint Planning
    -   Add TOC to RM
    -   Make Library sections overflow to scroll
    -   Add dev site web link to Add Project modal
    -   FIX: Delete Project modal bug
    -   FIX: Cog tip bug
    -   Add information link to Nav

-   Sprint 12 5/10 - 5/16
    -   Create a modal to have a user log in
    -   Save user login data to LS
    -   When creating new project, default Owner to logged in user, but give ability to change owner
    -   Apply Toastr notifications

-   Sprint 13 5/17 - 5/23
    -   Submit for Peer Review
    -   Breakout Testing sections in RM
    -   Test
    -   Add device and browser compatibility section in RM
    -   Submit to Maranatha
