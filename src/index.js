const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});



const users=[];
app.post('/users', (req, res) => {
    const newUserId = req.body.userId;
    if(!newUserId){
        return res.status(400).send('UserId is missing');
    }

    if(users.includes(newUserId)){
        return res.status(409).send('UserId already exists');
    }
    
    users.push(newUserId);
    res.status(201).send('User created successfully');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});