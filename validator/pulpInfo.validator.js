const yup = require("yup");

const createValidator = yup.object({
  brand_code: yup.string().required("Pulp Brand is required"),
  product_code: yup.string().required("Pulp Product is required"),
  type_code: yup.string().required("Pulp Type is required"),
  pack_num: yup.string().required("Default Shape is required"),
  unit_weight: yup.string().required("Single Pack Weight is required"),
  deleted: yup.bool().required("This field is required"),
  trained: yup.bool().required("This field is required"),
});

const updateValidator = yup.object({
  id: yup.string().required("Pulp Info ID is required"),
  brand_code: yup.string().required("Pulp Brand is required"),
  product_code: yup.string().required("Pulp Product is required"),
  type_code: yup.string().required("Pulp Type is required"),
  pack_num: yup.string().required("Default Shape is required"),
  unit_weight: yup.string().required("Single Pack Weight is required"),
  deleted: yup.bool().required("This field is required"),
  trained: yup.bool().required("This field is required"),
});

module.exports = {
  createValidator,
  updateValidator,
};
