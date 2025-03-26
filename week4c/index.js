// Importing the required modules
const express = require("express"); // Express framework for building the web server
const app = express(); // Create an instance of the Express application
const fs = require('fs'); // File system module (though not used in the code here)
const winston = require('winston'); // Winston is a logging library

// Setting up the logger using Winston
const logger = winston.createLogger({
    level: 'info', // Log messages of level 'info' and higher
    format: winston.format.json(), // Format logs in JSON
    defaultMeta: { service: 'add-service' }, // Default metadata for logs
    transports: [
      // Transport for logging errors into a file 'error.log'
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      // Transport for logging all logs into a file 'combined.log'
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

// In non-production environments, logs will also be shown in the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

// Arithmetic function definitions
// Addition function
const add = (n1, n2) => {
    return n1 + n2;
}

// Subtraction function
const subtract = (n1, n2) => {
    return n1 - n2;
}

// Multiplication function
const multiply = (n1, n2) => {
    return n1 * n2;
}

// Division function
const divide = (n1, n2) => {
    return n1 / n2;
}

// Define a GET route for the 'add' operation
app.get("/add", (req, res) => {
    try {
        // Parse query parameters from the request
        const n1 = parseFloat(req.query.n1); // Get the first number
        const n2 = parseFloat(req.query.n2); // Get the second number
        
        // Validate if n1 and n2 are numbers
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined"); // Log error if n1 is invalid
            throw new Error("n1 incorrectly defined"); // Throw error for invalid input
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined"); // Log error if n2 is invalid
            throw new Error("n2 incorrectly defined"); // Throw error for invalid input
        }
        
        // Log the valid input values for addition
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        
        // Perform the addition operation
        const result = add(n1, n2);
        
        // Send the result back to the client as a JSON response
        res.status(200).json({ statuscode: 200, data: result }); 
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

// Define a GET route for the 'subtract' operation
app.get("/subtract", (req, res) => {
    try {
        // Parse query parameters from the request
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        // Validate the input values
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        // Log the input values for subtraction
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
        
        // Perform the subtraction operation
        const result = subtract(n1, n2);
        
        // Send the result back to the client as a JSON response
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

// Define a GET route for the 'divide' operation
app.get("/divide", (req, res) => {
    try {
        // Parse query parameters from the request
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        // Validate the input values
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        // Log the input values for division
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
        
        // Perform the division operation
        const result = divide(n1, n2);
        
        // Send the result back to the client as a JSON response
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

// Define a GET route for the 'multiply' operation
app.get("/multiply", (req, res) => {
    try {
        // Parse query parameters from the request
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        // Validate the input values
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        // Log the input values for multiplication
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');
        
        // Perform the multiplication operation
        const result = multiply(n1, n2);
        
        // Send the result back to the client as a JSON response
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

// Exponentiation: n1 ^ n2
app.get('/power', (req, res) => {
    try{
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
        // Validate the input values
     if (isNaN(n1)) {
        logger.error("n1 is incorrectly defined");            
        throw new Error("n1 incorrectly defined");
        }
    if (isNaN(n2)) {
        logger.error("n2 is incorrectly defined");           throw new Error("n2 incorrectly defined");
        }
    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for exponential');

    const result = Math.pow(Number(n1), Number(n2));


    res.status(200).json({ statuscode: 200, data: result });

} catch (error) { 
    // If an error occurs, log it and send a 500 error response
    console.error(error);
    res.status(500).json({ statuscode: 500, msg: error.toString() });
}
});
  
  // Square Root: sqrt(n1)
  app.get('/sqrt', (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
   
            // Validate the input values
         if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");            
            throw new Error("n1 incorrectly defined");
            }

         if (Number(n1) < 0) {
            logger.error('Square root of negative number');
            throw new Error('Cannot calculate the square root of a negative number');
         }

        // if (isNaN(n2)) {
        //     logger.error("n2 is incorrectly defined");           throw new Error("n2 incorrectly defined");
        //     }
        logger.info('Parameters ' + n1 + 'received for exponential');
    
        const result = Math.sqrt(Number(n1));
    
    
        res.status(200).json({ statuscode: 200, data: result });
    
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
    });
  
  // Modulo: n1 % n2
  app.get('/modulo', (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
            // Validate the input values
         if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");            
            throw new Error("n1 incorrectly defined");
            }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");           throw new Error("n2 incorrectly defined");
            }

        if (Number(n2) === 0) {
            logger.error('Modulo by zero');
            throw new Error("Modulo by zero");
        }
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for modulus');
    
        const result = Number(n1) % Number(n2);

    
    
        res.status(200).json({ statuscode: 200, data: result });
    
    } catch (error) { 
        // If an error occurs, log it and send a 500 error response
        console.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
    });
  

// Set the port for the server to listen on
const port = 3040;
app.listen(port, () => {
    // Log that the server is running and listening on the specified port
    console.log("hello i'm listening to port " + port);
});

// Example URL for testing: http://localhost:3040/calculate?n1=51&n2=20&operation=add
