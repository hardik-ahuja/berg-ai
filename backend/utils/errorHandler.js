export function errorHandler(err, req, res, next) {
  console.error('Internal error:', err.stack || err.message || err);

  res.status(500).json({
    error: 'Internal Server Error',
  });
}