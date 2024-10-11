# Candidate Search Application

A simple React application that allows users to search through potential GitHub candidates and save or skip them. The app displays relevant information about each candidate and provides options to save them for future reference or move on to the next candidate.

## Features

- Displays GitHub user information such as name, username, location, email, company, and bio.
- Allows users to save a candidate for future reference.
- Allows users to skip candidates they are not interested in.
- Shows a list of saved candidates.
- Skips candidates if their profiles are invalid or if they return a 404 error from GitHub.
- Saves the list of saved candidates to `localStorage` so the list persists across browser sessions.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For routing between pages in the app.
- **GitHub API**: To fetch user information from GitHub.
- **localStorage**: To persist the list of saved candidates.
- **Vite**: For building and bundling the project.
- **Render**: For hosting and deploying the application.

## Pages

1. **Candidate Search**:
   - Fetches random GitHub users using the GitHub API.
   - Displays detailed information about the current candidate.
   - Allows users to save or skip the candidate.
   - Skips invalid candidates that return a 404 error from the GitHub API.
   
2. **Saved Candidates**:
   - Displays a list of saved candidates with details including name, username, location, email, company, and bio.
   - Users can remove saved candidates from the list.

## Installation

1. Clone the repository:

  ```bash
   git clone https://github.com/your-username/candidate-search.git
   cd candidate-search
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Create a .env file and add your GitHub token:

  ```bash
  VITE_GITHUB_TOKEN=<your_github_token>
  ```

4. Start the development server:

  ```bash
  npm run dev
  ```

  This will start the application at http://localhost:3000.

## Deployment
The Candidate Search app is deployed on Render. You can view the live version here:

[Candidate Search App on Render](https://candidate-search-j1ob.onrender.com/)

### Steps to Deploy on Render

1. Create an account on Render.

2. Create a new web service.

3. Link your GitHub repository.

4. Add environment variables (e.g., VITE_GITHUB_TOKEN).

5. Deploy the app.

Render will automatically pull updates from your GitHub repository whenever changes are pushed.

## Usage

1. Search for candidates: When the application loads, it will display a random GitHub user's details.

2. Save a candidate: Click the "+" button to save a candidate for later.

3. Skip a candidate: Click the "-" button to skip the current candidate and load the next one.

4. View saved candidates: Navigate to the "Saved Candidates" page to view all saved candidates.

5. Remove saved candidates: You can remove a candidate from the saved list by clicking the remove button next to their profile.

### Home Page
![Home Page](public\CandidateSearchHome.png)

### Potential Candidates Page
![Potential Candidates](public\CandidateSearchPotentialCandidates.png)

## Future Enhancements

 - Enhance error handling for API rate limits.

 - Improve UI responsiveness on mobile devices.
 
 - Add filtering and sorting to saved candidates table

## License

This project is open source and available under the MIT License.

## Questions

For any inquiries or issues, please contact:

- Name: Owen Kenne
- Email: <okenne.devworks@gmail.com>
- GitHub: [O-KenneDevWorks](https://github.com/O-KenneDevWorks/)