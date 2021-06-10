# George Lychock - MS2 Project: Project Management Dashboard - Testing Documentation
### Salem State University Fullstack Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module

-   [View Live Dev Site](https://georgelychock.github.io/Project-Management-Dashboard---MS2/)

<hr>

<h1 align="center"><img src="_documentation/look-and-feel/montage-screenshot.png" /></h1>

## Table of Contents

-   [Usability](#TESTUSABILITY)
-   [Functionality](#TESTFUNCTIONALITY)
-   [User Stories](#TESTSTORIES)
-   [Validation](#TESTVALID)
-   [Compatibility](#TESTCOMP)

- [Bugs and Fixes](#BUGS)

# Testing
Used test writing guidelines from the following resources:
    [Guru99](https://www.guru99.com/complete-web-application-testing-checklist.html), [softwaretestinghelp.com](https://www.softwaretestinghelp.com/web-application-testing/)
-   NOTE: Usability and Functionality test criteria were written based on development version but then verified once deployed to GitHub Pages.
-   NOTE: All Validation results reported below are based on the deployed app via GitHub Pages.

<a name="TESTUSABILITY"></a>
## Usability Testing
Unless otherwise noted, all the following was tested and passed:
-   Web page content should be correct without any spelling or grammatical errors
-   Tool tip text should be present upon hovering the User Menu dropdown icons.
-   Enough space should be provided between field labels, columns, rows, and error messages.
-   All the buttons should be in a standard format and size.
-   Check for broken links and images.
-   Confirmation message should be displayed for any kind of update and delete operation.
-   Perform Peer Review
-   Scroll bar should appear only if required.
-   If there is an error message on submit, the information filled by the user should remain.
-   All fields (Textbox, dropdown, radio button, etc) and buttons should be accessible by keyboard shortcuts and the user should be able to perform all operations by using keyboard.
    -   FAIL: Tab sequence and :focus styles need to be applied across the app

<a name="TESTFUNCTIONALITY"></a>
## Functionality Testing
Unless otherwise noted, all the following was tested and passed:
### General
-   All images and icons render correctly
-   All buttons show pointer on hover
-   Mandatory fields validate correctly, display message
-   User Menu dropdown icons fire a menu or message
-   All Library buttons add a panel to the dashboard

### Navigation Bar
-   #### Project Add
    -   Click on the Add Project nav item: Project Add modal should appear
    -   Fields for the following should appear on modal:
        -   Project Name (required)
        -   Project Owner
        -   Project Description
        -   Start Date (date format)
        -   Due Date (date format)
        -   Percent Complete (number format, valid from 0-100)
        -   Cost Performance Index (number format, valid from 0.0 - 2.0)
        -   Schedule Variance (number format, valid from 0.0 - 2.0)
        -   Project Site URL, currently needs to include full domain
    -   Project Name is mandatory; indicated by asterisk, color red
    -   No other fields should be mandatory
    -   Clicking Save Project Data should produce an error text, color red, under all mandatory fields
    -   Clicking Save Project Data should produce a confirmation message that the project has been saved
    -   Modal should hide when Close or Save Project Data is clicked

-   #### Project Delete
    -   Click on the Delete Project nav item: Project Delete modal should appear
    -   If there are no saved projects yet added, a message show be presented to add projects
    -   Saved projects should be listed and presented as buttons
    -   Each project button should perform the following when clicked:
        -   Project panel should be removed from dashboard, if present
        -   Project Library button should be removed from the desktop/tablet Library Panel, if present
        -   Project Library button should be removed from the Library dropdown in the user menu, if present
        -   Project button should be removed from the Delete Project modal
    -   Modal should hide when Close is clicked

-   #### Settings Cog Instructions
    -   Hover over the cog instructions on the left side of the nav in desktop view:
        -   The cog in the instructions should turn red
        -   The cog in the user menu should turn red
        -   All cogs in the header, library, and dashboard should turn red and display a small arrow to the right of the cog
        -   When the mouse is moved off the instruction, arrows should be removed and cogs returned to initial color
-   ### What is pmDashboard?
    -   Clicking on "What is pmDashboard?" text should display a modal
    -   Modal should hide when Close is clicked
-   ### Header
    -   Settings cog should be present close to the App title
    -   Clicking on the cog should display a modal
    -   Modal should offer user to set the color scheme to light or dark
    -   When the user clicks the dark setting, the app changes appearance to a darker color scheme for background and main sections
    -   When the user clicks the light setting, the app changes appearance to a lighter (default) color scheme for background and main sections
    -   Modal should hide when an option is chosen

-   ### User Login/Menu
    -   When a user first enters the app, a login button should be present on the right side of the header in desktop/tablet views, immediately below the title in mobile views
    -   Clicking the login button should display a modal
    -   The modal should offer the user the ability to enter and save a user name
    -   Modal should hide when Close is clicked
    -   When the save button is clicked the user name should be added to the user panel on the right-hand side of the header; modal should close
    -   After save, a user menu should appear with the following buttons:
        -   Library
        -   Profile
        -   Settings
        -   Log Out
    -   Library button should display a dropdown that contains the non-activated widget buttons; library button functionality should replicate as described above
    -   Profile button should display a dropdown informing user of future functionality
    -   Settings button should display a dropdown that contains all available user setting options found on the app.
    -   Log Out button should produce a modal
    -   Log Out modal should offer user the ability to close the panel
    -   When a user logs out the user panel should hide and the Log In button should return

-   ### Library
    -   Click on a library button in the Library Panel of the desktop view: the widget panel should be added to the dashboard; the library button is removed from the Library; library button is also removed from the Library Dropdown in the user menu, if present
    -   When the number of Library buttons exceeds max height of the Library panel, a scroll bar should appear
    -   Settings cog should be present close to the top Library title
    -   Clicking on the cog should display a modal
    -   Modal should offer user ability to set the position of the desktop Library Panel
    -   When the user clicks the right position button, the Library Panel moves flush right;
    -   When the user clicks the left position button, the Library Panel moves flush left (default); 
    -   Modal should hide when and position choice is made or the Close button is clicked

-   ### Project Panels
    -   When a user clicks the Close Panel button:
        -   The project panel should be removed from the dashboard
        -   The project library button should be added back to the Library Panel and Library dropdown in the user menu
        -   The project panel should remain unseen when the user returns to the app in a new browser session

-   ### Widget Panels
    -   GitHub Panel
        -   A GitHub Tool button should be present in the Tools Libraries when a user first enters the app
        -   When the user clicks the GitHub library button, the GitHub Tool panel is added to the Dashboard, the button is removed from the Libraries
        -   When a user clicks Close Panel on the GitHub dashboard panel is removed from the Dashboard and the GitHub library buttons are added to the Libraries
        -   When a user enters a valid GitHub username the following are displayed:
            -   GitHub UserName
            -   User Avatar
            -   Link to GitHub user profile
            -   Data on # of user repos, # of followers, # following
            -   A list of the user's GitHub Repos
            -   The Repo list should be scrollable if there are more repos than can be displayed in the panel
    -   Open Weather Panel
        -   An Open Weather button should be present in the Tools Libraries when a user first enters the app
        -   When the user clicks the Open Weather library button, the Open Weather panel is added to the Dashboard, the button is removed from the Libraries
        -   When a user clicks Close Panel on the Open Weather dashboard panel is removed from the Dashboard and the Open Weather library buttons are added to the Libraries
        -   The Open Weather dashboard panel should display the following:
            -   Weather location (default city is Quincy, MA, USA)
            -   The time the weather tool was last refreshed, in the user's local time
            -   An AM/PM indicator next to the time
            -   Temperature with a degrees symbol
            -   The weather description
            -   The panel should display a dark setting if local time is after 7PM; display a light (sunny) setting if local time is after 7AM
            -   A setting cog should be accessible from the panel header
        -   A settings modal should be presented when the user clicks the settings cog
        -   The modal should give the user the ability to change the weather location, either by ZIP Code or by city name

-   ### User Settings
    -   Persistence, the following user settings should be recalled by the app when a user returns and cache has not been cleared:
        -   Color Scheme
        -   Library Position
        -   Username
        -   Open Weather location

-   ### Mobile
    -   A Nav Dropdown should offer the user access to Add Project and Delete Project
    -   The User Menu should be presented if a username has been logged in
    -   The Library Panel found on the desktop/tablet viewports should not be present on mobile
    -   The settings dropdown in the user menu should not contain option to position the Library Panel

<a name="TESTVALID"></a>
## Validation
NOTE: All Validation results reported below are based on the deployed app via GitHub Pages.
The W3C Markup Validator and W3C CSS Validator Services were used to validate all html and css files in the project to ensure there were no syntax errors in the project.

-   [W3C Markup Validator (Nu)](https://validator.w3.org/nu/)
    -   index.html, NO ERRORS
    -   <img src="_documentation/testing/nu-html-validate-index-html.png" />

-   [W3C CSS Validator (Jigsaw)](https://jigsaw.w3.org/css-validator/#validate_by_uri+with_options)
    -   reused-style.css, ERRORS: the errors all pertain to the scrollbar stying incorporated. scrollbar-width and scrollbar-color are only supported by FF, throwing the error in the validator. Vendor prefixes are used to style the scrollbars similarly for all other browsers
    -   <img src="_documentation/testing/css-validate-reused-style-css.png" />
    -   github-styles.css, NO ERRORS
    -   <img src="_documentation/testing/css-validate-github-styles-css.png" />
    -   widget.css, NO ERRORS
    -   <img src="_documentation/testing/css-validate-widget-css.png" />
    -   style.css, NO ERRORS
    -   <img src="_documentation/testing/css-validate-style-css.png" />
-   [Lighthouse](https://developers.google.com/web/tools/lighthouse)
    -   Desktop Report - index.html
    -   <img src="_documentation/testing/desktop-lighthouse-index-html.png" />
    -   Mobile Report - index.html
    -   <img src="_documentation/testing/mobile-lighthouse-index-html.png" />
    -   Desktop Report - index.html - Logged In User, project and tools panels activated
    -   <img src="_documentation/testing/desktop-lighthouse-index-html-logged-in.png" />
    -   Mobile Report - index.html - Logged in User, project and tools panels panels activated
    -   <img src="_documentation/testing/mobile-lighthouse-index-html-logged-in.png" />
- [JSHint](https://jshint.com/) was used to check Javascript function logic and syntax. The following were errors captured during testing that have not been addressed:

    -   script.js functions
        -   f001 - getData
            -   <img src="_documentation/testing//jshint/JSHint-script-js-f001.png" />
        -   f003 - whatColorScheme
            -   <img src="_documentation/testing//jshint/JSHint-script-js-f003.png" />
        -   f004 - validateInput
            -   <img src="_documentation/testing//jshint/JSHint-script-js-f004.png" />
    -   projects.js functions
        -   f001 - createActiveProjects
            -   <img src="_documentation/testing//jshint/JSHint-projects-js-f001.png" />
        -   f002 - createProjectLibBtns
            -   <img src="_documentation/testing//jshint/JSHint-projects-js-f002.png" />
        -   f003 - delProject
            -   <img src="_documentation/testing//jshint/JSHint-projects-js-f003.png" />
    -   widgets.js functions
        -   f001 - buildWeatherPanelMU
            -   <img src="_documentation/testing//jshint/JSHint-widgets-js-f001.png" />

<a name="TESTSTORIES"></a>
## User Story Testing
Testing User Stories from User Experience (UX) Section

### Story 1
As a visitor, I want to view the projects and tools available to add to a main dashboard so I can have a clear, one-stop view of all my projects' status and tools I'm currently using.
-   Acceptance Criteria
    -   There is an indication that I'm the user logged in
    -   My available projects are indicated in a side panel or other persistent section; called a Library.
    -   I can see further detail of a given project in a larger, more prominent Dashboard.
    -   It is clear what elements on the dashboard are projects, and which are tools.
-   Results
    -   PASS: All criteria met
        -   Screeshot:
            -   <img src="_documentation/testing/user-stories/user-story-01.png" />
    
### Story 2
As a visitor, I want to Add or Remove project detail panels from the Dashboard so I can view and interact with project data and tools.
-   Acceptance Criteria
    -   There is a library of project and tool buttons I can use to add/remove panels to the dashbaord
    -   The buttons clearly indicate what they are for
    -   I can Add a project detail panel to the dashboard
    -   I can Remove a project detail panel
    -   I can Add a tool panel from the dashboard
    -   I can Remove a tool panel from the dashboard
-   Results
    -   PASS: All criteria met

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
-   Results
    -   PASS: All criteria met
        -   Screeshot:
            -   <img src="_documentation/testing/user-stories/user-story-03.png" />

### Story 4
As a visitor, when I return to the site, all widgets (projects and tools) I made active are still active on the Dashboard.
-   Acceptance Criteria
    -   Active widgets are present when I return to the site
    -   Buttons for any available widgets not already activated to the dashboard are present in the Library
-   Results
    -   PASS: All criteria met

### Story 5
As a visitor, I want the ability to change certain dashboard visual settings to make the app have a more customized experience.
-   Acceptance Criteria
    -   The color scheme is light when I first log in, view Dashboard
    -   I can change the color Scheme using a button to a dark scheme
    -   I can change the scheme back to light
    -   The color scheme I used last will be present when I come back to the site
    -   I can position the Library Panel on the right or the left of desktop or tablet view ports
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-05a.png" />
            -   <img src="_documentation/testing/user-stories/user-story-05b.png" />
            -   <img src="_documentation/testing/user-stories/user-story-05c.png" />
            -   <img src="_documentation/testing/user-stories/user-story-05d.png" />

### Story 6
As a visitor, I want instruction or an indication of how and where to change dashboard visual settings.
-   Acceptance Criteria
    -   A visual message or banner informs me how to change settings
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-06.png" />

### Story 7
As a visitor, I want to be able to change the location of the active weather Tool.
-   Acceptance Criteria
    -   A method to change the location for the weather tool is available from the Tool panel
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-07.png" />

### Story 8
As a vistor, I want a method to gain more information on what pmDashboard is and what its features are.
-   Acceptance Criteria
    -   About this site information is available in a link to the user
    -   The information is a simple list of purpose and features of pmDashboard
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-08a.png" />
            -   <img src="_documentation/testing/user-stories/user-story-08b.png" />

### Story 9
As a vistor, I want a method to save my username so my user menu is displayed offering certain user options.
-   Acceptance Criteria
    -   A login button is present when a user first enters the app
    -   My username can be saved
    -   My username appears along with a user menu once the username is saved
    -   My username and menu appears when I return to the site
    -   My username can be removed
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-09a.png" />
            -   <img src="_documentation/testing/user-stories/user-story-09b.png" />

### Story 10
As a logged in user, I want the ability to access my Projects and Tools Library from a dropdown in the user menu so I can add and remove widgets.
-   Acceptance Criteria
    -   A Library dropdown appears from the user menu
    -   I can add a panel to the dashboard from the dropdown
    -   When I remove a panel from the dashboard, a button reappears in the dropdown for that widget
    -   I can close the Library dropdown
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-10.png" />

### Story 11
As a logged in user, I want the ability to access all user settings from a dropdown in the user menu so I can access all options from a single location.
-   Acceptance Criteria
    -   A settings dropdown appears in the user menu
    -   In desktop vp, I can access and control Color Scheme, Library Panel position, and weather Tool location
    -   In a mobile vp, I CAN NOT access the Library Panel position settings
    -   I can close the settings dropdown
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-11.png" />

### Story 12
As a visitor, I want the ability to view a valid GitHub User's repo list and basic information.
-   Acceptance Criteria
    -   A GitHub Tool is accessible from the Libraries
    -   I can input a GitHub username into a field
    -   The Tool returns a user repo list and basic user information and a user avatar once I enter a valid username
    -   The basic user information includes: Avatar, username, user profile link, # of followers, # of users the user is following, total # of repos
    -   I can close the GitHub Tool panel
    -   GitHub username input does not persist when I return to the app
-   Results
    -   PASS: All criteria met
        -   Screeshots:
            -   <img src="_documentation/testing/user-stories/user-story-12a.png" />
            -   <img src="_documentation/testing/user-stories/user-story-12b.png" />

<a name="TESTCOMP"></a>
### Compatibility Testing
-   The Website was tested on Google Chrome, Firefox, Microsoft Edge, Internet Explorer, and Safari browsers on a limited number of devices. Browser simulators were used to test most major viewports, testing on actual devices is a follows:
    -   <img src="_documentation/testing/compatibility-chart.jpg" />
-   When testing in IE11, scripts would not run
-   The website was viewed on a variety of devices such as Desktop, Laptop, iPhone6, iPad8.
-   Used Lighthouse to identify areas on improving Accessibility, SEO, and good general practices

<a name="BUGS"></a>
## Bugs / Fixes
### Known Bugs
#### OPEN 
-   User needs to be logged in to view the Library menu on mobile devices. This isn't necessarily a bug as it is a design issue with the concept version of this app. In a production version a user wouldn't be able to view any Libraries unless they are logged in. For conceptual purposes, we show the Libraries even though a user may not have "logged in".
-   EFFICIENCY MARKER: [script.js:removeWidgetID] The code for deleting a project or removing a dashboard panel from the local storage array should be made into arrow function(s) if possible
-   The arrow pointer on the weather widget doesn't line up correctly when the user hovers the cog instruction line in the top nav.
-   Percent Complete, CPI, and SV fields on Project Add modal should be validated for acceptable value range; increment (increase/decrease) buttons are very small
-   Increment buttons should not display on Zipcode input field on Open Weather widget settings modal
-   Library Buttons:
    -   The button icon and button text do not :hover simultaneously
-   Log Out modal does not close when user confirms to delete the username
    -   Tried $("#logOutPanel").modal("hide") and researching on internet, but keep getting "...not a function" errors
-   Toastr notifcations shift when the user closes the modal that triggered the Toastr; issue with modal, the scrollbar pushes the Toastr div when modal is dismissed
-   The instructions/confirmation messages on the Add Project modal do not work correctly: 1) When a user creates another project without closing the Add Project modal

#### FIXED
-   Library Buttons:
    -   A black box appears when a user clicks a library button (also occures in Delete Project modal). Need to adjust Bootstrap styles for buttons.
        -   FIX: Adjusted Bootstrap style for button:focus
-   The instructions/confirmation messages on the Add Project modal do not work correctly: 1) After the first custom project is saved via Add Project
    -   FIX: Changed function clearProjectFormAlerts() and saveProjectDataModal to clear and display messages in the correct sequence
-   Delete Project modal still opens after the initial user warning if there are no custom projects to delete
    -   FIX: Changed the if statement in function createDeleteProjectList()
-   Open Weather - Current time displays a negative value before 12pm
    -   FIX: Fixed code in Unix_timestamp function
-   BLOCKER: When deleting a project or removing a dashboard panel the local storage array isn't being updated correctly resulting in erroneous library, dashboard, and delete projects functionality when refreshing the browser.
    -   FIX: Recorded the routine that removes widget IDs from local storage; created a common function in script.js to handle removing IDs
-   When adding a project or widget to the dashboard while in the Dark Dashboard Scheme, the added panel is not styled correctly.
    -   FIX: Added whatColorScheme() and a selector scheme to capture the current color scheme setting and apply it to any added buttons
-   When reentering the site or refreshing the browser the scenario class is not being added to the project panel heads on the dashboard in dark mode.
    -   FIX: Added whatColorScheme() and a selector scheme to capture the current color scheme setting and apply it to any added panels
-   Hover Cog Hint in Nav displays a "Click Me!" next to the icon in the nav text
    -   FIX: Adjusted selectors so the Click Me! tip only displays next to cogs in the Library and Dashboard. 