const express = require('express');
const app = express();
app.use(express.json());
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body; //create new user
  users.push(newUser); //add it to the users array
  res.status(201).json(newUser); // 201 is created success code in HTTP
  //es.send({type: 'POST'});
})
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
  
    // Log the updated user to ensure correct data
    console.log(updatedUser);
  
    users = users.map(user => user.id === userId ? updatedUser : user);
    res.status(200).json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Find index of user
    const index = users.findIndex(user => user.id === userId);
    
    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }
  
    // Remove user from array
    users.splice(index, 1); 
  
    res.status(204).send(); // 204 No Content (successful deletion)
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

