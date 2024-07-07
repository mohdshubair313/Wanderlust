# Wanderlust

## Description

Wanderlust is a full-stack web application built using the MERN but not using React js yet(MongoDB, Express.js, Node.js) stack. It provides a platform for users to book rooms and hotels, making the process of finding and reserving accommodations seamless and efficient.

## Features

- User Authentication: Secure login and registration(SignUp) system.
- Room Listings: Users can browse through various room and hotel listings.
- Booking System: Integrated system for booking rooms.
- Admin Dashboard: Admins can manage listings, bookings, and users.
- CRUD Operations: Full CRUD capabilities for rooms and bookings.
- Responsive Design: Optimized for both desktop and mobile devices.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mohdshubair313/Wanderlust.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Wanderlust
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up the environment variables. Create a `.env` file in the root directory and add the following:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_URL=your_cloudinary_url
    ```
5. Start the development server:
    ```bash
    nodemon app.js
    ```

## Project Structure

The repository is structured as follows:

- **controllers/**: Contains the logic for handling requests.
- **models/**: Contains the Mongoose models.
- **routes/**: Defines the API endpoints.
- **public/**: Static files served by the application.
- **views/**: EJS templates for server-side rendering.
- **utils/**: Utility functions and middleware.
- **init/**: Initialization scripts.
- **assets/**: Assets like images and stylesheets.

## Technologies Used

- **Frontend**: JavaScript, EJS ,etc
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: passport, bcrypt
- **Cloud Storage**: Cloudinary
- **Styling**: Raw CSS, Bootstrap

## Usage

To use the application, navigate to [Wanderlust](https://wanderlust-0w8i.onrender.com/listings) and explore the available features. Users can register, log in, browse listings, and make bookings. Admins have additional capabilities to manage the platform.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## Contact

For any inquiries or support, please reach out to [mohdshubair313](https://github.com/mohdshubair313).
