
export const asyncWrapper = (fn, timeout) =>
  setTimeout(fn, timeout);

export const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

export const noCache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};
