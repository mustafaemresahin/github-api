# GitHub Profile Fetcher

## Introduction

This project uses JavaScript to fetch GitHub profile data and repositories using the GitHub API. It's a great way to quickly look up GitHub user details without leaving your local development environment.

## Features

- Fetches GitHub user profile details
- Lists all repositories of the user
- Shows bio, location, email, and other stats

## Requirements

- Web Browser
- Text Editor (like VSCode, Sublime Text)
- Basic knowledge of HTML, CSS, and JavaScript

## Installation

1. Clone this repository to your local machine
```bash
git clone https://github.com/your-username/your-repository.git
```

2. Open `index.html` in your web browser

## How to Use

1. Open the web page.
2. Input GitHub username in the search field.
3. Click 'Search' to display the user's GitHub details and repositories.

## Authentication

This project uses the GitHub API for which authentication is required. For that, you need to create your own GitHub Personal Access Token.

1. Go to [GitHub's Personal Access Token settings](https://github.com/settings/tokens) to create a new token.
2. Generate a new token with the necessary permissions (`repo`, `read:user`, etc).
3. Open the script file (`script.js` or whatever your main JavaScript file is called) where the fetch function is called and replace the token in the headers:

\`\`\`javascript
const username = document.getElementById("searchInput").value;
const headers = {
    "Authorization": \`token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE\`
};
\`\`\`

Replace `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN_HERE` with your generated Personal Access Token.

**Note: Never share your Personal Access Tokens; they are equivalent to your password.**

## Contributing

Feel free to submit pull requests or issues to improve the project.

## License

This project is open-source and available under the MIT License.

