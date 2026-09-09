# Movie Discovery App

A responsive movie discovery interface that combines TMDB search with Appwrite-backed search trends.

## Overview

Movie Discovery App is a React single-page application for browsing popular films and searching the TMDB catalogue. Search input is debounced before requests are sent, while successful searches are counted in Appwrite and used to build a project-specific trending list. The interface presents movie posters, ratings, original languages, and release years in a responsive layout.

## Features

- Browse popular movies on initial load.
- Search the TMDB catalogue by title with a 500 ms debounce.
- View poster, rating, original language, and release year for each result.
- Persist successful search terms and result metadata in Appwrite.
- Rank the ten most-searched movies from stored search counts.
- Handle loading, API errors, empty poster data, and responsive grid layouts.

## Tech Stack

### Frontend

- React 19
- Vite 7
- Tailwind CSS 4
- react-use

### Data and APIs

- TMDB API for movie discovery and search
- Appwrite Databases for search-count persistence and trending rankings

### Tooling

- ESLint 9
- npm

## Architecture

The application is a client-rendered Vite SPA with two external data paths:

```text
React UI ──► TMDB REST API ──► movie results
    │
    └──────► Appwrite database ──► search counts and trending movies
```

`src/App.jsx` coordinates query state, debouncing, TMDB requests, and screen-level loading or error states. `src/appwrite.js` isolates the persistence operations that create or increment search records and retrieve the highest-count entries.

## Getting Started

### Prerequisites

- A recent Node.js release and npm
- A TMDB API read access token
- An Appwrite project with a database and collection available to the web client

### Installation

```bash
git clone https://github.com/It-shahin/Movie-app.git
cd Movie-app/movie-app
npm install
```

### Environment Variables

Create `movie-app/.env` and provide the browser configuration used by the source code:

```env
VITE_TMDB_API_KEY=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_TABLE_ID=
```

The Appwrite collection must support the fields used by the application: `searchTerm`, `count`, `movie_id`, and `poster_url`. Configure Appwrite permissions for the intended read, create, and update operations.

> Vite embeds every `VITE_` value in the browser bundle. Do not place privileged Appwrite server keys in these variables, and use a server-side proxy if the TMDB credential must remain private.

### Running Locally

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
movie-app/
├── public/assets/       # Static artwork and icons
├── src/components/     # Search, loading, and movie-card UI
├── src/App.jsx         # Search, discovery, and trending orchestration
├── src/appwrite.js     # Appwrite search analytics operations
└── src/index.css       # Tailwind theme and component styles
```

## Key Technical Highlights

- Debounced API requests reduce unnecessary searches while a user is typing.
- Search analytics use an increment-or-create flow in Appwrite.
- Trending results are derived from persisted counts rather than hard-coded data.
- External API, persistence, loading, and error concerns are kept separate from presentational cards.

## Future Improvements

- Move TMDB requests behind a server-side API proxy.
- Add automated component and integration tests.
- Remove committed build archives and consolidate the duplicate root-level package files.

## Author

**Chahin Boudra**

- GitHub: [It-shahin](https://github.com/It-shahin)
- LinkedIn: [chahin-boudra](https://www.linkedin.com/in/chahin-boudra/)

