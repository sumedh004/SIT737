const express = require('express');
const app = express();
app.use(express.static('public'))
const port = 3040;

app.get('/', (req, res) => {
  res.send('<h1>Hello, this is my Node.js Express server!</h1>');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});