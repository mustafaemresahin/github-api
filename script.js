const searchGithub = async () => {
    // Fetch user profile
    const username = document.getElementById("searchInput").value;
    const headers = {
        "Authorization": `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`
    };
    
    const response = await fetch(`https://api.github.com/users/${username}`, { headers });
    const data = await response.json();    

    if (response.status === 404) {
        // Handle user not found
        const mini = document.getElementById("mini");
        mini.style.display = "block";
        mini.innerHTML = '<h1>User does not exist!</h1>';
    }
    else{
        const mini = document.getElementById("mini");
        mini.style.display = "block";
        // Get elements from the profile tab
        const profileImage = document.querySelector(".profile-image img");
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
        location.innerText = data.location;
        profileLink.href = data.html_url;
        profileLink.innerHTML = `<button>Go to profile</button>`;

        // Populate the stats
        statsValues[0].innerText = data.public_repos;
        statsValues[1].innerText = data.followers;
        statsValues[2].innerText = data.following;
        const dateObj = new Date(data.created_at);
        const formattedDate = dateObj.toLocaleString();
        statsValues[3].innerText = formattedDate;
        statsValues[4].innerText = data.email;
        if(data.blog){
            statsValues[5].innerHTML = `<a target="_blank" href="https://${data.blog}"><button>${data.blog}</button></a>`;
        }
        else{
            statsValues[5].innerText = "Account doesn't have a website";
        }


        // Fetch and display repositories
        const response2 = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        const repos = await response2.json();
        const reposContainer = document.getElementById("Repos");

        let repoList = '';
        if(repos.length == 0){
            reposContainer.innerHTML = `<br><h1>User doesn't have any repos!</h1>`;
        }
        else{
            repos.forEach((repo) => {
                repoList += `
                    <div class="repo-detail">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description'}</p>
                        <a href="${repo.html_url}" target="_blank"><button>Go to repository</button></a>
                    </div>
                `;
            });
            reposContainer.innerHTML = repoList;
        }
    }

    
}

// Function to handle tab changes
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
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