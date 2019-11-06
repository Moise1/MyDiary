import Joi from "@hapi/joi"; 

const validateSignup = (user) => {
  
  const schema = Joi.object().keys({
    first_name: Joi.string().min(3).max(20)
      .required(),
    last_name: Joi.string().min(3).max(20)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()

  });

  const options = {
    abortEarly: false,
    key: '"{{key}}" ',
    escapeHtml: true,
    language: {
      string: {
          base: '{{key}} '
      }
  }
};
  return schema.validate(user, options);
};



const validateSignin = (userFinder) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^\S+$/).email().required(),
    password: Joi.string().required()

  });


  const options = {
    abortEarly: false,
    key: '"{{key}}" ',
    escapeHtml: true,
    language: {
      string: {
          base: '{{key}} '
      }
  }
};
  return schema.validate(userFinder, options);
};

export {validateSignup, validateSignin};
