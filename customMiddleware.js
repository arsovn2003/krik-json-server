// customMiddleware.js
module.exports = (req, res, next) => {
  if (res.locals.data && res.locals.data.hasOwnProperty("body")) {
    res.locals.data = res.locals.data.body;
  }
  next();
};
