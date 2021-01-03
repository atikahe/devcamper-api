const time = new Date();

/**
 * @description Logs request to console
 */
const logger = (req, res, next) => {
  const logTime = time.toDateString();
  const logRequest = `${req.method} ${req.protocol}://${req.get('host')}${
    req.url
  }`;
  const logResponse = `${res.statusCode}`;

  console.log(logTime, logRequest, logResponse);
  next();
};

module.exports = logger;
