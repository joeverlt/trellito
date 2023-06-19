# Trellito

Trellito is an application inspired by Trello that allows you to organize your tasks and projects efficiently and collaboratively. With an intuitive and user-friendly interface, Trellito helps you maintain control and visibility of your projects, allowing you to manage your tasks effectively.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contribution](#contribution)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/joeverlt/trellito.git`
2. Navigate to the project directory: `cd trellito`

**Note:** Make sure to create an `.env.local` file in the root directory of the frontend (`trellito-client`) and an `.env` file in the root directory of the backend (`trellito-server`). You can find template files (`env.local.template` and `.env.sample`) with the required variables that need to be filled with the appropriate values.

Remember to save the `.env.local` and `.env` files once you have completed configuring the environment variables. Providing the correct values for each variable is important for the proper functioning of the application.

### Docker Compose

3. Run Docker Compose to build and launch the containers: `docker-compose up -D`

### Without Docker

3. Install and configure MongoDB:

   - Make sure you have MongoDB installed and configured on your local machine.
   - If not, follow the MongoDB installation instructions for your operating system.

4. Install the dependencies:

   - Frontend:
     - Navigate to the frontend directory: `cd trellito-client`
     - Run `npm install` or `yarn install`
   - Backend:
     - Navigate to the backend directory: `cd trellito-server`
     - Run `npm install` or `yarn install`

### Usage

5. Start servers:

   - Backend:
     - Navigate to the backend directory: `cd trellito-server`
     - Run `npm run serve` or `yarn serve`
   - Frontend:
     - Navigate to the frontend directory: `cd trellito-client`
     - Run `npm run dev` or `yarn dev`

6. Open your browser and visit: `http://localhost:3000`

**Note:** Before starting the application, ensure that MongoDB is running and accessible on your machine.

**Demo:** You can access a live demo of the application [here](https://example.com), but please note that the demo requires Google authentication.

## Features

- Creation and management of custom boards.
- Organization of tasks into lists and cards.
- Drag-and-drop functionality for easy reordering.
- Detailed descriptions and comments on each card. (coming soon) ⌛
- Labels and due dates to categorize and prioritize tasks. (coming soon) ⌛
- Assignment of cards to team members. (coming soon) ⌛
- Reminders and notifications for effective tracking. (coming soon) ⌛
- Real-time collaboration with other users. (coming soon) ⌛
- Customization of board colors and backgrounds. (coming soon) ⌛

## Contribution

Contributions are welcome! If you find any bugs or have any improvement ideas, please create an issue or submit a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
