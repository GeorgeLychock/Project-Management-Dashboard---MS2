## George Lychock - MS2 Project: Project Management Dashboard
### Salem State University Fullstack Software Developer Certificate
#### JavaScript/jQuery/API/DOM Module
-   Live Dev Site - [View](http://www.georgelychock-career.com/pages/_sandbox/ms2/index.html)
### Use Case:
A configurable user dashboard that displays and organizes key metrics and data from third-party datastreams such as a project schedule, a to-do-list, or a project metrics aggregator. The third-party datastream can come from a sister API of the dashboard app or some API from a vendor such as Smartsheet. These datastreams are congifured as widget elements that can be added and removed from the main dashboard viewport. A widget library is visible as a side menu giving the user the ablility to click various widgets on, and off, the main dashboard viewport.
A limited number of widget view settings will be available from the widget window once the widget is added to the main dahsboard viewport.
Activated widgets and viewport/widget settings should be persistent when a user returns to the app.

#### Note
    -   The primary focus of this project is to display JavaScript, jQuery, and API skills learned in the Interactive Frontend Development Module of the Salem State University / Code Institute Full Stack Software Developer Certificate Program. The website will have limited styling and content since functionality takes precedence under the time constraints.
    -   The site consists of one page, a dashboard.
    -   Navbar, banner, and footer sections exist, but only as placeholders, little or no content will be added to them for project submission.
    -   The project is looked at as a "desktop-first" scenario. Styling and structure efforts for tablet and mobile viewports are minimalized but while keeping main functionality and components/content intact.


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
-   Although a fully functioning rendering of the site will be accessible from any device, the app is optimized for desktop use.
-   A light and dark version have been mocked up to show how the app can change based on a user selection in a settings panel.
-   Mockups:
    -   Desktop Look and Feel - Light - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-light.png)
    -   Desktop Look and Feel - Dark - [View](https://github.com/GeorgeLychock/Project-Management-Dashboard---MS2/blob/master/_documentation/look-and-feel/desktop-dark.png)

### Dashboard Structure
-   Nav, Header, and Banner sections span the top of the desktop viewport
-   Main Dashboard, split between a Projects section and a Tools/Widgets section, taking up approximately 2/3 the width of the desktop viewport;  these will be stacked in mobile vp.
-   Projects and Tools/Widgets Libraries are connected and in a column that spans 1/3 the desktop viewport
-   A footer section spans the bottom of all viewports
-   A significant amount of structure and js is needed to move the Library Panel from a column in desktop/mobile view to a Bootstrap Dropdown in mobile view, please see comments for more information

### Project Folder Structure
-   The css/, js/ folders are located directly off the root folder
-   All JSON files are located in folder data/

### Data Structure and Flow
-   The widgetID (for projects and widgets/tools) drives everything; it is the unique ID for any content added to the Dashboard and allows the app to target and track what data is being displayed.
-   The Library buttons are duplicated for both desktop and mobile viewports since each displays the Libraries in completely different ways. There is an extra function and markup to support having the Library as a 3col panel in desktop, but featured as a dropdown in mobile.
-   I used a visual to help figure out how to create and retain the widgetID information so that the app can build the library buttons, turn widget panels ON and OFF, and retain the widgetIDs so that the Dashboard can be built again upon the app being relaunched.
[widgetID Data Flow](https://github.com/GeorgeLychock/ssu-interactive-ms2/blob/master/_documentation/data-structure/MS-2-data-flow-01.png)
-   For Projects data, I created a simple JSON structure for the project/widget data. I want to show that the app can parse data from JSON since many APIs will supply data in that way:
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
    -   Known code that is duplicated:
        -   These next four (4) functions can be made common if we pass the onClick function name from the calling function: buildWidgetLibBtnMU(data), buildWidgetLibBtnMUMobile(data), buildProjectLibBtnMU, buildProjectLibBtnMUMobile(data)
        -   The localStorage check code in script.js is from MDN. Currently a solution cannot be found to var in the .localName (localWidgets in the code below):
            ``` // Check if localStorage is enabled
                if (storageAvailable('localStorage')) {
                // YES: We can use localStorage, check if localStorage var has been initiated
                 if (localStorage.localWidgets) ```
-   Write Jasmine tests when possible, time permitted

### Future Features
-   A Calendar widget
-   A To-Do List widget
-   Ability to shuffle (re-position) the dashboard panels
-   Add a status indicator to the project panels.

### Release Strategy
-   Sprint 1 2/21 - 2/27
    -   Make the ON/OFF buttons only open or close once
    -   Create multiple library buttons
    -   Create code to remove a button after the panel is activated to the dashboard
    -   Create code to add a button to the library after the panel is removed from the dashboard
    -   Figure out how to do local storage
    -   Code the Rebuild Library Buttons function from the localStorage
    -   Add Progress Bar to project panels
    -   Wireframe active project panels

-   Sprint 2 2/28 -3/6
    -   Create Look and Feel
    -   Create a light and dark shade color scheme for overall appearance
    -   Add dashboard settings button
    -   Add clear dashboard button (in dashboard settings?)
    -   wireframe mobile home page

-   Sprint 3 3/7 -3/13
    -   Add a third-party widget to the library
    -   Style widget panels
    -   Style Progress Bar to project panels
    -   Make a function for the widget panel build return w .append

### Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
-   [JavaScript](https://www.javascript.com/)
-   [jQuery](https://jquery.com/)

### Frameworks, Libraries & Programs Used

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

## Testing

The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project. I also used the W3C Link Checker but do not include the results here to save space.

-   [W3C Markup Validator (Nu)](https://validator.w3.org/nu/)
    - [Results-index.html](https://github.com/GeorgeLychock/georgelychock-career/blob/main/_documentation/validation/w3c-nu-html-index-screenshotfrom2021-01-05.png) NO ERRORS
-   [W3C CSS Validator (Jigsaw)](https://jigsaw.w3.org/css-validator/#validate_by_uri+with_options) - [Results](https://github.com/GeorgeLychock/georgelychock-career/blob/main/_documentation/validation/jigsaw-css-screenshotfrom2021-01-04.png)
-   [Lighthouse](https://jigsaw.w3.org/css-validator/#validate_by_uri+with_options)
    - [Results: Desktop Report - Home (index)](https://github.com/GeorgeLychock/georgelychock-career/blob/main/_documentation/validation/gl-career-lighthouse-desktop-index.jpg)
    - [Results: Mobile Report - Home (index)](https://github.com/GeorgeLychock/georgelychock-career/blob/main/_documentation/validation/gl-career-lighthouse-mobile-index.jpg)

-   ### Testing User Stories from User Experience (UX) Section
    -   #### General User Experience
        -   **Story 1** As a Site Visitor, I want to have a persistent navigation element/method allowing me to jump to any site content quickly.
            -  ##### Acceptance Criteria -- Duplicated in Testing below
                1.  The most detailed Content is never more than **two clicks** away from home.
                2.  Home is always **one click** away from anywhere on the site.
                3.  Nav dropdown (collapse) is *prohibited*
                4.  Either links to sub pages and/or Home should be visible on any page at any scroll point on any viewport.
            -   ##### Results
                -   (1 and 2) PASS Since there is only only sub level of pages, user is never more than 1 click from home or one click from most detailed information available.
                -   (3) PASS No nav icon nor dropdown exists'
                -   (4) PASS Every sub page has at least the Home icon visible at all times, all ports. [Screenshot](https://github.com/GeorgeLychock/georgelychock-career/blob/main/_documentation/testing/screenshots/userst-1_4-screenshotfrom2020-11-23.png)

### (Jasmine) Test Sequences:
-   Create a library button that turns a div ON in the active widet viewport
-   Create a library button that turns a div OFF in the active widet viewport
-   Correctly render data from an external JSON files

### Further Testing

-   The Website was tested on Google Chrome, Firefox and Safari browsers.
-   The website was viewed on a variety of devices such as Desktop, Laptop, iPhone6, iPad8.
-   Testing was done to ensure that all pages were linking correctly.
-   A design professional friend of mine spent 30 minutes with me reviewing the overall design after all pages were constructed and styled.
-   All pages were given at least one cold read.
-   Used Lighthouse to identify areas on improvement which are documented below in Fixed Bugs after Testing.

### Fixed Bugs after Testing
-   Issue: On tablet viewports the My Profile Section overflows on the Credentials Section on Home page.
    -   Fix: Adjusted the row divs style to be completely responsive across all viewports, portrait and landscape. Also adjusted the My Profile links to take up less width.

### Known Bugs
-   No known errors as of 1/5/21

## Deployment
### Hosting

The project was deployed to GitHub Pages hosting service:

[URL to GitHub Pages Site](https://georgelychock.github.io/georgelychock-career/)

GitHub Pages
The project was deployed to GitHub Pages using the following steps...
   1. Log in to GitHub and locate the [georgelychock-career GitHub Repository](https://github.com/GeorgeLychock/georgelychock-career)
   2. At the top of the Repository (not top of page), locate the "Settings" Button on the menu.
       ◦ Alternatively Click Here for a GIF demonstrating the process starting from Step 2.
   3. Scroll down the Settings page until you locate the "GitHub Pages" Section.
   4. Under "Source", click the dropdown called "None" and select "Master Branch".
   5. The page will automatically refresh.
   6. Scroll back down through the page to locate the now published site link in the "GitHub Pages" section.

## *CLOANING INFORMATION from CODE INSTITUTE README.md template from User Centric Module*
### Forking the GitHub Repository

1. Log in to GitHub and locate the [georgelychock-career GitHub Repository](https://github.com/GeorgeLychock/georgelychock-career)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [georgelychock-career GitHub Repository](https://github.com/GeorgeLychock/georgelychock-career)
2. Under the repository name, click "Clone or download".
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

## Credits

### Resources Used
-   jQuery: How do I test whether an element exists? - [View](https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/). Used this method to check if the project panel was already added to the dashboard.
-   [MDN Web Docs](https://developer.mozilla.org/) : For Semantic Structure reference.

### Code Credits
-   All Reused styles are in reused-styles.css
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