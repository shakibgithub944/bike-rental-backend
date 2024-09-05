# Bike Rental Reservation System Backend

Here is the backend of the Bike Rental Reservation System, a service designed to facilitate bike rentals for tourists and locals in Cox's Bazar. This application allows users to seamlessly rent bikes online, enhancing their experience in the vibrant coastal town.

## Live URL

[Bike Rental Reservation System](https://bike-rental-backend-by-mezan.vercel.app/).

## Features

- User Registration and Authentication
- Bike Inventory Management
- Rental Booking and Management
- Secure Transaction handle
- Detailed User and Bike Profiles
- Role-based Access Control (Admin/User)
- Error Handling and Input Validation

## Technology Stack

- Programming Language: TypeScript
- Web Framework: Express.js
- Database: MongoDB
- ODM & Validation Library: Mongoose, Zod
- Authentication: JWT (JSON Web Tokens)

## Prerequisites

Make sure you have the following installed:

- bcrypt
- cors
- dotenv
- express
- http-status
- jsonwebtoken
- mongoDB
- mongoose
- node.js (v14.x or higher)
- npm (v6.x or higher)
- nodemon
- typeScript
- zod

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mezan2002/bike-rental-backend.git
   cd bike-rental-backend
   ```

2. **Install the dependencies:**

```bash
   npm install
```

3. **Set up the environment variables:**

```
NODE_ENV=development/production
PORT=5000
MONGO_URI=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=rounds_number
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret_key

```

4. **Running the application:**

```bash
   npm run start:dev
```

5. **Build the application:**

```bash
   npm run build
```
