const express = require("express");
require("dotenv").config();
const redis = require("@nodeapp/redis")();

const app = express();
const port = 4000;

app.get("/api/count", (req, res) => {
  redis.get("count", function(err, count) {
    res.send({ count: count || 0 });
  });
});
app.post("/api/count/increment", (req, res) => {
  redis.incr("count", function(err, count) {
    res.send({ count });
  });
});

app.post("/api/count/decrement", (req, res) => {
  redis.decr("count", function(err, count) {
    res.send({ count });
  });
});

app.listen(port, () =>
  console.log(`Example backend API listening on port ${port}!`)
);
