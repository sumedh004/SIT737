// Step 1: Import Express module
const express = require('express');

// Step 2: Create an Express application instance
const app = express();

// Step 3: Serve static files from the 'public' directory
app.use(express.static('public'))

// Step 4: Define the port number that the server will listen on
const port = 3040;

// Step 5: Create a route handler for the root URL ('/')
app.get('/', (req, res) => {
  res.send('<h1>Hello, this is my Node.js Express server!</h1>');
});

// Step 6: Start the Express server on the specified port
app.listen(port, () => {
    // Log a message to the console once the server is up and running
  console.log(`Server is running at http://localhost:${port}`);
});