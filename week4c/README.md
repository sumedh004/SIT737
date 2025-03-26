**Calculator Microservice**

**1\. Introduction**

The calculator microservice is designed to perform four basic arithmetic operations: addition, subtraction, multiplication, and division. It exposes four API endpoints to handle the respective operations and includes error handling, logging, and validation to ensure smooth operation.

**2\. Project Setup**

**Step 1: Install Dependencies**

This project uses the following dependencies:

- **Express**: A web framework for building the API.
- **Winston**: A logging library to log request and error details.

To install the dependencies, run the following command in your project folder:

```bash

npm install express winston
```

**3\. Code Breakdown**

**3.1. Importing Modules**

```javascript



const express = require("express");

const fs = require('fs');

const winston = require('winston');
```

- **express**: We use the Express framework to build the API and handle incoming HTTP requests.
- **fs**: The File System module is imported but not used in the code here (potentially for file handling in future improvements).
- **winston**: This is the logging library used to track operations, errors, and events.

**3.2. Logger Setup**

```javascript



const logger = winston.createLogger({

level: 'info',

format: winston.format.json(),

defaultMeta: { service: 'add-service' },

transports: \[

new winston.transports.File({ filename: 'error.log', level: 'error' }),

new winston.transports.File({ filename: 'combined.log' }),

\],

});
```

- **Winston Logger**: The logger is configured with two transport layers:
  - error.log for logging errors.
  - combined.log for logging all information.

Additionally, we use console logging in non-production environments to output logs in a simple format to the console.

**3.3. Arithmetic Functions**

```javascript



const add = (n1, n2) => { return n1 + n2; };

const subtract = (n1, n2) => { return n1 - n2; };

const multiply = (n1, n2) => { return n1 \* n2; };

const divide = (n1, n2) => { return n1 / n2; };
```

- **Arithmetic Functions**: These simple functions take two parameters (n1 and n2) and return the result of the corresponding operation.

**3.4. API Endpoints**

There are four API endpoints, one for each arithmetic operation. Each route performs the following steps:

1. Extracts n1 and n2 from the query string.
2. Validates the input to ensure both parameters are numbers.
3. Logs the input parameters for transparency and debugging.
4. Performs the corresponding arithmetic operation.
5. Sends the result back to the client in JSON format, along with an HTTP status code of 200.
6. If any error occurs, logs it and sends a 500 HTTP status with the error message.

**Example of the Add API Endpoint**

```javascript



app.get("/add", (req, res) => {

try {

const n1 = parseFloat(req.query.n1);

const n2 = parseFloat(req.query.n2);

if (isNaN(n1)) {

logger.error("n1 is incorrectly defined");

throw new Error("n1 incorrectly defined");

}

if (isNaN(n2)) {

logger.error("n2 is incorrectly defined");

throw new Error("n2 incorrectly defined");

}

logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');

const result = add(n1, n2);

res.status(200).json({ statuscode: 200, data: result });

} catch (error) {

console.error(error);

res.status(500).json({ statuscode: 500, msg: error.toString() });

}

});

```

- **Endpoint**: The /add endpoint takes two query parameters: n1 and n2.
- **Input Validation**: isNaN() is used to check whether n1 and n2 are valid numbers.
- **Logging**: Input parameters are logged, and an error is logged if any of the inputs are invalid.
- **Error Handling**: If there's an issue (e.g., invalid input), an error message is returned to the client with a status code 500.

**3.5. Server Setup**

```javascript



const port = 3040;

app.listen(port, () => {

console.log("hello i'm listening to port " + port);

});
```

- The Express application listens on port 3040.
- A confirmation message is logged when the server starts.

**4\. Error Handling and Logging**

The code includes detailed error handling and logging using the Winston logger:

- If invalid inputs (e.g., non-numeric values) are received, the logger records the error message in the error.log file.
- Each operation logs the parameters that were received for debugging purposes.
- The code handles any errors by catching exceptions, logging them, and returning a 500 status code along with a meaningful error message.

**5\. Example API Requests**

**5.1. Addition Example**

**Request:**

```http



GET http://localhost:3040/add?n1=5&n2=3
```

**Response:**

```json


{

"statuscode": 200,

"data": 8

}

```

**5.2. Subtraction Example**

**Request:**

```http



GET http://localhost:3040/subtract?n1=10&n2=4
```

**Response:**

```json



{

"statuscode": 200,

"data": 6

}
```

**5.3. Division Example**

**Request:**

```http



GET http://localhost:3040/divide?n1=10&n2=2
```

**Response:**

```json



{

"statuscode": 200,

"data": 5

}
```

**5.4. Multiplication Example**

**Request:**

```http



GET http://localhost:3040/multiply?n1=4&n2=5
```

**Response:**

```json



{

"statuscode": 200,

"data": 20

}
```

**6\. Testing Invalid Inputs**

For each operation, if the client sends invalid inputs, the server will respond with a 500 status code and an appropriate error message:

- Invalid n1 or n2: If either n1 or n2 is not a valid number, an error will be logged and a response with a status code 500 will be sent to the client.

Example Request:

```http



GET http://localhost:3040/add?n1=abc&n2=3
```

Example Response:

```json



{

"statuscode": 500,

"msg": "n1 incorrectly defined"

}
```

**7\. Conclusion**

This calculator microservice provides basic arithmetic operations with proper error handling and logging using **Node.js**, **Express**, and **Winston**. The service can be tested by making HTTP requests to the appropriate endpoints (/add, /subtract, /multiply, /divide). The server handles both valid and invalid inputs, logging all events for troubleshooting and transparency.