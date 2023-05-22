import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password")
});

export default userSchema;