export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      data: err.details.map((item) => ({
        message: item.message,
        path: item.path,
      })),
    });
  }

  res.status(status).json({
    status,
    message: err.message || 'Something went wrong',
    data: err.data || null,
  });
};