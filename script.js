const error = document.getElementById("error");
const mini = document.getElementById("mini");
const profileImage = document.querySelector(".profile-image img");
const langs = document.querySelector(".most-used-languages img");
const streak = document.querySelector(".streak img");
const stat = document.querySelector(".stat img");
const name = document.querySelector(".name");
const usernameEl = document.querySelector(".username");
const bio = document.querySelector(".bio");
const locationInfo = document.querySelector(".location");
const profileLink = document.querySelector("a");
const statsValues = document.querySelectorAll(".stats-value");

const searchGithub = async (random) => {
    
    const headers = {
        "Authorization": `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE`,
        'User-Agent': 'GitHub User Finder'
    };

    if(random){
        const usersResponse = await fetch('https://api.github.com/users');
        const users = await usersResponse.json();
        const randomUser = users[Math.floor(Math.random() * users.length)];
    
        const response = await fetch(randomUser.url, { headers });
        const data = await response.json();

        if(checkStatus(response)){
            account(data);
        }

        const username = data.login;
        fetchRepos(username, data, headers);
        fetchFollowers(username, data, headers);
        fetchFollowing(username, data, headers);
        fetchStarred(username, data);
        displayStats(data);
    }
    else{
        const username = document.getElementById("searchInput").value;
        const response = await fetch(`https://api.github.com/users/${username}`, { headers });
        const data = await response.json(); 

        if(checkStatus(response)){
            account(data);
        }
        fetchRepos(username, data, headers);
        fetchFollowers(username, data, headers);
        fetchFollowing(username, data, headers);
        fetchStarred(username, data);
        displayStats(data);
    }
    
    
};

function displayStats(data){
    langs.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=blueberry`;
    streak.src = `https://streak-stats.demolab.com/?user=${data.login}&theme=blueberry`;
    stat.src = `https://github-readme-stats.vercel.app/api?username=${data.login}&theme=blueberry`;
}

function displayRepos(repos, data){
    // Display repositories
    
    const reposContainer = document.getElementById("Repos");

    let repoList = '';
    if(repos.length == 0){
        reposContainer.innerHTML = `<br><h1>User doesn't have any repos!</h1>`;
    }
    else{
        if(data.public_repos <= 100){
            repoList += `<h2 style="text-align:center;">${data.login} has ${repos.length} public Repositories</h2>`;
        }
        else{
            repoList += `<h2 style="text-align:center;">${data.login} has ${data.public_repos.toLocaleString()} public Repositories</h2>`;
            repoList += `<h5 style="text-align:center;">Only displaying 100</h5>`;
        }
        repos.forEach((repo) => {
            repoList += `
                <div class="repo-detail">
                    <h2>${repo.name}</h2><br>
                    <p>${repo.description || 'No description'}</p><br>
                    <a href="${repo.html_url}" target="_blank"><button>Go to repository</button></a>
                </div>
            `;
        });
        reposContainer.innerHTML = repoList;
    }
}

function displayFollowers(followers, data){
    // Display followers
    const followersContainer = document.getElementById("Followers");

    let followersList = '';
    if(followers.length == 0){
        followersContainer.innerHTML = `<br><h1>User doesn't have any followers!</h1>`;
    }
    else{
        if(data.followers > 100){
            followersList += `<h2 style="text-align:center;">${data.login} has ${data.followers.toLocaleString()} Followers</h2>`;
            followersList += `<h5 style="text-align:center;">Only displaying 100</h5>`;
        }
        else{
            followersList += `<h2 style="text-align:center;">${data.login} has ${followers.length} Followers</h2>`;
        }
        followers.forEach((follower) => {
            followersList += `
            <div class="follower-profile">
                <div class="profile-image" style="width: 100px;height: 100px;">
                    <img src="${follower.avatar_url}" alt="${follower.login}'s Profile Image" />
                </div>
                <div class="profile-details">
                    <h2>${follower.login}</h2>
                    <br>
                    <a href="${follower.html_url}" target="_blank" class="btn-profile"><button>Go to profile</button></a>
                </div>
            </div>
            `;
        });
        followersContainer.innerHTML = followersList;
    }

}

function displayFollowing(following, data){
    const followingContainer = document.getElementById("Following");

    let followingList = '';
    if(following.length == 0){
        followingContainer.innerHTML = `<br><h1>User isn't following anyone!!</h1>`;
    }
    else{
        if(data.following > 100){
            followingList += `<h2 style="text-align:center;">${data.login} is following ${data.following.toLocaleString()} people</h2>`;
            followingList += `<h5 style="text-align:center;">Only displaying 100</h5>`;
        }
        else{
            followingList += `<h2 style="text-align:center;">${data.login} is following ${following.length} people</h2>`;
        }
        following.forEach((follow) => {
            followingList += `
            <div class="follower-profile">
            <div class="profile-image" style="width: 100px;height: 100px;">
                <img src="${follow.avatar_url}" alt="${follow.login}'s Profile Image" />
            </div>
            <div class="profile-details">
                <h2>${follow.login}</h2>
                <br>
                <a href="${follow.html_url}" target="_blank" class="btn-profile"><button>Go to profile</button></a>
            </div>
        </div>
            `;
        });
        followingContainer.innerHTML = followingList;
    }
}

