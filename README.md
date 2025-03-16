# Movie Explorer

Movie Explorer is a React-based movie tracking and exploration app built with Vite, TailwindCSS, and Firebase Authentication. The app supports infinite scrolling, search, filtering, and user watchlists. It can be run locally or via Docker.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (LTS recommended)
- npm or yarn
- Docker (if using the Docker setup)

## Installation & Running Locally

Clone the Repository:

```
git clone https://github.com/tashomyy/movie-explorer.git
cd movie-explorer
```

Install Dependencies:

```
npm install
```

Set Up Environment Variables:
Create a .env file in the root directory. The contents of this file are provided in an email.

Start the Development Server:

```
npm run dev
```

The app will be available at http://localhost:8080.

## Building & Running in Production Mode

To build and preview the production build:

```
npm run build
npm run preview
```

This will serve the app at http://localhost:8080.

## Running with Docker

To run the application using Docker:

```
docker run -d -p 8080:8080 tashomy/movie-explorer:17
```

The app will be accessible at http://localhost:8080.

## Deployment

The application is also deployed and can be accessed at:
[Movie Explorer Production](https://movie-explorer-production.up.railway.app/)

## Scripts Overview

- npm run dev - Starts the development server with Vite.

- npm run build - Builds the production-ready version.

- npm run preview - Serves the built project on port 8080.

## Technologies Used

- React 19

- Vite

- TailwindCSS

- Firebase Authentication

- Axios

- React Router

- React Toastify
