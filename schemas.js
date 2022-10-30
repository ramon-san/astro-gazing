import Joi from 'joi'; // Joi helps us create schemas for JSONs.

// Schema that validates data every camp should have.
export const campSchema = Joi.object({ // If export declared with default destructure can't happen.
    camp: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});