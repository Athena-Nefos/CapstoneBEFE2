# Capstone Backend README.md - Find Your Movie Night Application, 

### A RESTful API server providing movie finder and management capabilities for the Movie Finder Application

# Description 

## Movie Finder Backend is a robust Node.js RESTful API that powers the Movie Night Finder Application, allowing users to create accounts, find new movies, add movies to their collection, track their watch status, rate films, and manage their personal movie library. Built with security in mind, the API implements JWT authentication and provides a complete set of CRUD operations for movie management.

# Table of Contents 

* [Technologies_Used] (#technologiesUsed)
* [Features] (#features)
* [API_Endpoints] (#apiEndpoints)
* [Database_Schema] (#dataBaseSchema)
* [Authentication] (#authentication)
* [Project_Next_Steps] (#projectNextSteps)
* [Deployment] (#deployment)
* [About_the_Author] (#aboutTheAuthor)
* [Getting_Started] (#gettingStarted)

## <a name="technologiesUsed">Technologies_Used</a> 
 
    * MongoDB - Document database for storing user and movie data
    * Express - Web framework for building the RESTful API
    * Node.js - JavaScript runtime environment
    * Mongoose - MongoDB object modeling for Node.js
    * JWT (JSON Web Tokens) - Secure authentication mechanism
    * Bcrypt.js - Password hashing for security
    * CORS - Cross-Origin Resource Sharing support
    * Dotenv - Environment variable management

## <a name="features">Features</a> 

    * User authentication system with secure password handling
    * Personal movie collection management
    * Track movie watch status (Want to Watch, Currently Watching, Watched)
    * Add movie details including IMDb ID, year, poster, genre, and plot
    * Rate movies on a scale of 0-10
    * Add personal notes to each movie entry
    * Full CRUD operations for movie management
    * JWT-based authentication with token expiration

## <a name="apiEndpoints">API Endpoints</a>

### Authentication

    * POST /api/auth/register - Register a new user
    * POST /api/auth/login - Authenticate a user and receive a token
    * GET /api/auth/user - Get current user data (protected)

### Movies

    * GET /api/movies - Get all movies for the authenticated user (protected)
    * GET /api/movies/:id - Get a specific movie by ID (protected)
    * POST /api/movies - Add a new movie to collection (protected)
    * PUT /api/movies/:id - Update a movie's details (protected)
    * DELETE /api/movies/:id - Remove a movie from collection (protected) 

## <a name="databaseSchema">Database_Schema</a>

### User Model

    {
      username: String (required, unique),
      email: String (required, unique),
      password: String (required, hashed),
      createdAt: Date
    }

### Movie Model

    {
      title: String (required),
      imdbID: String (required),
      year: String (required),
      poster: String,
      genre: String,
      plot: String,
      rating: Number (0-10),
      watchStatus: String (enum: 'Want to Watch', 'Watched', 'Currently Watching'),
      userNotes: String,
      user: ObjectId (reference to User model),
      createdAt: Date
    }

## <a name="authentication">Authentication</a>

The API uses JWT (JSON Web Tokens) for authentication. Users receive a token upon successful login that must be included in the x-auth-token header for all protected routes. Tokens expire after 7 days.

## <a name="projectNextSteps">Project Next Steps</a>

    * Add password reset functionality
    * Add movie recommendations based on user's collection
    * Create endpoints for user profile management

## <a name="deployment">Deployment</a>

    * not yet deployed

## <a name="aboutTheAuthor">About_the_Author</a>

I build applications and projects tied making creative solutions to real world problems.  While no application is ever perfect I find joy in the process and perfecting my final products!

* https://github.com/Athena-Nefos

## <a name="gettingStarted">Getting_Started</a>

### Prerequisites

    * Node.js (v14 or higher)

[Backend](https://github.com/Athena-Nefos/CapstoneBEFE2)
