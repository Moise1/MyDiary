import Joi from "joi";

const validateSignup = (user) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(3).max(20)
      .required().error(() =>'first_name must be a string'),
    last_name: Joi.string().min(3).max(20)
      .required().error(()=> 'last_name must be a string'),
    email: Joi.string().email({ minDomainSegments: 2 }).trim().required().error(() => 'email must be a valid email'),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required().error(() => "password must be at least 8 characters long containing 1 capital letter, 1 small letter, 1 digit and 1 of these special characters(@, $, !, %, *, ?, &)")

  });

  let options = {abortEarly: true};
  return Joi.validate(user, schema, options);
};


const validateSignin = (userFinder) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^\S+$/).email().required(),
    password: Joi.string().required()

  });


  return Joi.validate(userFinder, schema);
};

export {validateSignup, validateSignin};