const countStarred = async (url) => {
    let count = 0;
    while (url) {
        const response = await fetch(url);

        const data = await response.json();
        count += data.length;

        const linkHeader = response.headers.get('Link');
        const nextLink = linkHeader && linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        url = nextLink ? nextLink[1] : null;
    }
    return count;
};

async function displayStarred(starred, username){
    const starredContainer = document.getElementById("Starred");
    let starredList = '';

    if (starred.length === 0) {
        starredContainer.innerHTML = `<br><h1>No starred repos!</h1>`;
    } 
    else {
        //Count starred repos
        let url = `https://api.github.com/users/${username}/starred?per_page=100`;

        let count = await countStarred(url);

        if(count > 100){
            starredList += `<h2 style="text-align:center;">${username} has ${count.toLocaleString()} starred public Repositories</h2><h5 style="text-align:center;">Only displaying 100</h5>`;
        
            // Loop through each starred repo and add it to the HTML string
            starred.forEach((star) => {
                starredList += `
                <div class="repo-detail">
                    <h2>${star.name}</h2><br>
                    <p>${star.description || 'No description'}</p><br>
                    <a href="${star.html_url}" target="_blank"><button>Go to repository</button></a>
                </div>
                `;
            });

            // Update the container's innerHTML
            starredContainer.innerHTML = starredList;
        }
        else{
            starredList += `<h2 style="text-align:center;">${username} has ${count} starred public Repositories</h2>`;
        
            // Loop through each starred repo and add it to the HTML string
            starred.forEach((star) => {
                starredList += `
                <div class="repo-detail">
                    <h2>${star.name}</h2><br>
                    <p>${star.description || 'No description'}</p><br>
                    <a href="${star.html_url}" target="_blank"><button>Go to repository</button></a>
                </div>
                `;
            });

            // Update the container's innerHTML
            starredContainer.innerHTML = starredList;
        }
    }
}

const fetchRepos = async (username, data, headers) => {
    // Fetch repositories
    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?page=1&per_page=100`, { headers });
    const repos = await repoResponse.json();
    displayRepos(repos, data);
}

const fetchFollowers = async (username, data, headers) => {
    // Fetch followers
    const followerResponse = await fetch(`https://api.github.com/users/${username}/followers?page=1&per_page=100`, { headers });
    const followers = await followerResponse.json();
    displayFollowers(followers, data);
}

const fetchFollowing = async (username, data, headers) => {
    // Fetch following
    const followingResponse = await fetch(`https://api.github.com/users/${username}/following?page=1&per_page=100`, { headers });
    const following = await followingResponse.json();
    displayFollowing(following, data);
}

const fetchStarred = async (username, data) => {
    // Fetch starred repos
    const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?page=1&per_page=100`);
    const starred = await starredResponse.json();
    displayStarred(starred, username);
}

function account(data){
    error.innerText = '';
    openTab(null, "Details");
    mini.style.display = "block";

    profileImage.src = data.avatar_url;
    name.innerText = data.name || data.login;
    usernameEl.innerText = "@" + data.login;
    bio.innerText = data.bio || "Account doesn't have a bio.";
    locationInfo.innerText = "Location: " + data.location;
    profileLink.href = data.html_url;
    profileLink.innerHTML = `<button>Go to profile</button>`;

    // Populate the stats
    statsValues[0].innerText = data.public_repos.toLocaleString();
    statsValues[1].innerText = data.followers.toLocaleString();
    statsValues[2].innerText = data.following.toLocaleString();
    const dateObj = new Date(data.created_at);
    const formattedDate = dateObj.toLocaleString();
    statsValues[3].innerText = formattedDate;
    if(data.email == null){
        statsValues[4].innerText = "Email is not public";
    }
    else{
        statsValues[4].innerText = data.email;
    }

    if(data.blog){
        statsValues[5].innerHTML = `<a target="_blank" href="${data.blog}"><button>${data.blog}</button></a>`;
    }
    else{
        statsValues[5].innerText = "Account doesn't have a website";
    }
}

function openTabFromDropdown() {
    var selectedTab = document.getElementById("mobileTabMenu").value;
    openTab(null, selectedTab);
}

function checkStatus(response){
    if (response.status == 404) {
        // Handle user not found
        showError("User not found!");
        return false;
    }
    else if (response.status == 401) {
        // Handle not authorized
        showError("Not authorized!");
        return false;
    }
    else if (response.status == 403){
        // Handle error
        showError("An ERROR Occured!");
        return false;
    }
    else{
        return true;
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    } else {
        // Update active state for dropdown selection
        var activeTabLink = document.querySelector(`.tablinks[onclick="openTab(event, '${tabName}')"]`);
        if (activeTabLink) {
            activeTabLink.className += " active";
        }
    }

    // Update dropdown selection
    document.getElementById("mobileTabMenu").value = tabName;
}


// Open the "Details" tab by default
document.getElementById("defaultOpen").click();

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchGithub();
    }
});

function refresh(){
    location.reload();
}

function showError (message){
    mini.style.display = "none";
    error.innerText = `${message}`;
}