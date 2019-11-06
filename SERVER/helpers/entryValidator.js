import Joi from "@hapi/joi";

export const validateEntry = (entry) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(50)
    .required(),
    description: Joi.string().min(3).max(20)
      .required(),
  })

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
  return schema.validate(entry, options);
}; 

