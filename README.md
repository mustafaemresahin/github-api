# GitHub Profile Fetcher

## Introduction

The GitHub Profile Fetcher is an interactive web application designed to display GitHub user profiles and repositories in a user-friendly interface. Utilizing the GitHub API, this tool provides a comprehensive view of a user's GitHub presence, including detailed statistics, repository listings, and more.

## Live Server
### Experience the Application in Action

Access the live version of the GitHub Profile Fetcher to experience its capabilities in real-time:

[GitHub Profile Fetcher Live Project](https://projects.mustafaemresahin.com/github-api)

This hosted version allows immediate use without any local setup, offering a seamless way to explore GitHub profiles.

## Key Features

- **User Profile Display:** Fetches and presents GitHub user profiles, including bio, location, email, and other personal details.
- **Repository Information:** Lists all public repositories of a specified user, providing insights into their projects and contributions.
- **Statistical Data:** Showcases stats like number of followers, following, and total repositories.
- **Interactive Tabs:** Easy navigation through different sections like 'Repositories', 'Followers', 'Following', 'Starred', and 'Stats'.
- **Real-time Updates:** Offers the latest information by retrieving data in real-time from GitHub.
- **Search Functionality:** Users can search for any GitHub username to display the corresponding profile and repositories.

## System Requirements

- Any modern Web Browser (e.g., Chrome, Firefox, Safari).
- Basic understanding of HTML, CSS, and JavaScript for development purposes.

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/mustafaemresahin/github-api.git
```
2. Open `index.html` in your web browser to start using the application locally.

## Usage Guide

1. Visit the live site or open the locally hosted page.
2. Enter a GitHub username in the search field.
3. Click 'Search' to retrieve and display the user's GitHub profile and repository information.

## Authentication and API Usage

To use the GitHub API, a Personal Access Token is required for authentication:

1. Create a token at [GitHub's Personal Access Token settings](https://github.com/settings/tokens). Ensure it has permissions like `repo`, `read:user`, etc.
2. In the script file (e.g., `script.js`), replace the placeholder in the header with your token:

```bash
const headers = {
    "Authorization": `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
};
```


**Important:** Treat your Personal Access Tokens as sensitive as passwords and do not share them.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it as per the license terms.
