import Joi from "@hapi/joi";

export const entryFields = (entry) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(50)
    .required(),
    description: Joi.string().min(3).max(20)
      .required(),
  })

  return schema.validate(entry, schema);
}; 

