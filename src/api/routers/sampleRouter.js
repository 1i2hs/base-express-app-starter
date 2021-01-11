const { Router } = require("express");

function create(/* some dependencies */) {
  const router = Router();

  router.get("/", (req, res) => {
    res.send({ msg: "This is a sample API" });
  });

  return router;
}

module.exports = create;
