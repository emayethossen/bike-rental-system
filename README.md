# Bike Rental Service

A bike rental service application that allows users to rent bikes and manage their rentals. Admins can manage bike inventory and oversee rentals.

# Live Link
https://bike-rental-project.vercel.app/

# Github Link
https://github.com/emayethossen/bike-rental-system.git

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Bike Routes](#bike-routes)
  - [Rental Routes](#rental-routes)
- [Not Found Route](#not-found-route)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Admin management of bike inventory
- Users can rent and return bikes
- Detailed rental history for users

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/emayethossen/bike-rental-system.git
    cd bike-rental-system
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:5000
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

### Authentication

- Users need to sign up and log in to use the service.
- Admins need to log in to manage bikes and rentals.
