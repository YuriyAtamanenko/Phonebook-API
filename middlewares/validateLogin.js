const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

const validateLogin = (req, res, next) => {
  if (!Object.keys(req.body).length || !req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `${error.details[0].message}` });
  }

  next();
};

module.exports = validateLogin;
