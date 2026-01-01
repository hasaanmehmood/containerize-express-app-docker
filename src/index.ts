import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port: number = Number(process.env.PORT);

if (!port) {
  throw new Error('PORT is not defined in .env file');
}

// Built-in body parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Explicitly type the users array
const users: string[] = [];

app.post('/users', (req: Request, res: Response) => {
  const newUserId: string | undefined = req.body.userId;

  if (!newUserId) {
    return res.status(400).send('UserId is missing');
  }

  if (users.includes(newUserId)) {
    return res.status(409).send('UserId already exists');
  }

  users.push(newUserId);
  res.status(201).send('User created successfully');
});

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
