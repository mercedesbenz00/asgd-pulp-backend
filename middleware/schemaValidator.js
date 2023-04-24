const schemaValidator = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    res.status(400).sendError(e.errors, "Invalid Request");
  }
};

module.exports = schemaValidator;
