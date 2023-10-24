const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

const validateRegister = (req, res, next) => {
  if (!Object.keys(req.body).length || !req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { error } = authSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `${error.details[0].message}` });
  }

  next();
};

module.exports = validateRegister;
