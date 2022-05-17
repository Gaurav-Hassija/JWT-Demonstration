const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: "Page Not Found",
    message: "Requested URL is not found!",
  });
};

module.exports = { notFound };
