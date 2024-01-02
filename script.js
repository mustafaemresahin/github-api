const searchGithub = async () => {
    // Fetch user profile
    const username = document.getElementById("searchInput").value;
    const headers = {
        "Authorization": `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE`,
        'User-Agent': 'GitHub User Finder'
    };
    
    const response = await fetch(`https://api.github.com/users/${username}`, { headers });
    const data = await response.json();    

    if (response.status == 404) {
        // Handle user not found
        const mini = document.getElementById("mini");
        mini.style.display = "block";
        mini.innerHTML = '<h1 style="padding-top:20px;">User does not exist!</h1><div style="text-align:center;"><h3>Refresh the page</h3><button onclick="refresh()">Refresh</button></div>';
        searchInput.disabled = true;
        searchButton.disabled = true;
    }
    else{
        openTab(null, "Details");
        const mini = document.getElementById("mini");
        mini.style.display = "block";
        // Get elements from the profile tab
        const profileImage = document.querySelector(".profile-image img");
        const langs = document.querySelector(".most-used-languages img");
        const streak = document.querySelector(".streak img");
        const stat = document.querySelector(".stat img");
        const name = document.querySelector(".name");
        const usernameEl = document.querySelector(".username");
        const bio = document.querySelector(".bio");
        const location = document.querySelector(".location");
        const profileLink = document.querySelector("a");
        const statsValues = document.querySelectorAll(".stats-value");

        profileImage.src = data.avatar_url;
        name.innerText = data.name || data.login;
        usernameEl.innerText = "@" + data.login;
        bio.innerText = data.bio || "Account doesn't have a bio.";
        location.innerText = "Location: " + data.location;
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
            statsValues[5].innerHTML = `<a target="_blank" href="https://${data.blog}"><button>${data.blog}</button></a>`;
        }
        else{
            statsValues[5].innerText = "Account doesn't have a website";
        }
            
        langs.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=blueberry`;
        streak.src = `https://streak-stats.demolab.com/?user=${data.login}&theme=blueberry`;
        stat.src = `https://github-readme-stats.vercel.app/api?username=${data.login}&theme=blueberry`;

        // Fetch and display repositories
        const response2 = await fetch(`https://api.github.com/users/${username}/repos?page=1&per_page=100`, { headers });
        const repos = await response2.json();
        const reposContainer = document.getElementById("Repos");

        let repoList = '';
        if(repos.length == 0){
            reposContainer.innerHTML = `<br><h1>User doesn't have any repos!</h1>`;
        }
        else{
            if(data.public_repos <= 100){
                repoList += `<h2 style="text-align:center;">${data.login} has ${repos.length} public Repositories</h2>`
            }
            else{
                repoList += `<h2 style="text-align:center;">${data.login} has ${data.public_repos.toLocaleString()} public Repositories</h2>`
                repoList += `<h5 style="text-align:center;">Only displaying 100</h5>`
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
        // Fetch and display followers
        const response3 = await fetch(`https://api.github.com/users/${username}/followers?page=1&per_page=100`, { headers });
        const followers = await response3.json();
        const followersContainer = document.getElementById("Followers");

        let followersList = '';
        if(followers.length == 0){
            followersContainer.innerHTML = `<br><h1>User doesn't have any followers!</h1>`;
        }
        else{
            if(data.followers > 100){
                followersList += `<h2 style="text-align:center;">${data.login} has ${data.followers.toLocaleString()} Followers</h2>`
                followersList += `<h5 style="text-align:center;">Only displaying 100</h5>`
            }
            else{
                followersList += `<h2 style="text-align:center;">${data.login} has ${followers.length} Followers</h2>`
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


        // Fetch and display followers
        const response4 = await fetch(`https://api.github.com/users/${username}/following?page=1&per_page=100`, { headers });
        const following = await response4.json();
        const followingContainer = document.getElementById("Following");

        let followingList = '';
        if(following.length == 0){
            followingContainer.innerHTML = `<br><h1>User isn't following anyone!!</h1>`;
        }
        else{
            if(data.followers > 100){
                followingList += `<h2 style="text-align:center;">${data.login} is following ${data.following.toLocaleString()} people</h2>`
                followingList += `<h5 style="text-align:center;">Only displaying 100</h5>`
            }
            else{
                followingList += `<h2 style="text-align:center;">${data.login} is following ${following.length} people</h2>`
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
        // Make sure the API endpoint is correct
        const response5 = await fetch(`https://api.github.com/users/${username}/starred?page=1&per_page=100`);
        // Parse the JSON response
        const starred = await response5.json();

        // Get the container for displaying the data
        const starredContainer = document.getElementById("Starred");

        // Initialize the HTML string
        let starredList = '';

        // Check if the user has any starred repos
        if (starred.length === 0) {
        starredContainer.innerHTML = `<br><h1>No starred repos!</h1>`;
        } 
        else {
            //Count starred repos
            let url = `https://api.github.com/users/${username}/starred?per_page=100`;
            let count = 0;

            while (url) {
                const response = await fetch(url);

                const data = await response.json();
                count += data.length;

                const linkHeader = response.headers.get('Link');
                const nextLink = linkHeader && linkHeader.match(/<([^>]+)>;\s*rel="next"/);
                url = nextLink ? nextLink[1] : null;
            }

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
    
}

function openTabFromDropdown() {
    var selectedTab = document.getElementById("mobileTabMenu").value;
    openTab(null, selectedTab);
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
    // Your search function here
    searchGithub();
  }
});

function refresh(){
    location.reload();
}