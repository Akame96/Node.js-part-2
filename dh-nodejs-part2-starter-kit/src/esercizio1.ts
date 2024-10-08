// Do
// Write simple Express server that listens on port 3000 (use dotenv to specify the port)
// Create a dummy "database" of planets using a let variable. (You will use this data in further exercises.)
// Configure your app (app.use()) to:
// accept JSON from the Client
// log the Client's requests
// Use
// Dummy database with initial data:
//   type Planet = {
//     id: number,
//     name: string,
//   };

//   type Planets = Planet[];

//   let planets: Planets = [
//     {
//       id: 1,
//       name: "Earth",
//     },
//     {
//       id: 2,
//       name: "Mars",
//     },
//   ];

import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000

// Dummy database
type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];


app.use(express.json());
app.use(morgan('dev'));

// prendere tutti i pianeti
app.get('/planets', (req : Request, res: Response) => {
  res.json(planets);
});

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

