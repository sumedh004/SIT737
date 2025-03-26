# Web Server Project

## Overview

This project demonstrates how to set up a basic web server using Node.js and Express.js. The server serves static files and responds to HTTP requests with an HTML page.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic understanding of Node.js and Express.js.

## Project Setup

### 1. Clone the Repository

Begin by cloning this repository to your local machine:

```bash
git clone https://github.com/sumedh004/SIT737.git
cd SIT737/week1
```

### Steps to Create the Web Server
1. Setting Up the Project
Create a new project directory:

```bash

mkdir project-name
cd project-name
```

2. Initialize the project: Run the following command to create a package.json file:

```bash
npm init -y
```
3. Install Express: Install the Express framework, which will help you create the web server:

```bash
npm install express
```
### 2. Creating the Server (`server.js`)

To create the web server, follow these steps:

- **Create the `server.js` file:**

   In the root of your project, create a file called `server.js`. This file will contain the code to initialize the server.

   - **Initialize an Express app** and set it to listen on port 3040.
   - **Serve static files** from a folder called `public` (where your HTML, CSS, etc. will be stored).
   - **Define the route for the homepage** (`/`), which will serve an `index.html` file.

   The content of the `server.js` file should look like this:

   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();
   const port = 3040;

   // Serve static files from the 'public' directory
   app.use(express.static(path.join(__dirname, 'public')));

   // Define the route for the homepage
   app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });

   // Start the server
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });

   ````


   ### 3. Creating the HTML Page

To create the homepage, follow these steps:

- **Create the `index.html` file:**

   Inside the `public` directory, create a file called `index.html`. This file will be served as the homepage when users visit the root URL (`/`) of the server.

   The content of the `index.html` file should look like this:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Home</title>
     <link rel="stylesheet" href="style.css">
   </head>
   <body>
     <header>
       <h1>Welcome to Our Website</h1>
     </header>
     
     <main>
       <h2>Contact Us</h2>
       <p>Email: <a href="mailto:contact@domain.com">contact@domain.com</a></p>
     </main>
     
     <footer>
       <p>&copy; 2025 Our Website</p>
     </footer>
   </body>
   </html>
   ```

   ### 4. Styling with CSS

To style your webpage, follow these steps:

- **Create the `style.css` file:**

   Inside the `public` directory, create a file called `style.css`. This file will contain the CSS to style your `index.html` page and make it modern and responsive.

   The content of the `style.css` file should look like this:

   ```css
   body {
     font-family: Arial, sans-serif;
     margin: 0;
     padding: 0;
     background-color: #f4f4f4;
   }

   header {
     background-color: #333;
     color: white;
     text-align: center;
     padding: 20px 0;
   }

   main {
     padding: 20px;
     text-align: center;
   }

   footer {
     background-color: #333;
     color: white;
     text-align: center;
     padding: 10px 0;
     position: fixed;
     width: 100%;
     bottom: 0;
   }
   ```

### 5. Running the Server

To start the server and view the webpage, follow these steps:

- **Start the server:**

   Run the following command in your terminal from the project root directory:

   ```bash
   node server.js
   ```




   ### 6. Testing the Server

After running the server, it's important to ensure everything is working as expected. Here’s how you can test the server:

- **Test Locally:**

   Once the server is running on [http://localhost:3040](http://localhost:3040), open your web browser and navigate to this URL. You should see the homepage with the content and styles defined in `index.html` and `style.css`.

   - **Verify Static File Serving:**
     - Ensure that images, styles, or other static files are properly loaded. If any file is missing, make sure it’s in the correct directory and properly referenced.

- **Check Server Logs:**
   If you make any changes to the `index.html` or `style.css` file, make sure to refresh the browser. The server will automatically reload if there are any changes to the files.

   - Check the console where the server is running for any error messages or logs indicating issues.
   - For example, if you visit an incorrect URL or try accessing a file that doesn't exist, you'll see an error message in the console.


Once your server is running and everything appears as expected, your web server setup will be complete!






   


