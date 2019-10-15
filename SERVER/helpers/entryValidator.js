import Joi from "joi";

export const entryFields = (entry) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(50)
    .required().error(() =>'title must be a string'),
    description: Joi.string().min(3).max(20)
      .required().error(()=> 'description must be a string'),
  })

  return Joi.validate(entry, schema);
}; 

