import App from "./app.js"; // Import the App class

// Create a new instance of the App class
const app = new App();

// Define the port for the server to listen on, using the environment variable or a default value
const PORT = process.env.PORT || 2000;

// Start the server and listen on the specified port
app.listen();
