const express = require("express");
const bodyParser = require("body-parser");
const httpStatus = require("http-status");
const cors = require("cors");
const pathToRegexp = require("path-to-regexp");

const routes = require("./routes.json");
const db = {};

db.list = require('./mockup/list.json');
db.create = require('./mockup/create.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (_req, res) => {
  res.json("Welcome to mockup");
});

app.use(({ path }, res, next) => {
  const routeNames = Object.keys(routes);
  console.log(path);

  for (let index = 0; index < routeNames.length; index++) {
    const name = routeNames[index];
    const fromPath = pathToRegexp(name);

    if (fromPath.exec(path)) {
      const dataName = routes[name];
      const data = db[dataName];
      if (data) {
        return res.json(data);
      }

      console.log(httpStatus.INTERNAL_SERVER_ERROR);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Not data");
      return next();
    }
  }

  console.log(httpStatus.NOT_FOUND);
  res.status(httpStatus.NOT_FOUND).send("API not found");
  return next();
});

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Port mockup ${port}`);
});

module.exports = app;
