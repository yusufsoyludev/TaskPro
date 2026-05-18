export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (err.isJoi) {
    const details = err.details.map((item) => ({
      message: item.message,
      path: item.path,
    }));
    const fields = details.reduce((acc, item) => {
      const fieldName = item.path?.[0];

      if (fieldName && !acc[fieldName]) {
        acc[fieldName] = item.message;
      }

      return acc;
    }, {});

    return res.status(400).json({
      status: 400,
      message: details[0]?.message || "Please check the highlighted fields.",
      data: {
        fields,
        details,
      },
    });
  }

  res.status(status).json({
    status,
    message: err.message || 'Something went wrong',
    data: err.data || null,
  });
};
