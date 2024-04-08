export const logger = (req, res, next) => {
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
};
