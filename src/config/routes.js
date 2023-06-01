const cors = require("cors");
const express = require("express");
const { expressjwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const { User } = require("./db.js");

const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();

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
  console.log(userId)
  const user = await User.findOne({ id: userId });
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

function getContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

function getWSContext({ connectionParams }) {
  const token = connectionParams?.accessToken;
  if (token) {
    const payload = jwt.verify(token, JWT_SECRET);
    return { userId: payload.sub };
  }
  return {};
}

module.exports = {app, getContext, getWSContext}
