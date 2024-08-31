# myFlix-client with Angular

## Overview

`myFlix Angular Client` is a web application that allows users to browse a movie database, view movie details, manage their favorite movies, and handle user accounts. The application is built using Angular and connects to a backend service for user authentication and movie data management.

## Features

- **Movie Browsing**: View a list of movies with details including title, description, genre, and director.
- **Favorite Movies**: Add movies to your favorites list and manage them.
- **User Profiles**: View, update user profile information, and delete the account.
- **Authentication**: User login, registration, and account deletion.

## Technologies Used

- Angular
- Angular Material
- RxJS
- TypeScript
- CSS

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [Angular CLI](https://angular.io/cli) (v14 or later)

### Clone the Repository

```bash
git clone https://github.com/your-username/myFlix-Angular-client.git
cd myFlix-Angular-client
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

## Usage

1. **Home Page**: View a list of movies and browse their details.
2. **Profile Page**: View and update your profile information.
3. **Favorites**: Add or remove movies from your favorites list. 
4. **Account Deletion**: Users can delete their account from the profile page.

## Configuration

### Environment Variables

You may need to configure environment variables for connecting to your backend API. Update `src/environments/environment.ts` with the appropriate API endpoints.

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api' // Update with your API endpoint
};
```

### User Authentication

Make sure the backend service is properly configured to handle authentication and authorization. The frontend expects the following endpoints:

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login a user
- **GET** `/api/users/:userId` - Get user profile
- **PUT** `/api/users/:userId` - Update user profile
- **DELETE** `/api/users/:userId` - Delete user account
- **POST** `/api/users/:userId/favorites` - Add movie to favorites
- **DELETE** `/api/users/:userId/favorites/:movieId` - Remove movie from favorites

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Angular](https://angular.io/) - Framework used
- [Angular Material](https://material.angular.io/) - UI component library
