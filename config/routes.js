import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { User } from "./db.js";

const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

export const app = express();

app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

// Defines a route for logging in users.
app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  console.log("edqwwqd", userId)
  const user = await User.findOne({ id: userId });
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({
      id: email,
      password: password
    });
    res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export function getContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

export function getWSContext({ connectionParams }) {
  const token = connectionParams?.accessToken;
  if (token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return { userId: payload.sub };
  }
  return {};
}
