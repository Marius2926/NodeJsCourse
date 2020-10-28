const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const service = require("./service");

const config = {
  secretKey: "SuperSecretKey",
};
app.use(bodyParser.json());

app.get("/bitcoin", (req, res) => {
  service().then((bitcoinPrice) => {
    res.send(bitcoinPrice.bpi.USD.rate);
  });
});

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "true" });
  }

  const jwtToken = authorization.replace("Bearer ", "");

  jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: "true" });
    } else {
      next();
    }
  });
};

app.post("/graphql", authorizationMiddleware, (req, res) => {
  res.send({ status: "ok" });
});

app.post("/graphql/public", (req, res) => {
  const { user, pass } = req.body;
  if (user === "marius" && pass === "marius123") {
    jwt.sign({}, config.secretKey, (err, token) => {
      res.send({ token });
    });
  }
});

app.listen(port, () => {
  console.log("Server started");
});
