import Joi from "joi";

const emailValidation = Joi.string().email();

const idValidation = Joi.string().length(24).hex();

const feedbackValidation = Joi.string();

const viewdValidation = Joi.boolean();

export const addSchema = Joi.object({
    email: emailValidation.required(),
    movieId: idValidation.required(),
    feedback: feedbackValidation,
    viewed: viewdValidation
})

export const getByEmailSchema = Joi.object({
    email: emailValidation.required()
})

export default {
    addSchema,
    getByEmailSchema
}