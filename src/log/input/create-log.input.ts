import Joi from '@hapi/joi'

export class CreateLogInput {
  content: string
}

const CreateLogSchema = Joi.object({
  class: Joi.string().alphanum().min(1).required(),
});

module.exports = CreateLogSchema;