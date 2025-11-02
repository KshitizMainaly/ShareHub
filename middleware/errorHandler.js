const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof require('multer').MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 10MB limit'
      });
    }
  }

  res.status(500).render('error', {
    title: 'Server Error',
    message: 'Something went wrong. Please try again.',
    statusCode: 500
  });
};

module.exports = errorHandler;
