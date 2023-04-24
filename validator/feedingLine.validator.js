const yup = require("yup");

const createValidator = yup.object({
  machineId: yup.string().required("Machine ID is required"),
  code: yup.string().required("Feeding Line Code is required"),
  name: yup.string().required("Feeding Line Name is required"),
  password: yup.string().required("Feeding Line Password is required"),
  deleted: yup.bool().required("Feeding Line Status is required"),
});

const updateValidator = yup.object({
  id: yup.string().required("Feeding Line ID is required"),
  machineId: yup.string().required("Machine ID is required"),
  code: yup.string().required("Feeding Line Code is required"),
  name: yup.string().required("Feeding Line Name is required"),
  password: yup.string(),
  deleted: yup.bool().required("Feeding Line Status is required"),
});

module.exports = {
  createValidator,
  updateValidator,
};
