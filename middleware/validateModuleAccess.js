const validateModuleAccess = (moduleIdentifier) => (req, res, next) => {
  if (req.session.user) {
    req.isSuperAdmin = false;

    const modulesList = req.session && Object.values(req.session.user?.modules);
    if (
      modulesList &&
      (modulesList.indexOf(moduleIdentifier) > -1 ||
        modulesList.indexOf("IS_SUPER_ADMIN") > -1)
    ) {
      if (modulesList.indexOf("IS_SUPER_ADMIN") > -1) {
        req.isSuperAdmin = true;
      } else {
        req.isSuperAdmin = false;
      }

      next();
    } else {
      return res.status(403).send({
        status: false,
        message: "USER_NOT_AUTHORIZED",
        errors: [],
        data: null,
      });
    }
  } else {
    return res.status(403).send({
      status: false,
      message: "USER_NOT_AUTHORIZED",
      errors: [],
      data: null,
    });
  }
};

module.exports = validateModuleAccess;
