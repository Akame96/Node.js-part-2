// Do
// Create routes:
// POST /users/signup: create user in DB.
// Store user with username and password keys in the DB.
// If successful, respond with JSON {msg: "Signup successful. Now you can log in."}.
// POST /users/login: log user in (adds JWT to user in DB).
// Check that a provided password and the password in the DB match.
// If they don't, respond with an error.
// If they do, respond with token (JWT), id and username
// Use
// req.body in both routes
// jsonwebtoken package
// jwt.sign to sign a token with:
// payload (with id (user id) and username)
// secret (from .env)
// Check
// Use Postman to test the routes.

import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());


const secretKey = process.env.SECRET

// User Login
app.post("/users/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;


  const criptedPassword = await bcrypt.hash(password, 10);

  const jwtToken = jwt.sign({ userId: 25 }, secretKey, { expiresIn: '1h' });

  res.status(200).json({
    msg: "success",
    apiToken: jwtToken,
    email: email,
    password: criptedPassword,
  });
});

// User Signup
app.post("/users/signup", async (req: Request, res: Response) => {
  const { username, email, phone, password } = req.body;

  const criptedPassword = await bcrypt.hash(password, 10);

  const jwtToken = jwt.sign({ userId: 25 }, secretKey, { expiresIn: '1h' });

  res.status(200).json({
    msg: "success!",
    apiToken: jwtToken,
    username: username,
    email: email,
    phone: phone,
    password: criptedPassword,
  });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
