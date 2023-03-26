<h3 align="center">
    <img src="https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png" alt="Hapi Logo" width="300">
</h3>

# Bookself App using Hapi Framework

This repository contains a simple Bookself API built using Hapi Framework. The app allows users to add, edit, and delete Bookself. It consists of four main files located in the `src` directory: `handler.js`, `books.js`, `routes.js`, and `server.js`.

## Requirements

To run this app, you'll need to have the following installed:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Hapi Framework](https://hapi.dev/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Clone this repository to your local machine using `git clone https://github.com/Muhthoriqas/Bookself-API-Hapi.git`
2. Navigate to the project directory using `cd Bookself-App-Hapi`
3. Install the necessary dependencies using `npm install`

## Usage

1. Start the server using `npm run dev`
2. Open your web browser and navigate to `http://localhost:9000/Bookself`
3. Use the postman to add, edit, and delete Bookself

## Code Structure

- `handler.js`: Contains the logic for handling requests and responses (*for now I hide this file*)
- `books.js`: Contains an array of Bookself that is used by the app
- `routes.js`: Defines the routes for the app
- `server.js`: Starts the server and registers the routes

## Code Style

This project uses [ESLint](https://eslint.org/) with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for code linting and formatting. Please ensure that your code follows this style guide before submitting a pull request.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License
This repository is licensed under the MIT License. See the <a href="https://github.com/Muhthoriqas/Bookself-API-Hapi/blob/master/LICENSE">LICENSE</a> file for more information
