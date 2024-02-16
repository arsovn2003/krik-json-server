var jsonServer = require("json-server");
const customMiddleware = require("./customMiddleware");
var server = jsonServer.create();
var router = jsonServer.router("db.json");
var middlewares = jsonServer.defaults();

function simpleAuth(req, res, next) {
  if (req.headers.authorization) {
    var user_and_password = new Buffer(
      req.headers.authorization.split(" ")[1],
      "base64"
    ).toString();

    var user_only = user_and_password.split(":")[0];
    req.user = user_only;

    next();
  } else {
    res.status(401).send({ error: "unauthorized" });
  }
}

router.render = function(req, res) {
  res.json({
    user: req.user,
    body: res.locals.data
  });
};

server.use(middlewares);
server.use(customMiddleware);
server.use(router);
server.listen(5000, function() {
  console.log("JSON Server is running on port 5000");
});
