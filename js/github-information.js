/* George Lychock - MS2 Main Javascript File */
/* The following doce was adapted from Code Institute's Interactive Frontend Development module for the Full Stack Software Developer course
See README.md for more information */


function userInformationHTML(user) {
    return `
        <h6>GitHub Profile:</h6>
        <div class="d-inline">
            <div class="pmd-gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" height="30px" alt="${user.login}">
                </a>
            </div>
            <div class="pmd-gh-username">${user.name}
                <span class="pmd-gh-namelink">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
                </span>
            </div>
        </div>

        <div class="gh-content d-inline">

        </div>
        <div class="pmd-gh-info">Followers: ${user.followers} | Following: ${user.following} | Repos: ${user.public_repos}</div>
        </div>
    `;
}
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    return `<div class="clearfix repo-list">
                <div class="pmd-gh-repolist-title">
                    <h6>User's GitHub Repos:</h6>
                </div>
                <div class="pmd-gh-repolist">
                    <ul>
                        ${listItemsHTML.join("\n")}
                    </ul>
                </div>
            </div>`;
}
function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("gh-repo-data").html("");
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html('<div class="pmd-gh-inputmsg">*</div>');
        return;
    }
    $("#gh-user-data").html(
        `<div id = "loader">
        <img src="images/loader.gif" alt="loading..." />
        </div>`);
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}.</h2>`);
            } else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2`);
            }
        });
    }

    $(document).ready(fetchGitHubInformation);