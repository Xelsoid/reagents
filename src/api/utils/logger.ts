export const logger = (req, res, next) => {
  /* eslint-disable no-console */
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
};
