const Joi = require('joi');
const validateSignUp = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email:Joi.string().email().required(),
    })
    const result = schema.validate(data);
    return result;

}


const validateCreateCompany = (data) => {
    const schema = Joi.object({
        company_name: Joi.string().required(),
      
        company_email: Joi.string().required(),
        company_address:Joi.string().required(),
        company_description: Joi.string().required()
    })
    const result = schema.validate(data);
    return result;
}

const validateUpdateCompany = (data) => {
    const schema = Joi.object({
        company_private_key: Joi.string().required(),
        company_name: Joi.string(),
      
        company_email: Joi.string().email(),
        company_address:Joi.string(),
        company_description: Joi.string()
    })
    const result = schema.validate(data);
    return result;
}

const validateUpdateUser = (data) => {
    const schema = Joi.object({
        user_private_key: Joi.string().required(),
        name: Joi.string(),
        email: Joi.string().email(),
        company_id:Joi.number().integer()
        
    })
    const result = schema.validate(data,{ abortEarly:false});
    return result;
}

const userLoginValidation = (data) => {
    const schema = Joi.object({
        user_private_key:Joi.string().required()
    })
    const result = schema.validate(data,{ abortEarly:false});
    return result;
}

const validateCreateAdmin = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        company_id:Joi.number().integer()
        
    })
    const result = schema.validate(data);
    return result;
}

const validateCreateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
    })
    const result = schema.validate(data);
    return result;
}

module.exports = {
    validateSignUp,
    validateCreateCompany,
    validateUpdateCompany,
    validateUpdateUser,
    userLoginValidation,
    validateCreateAdmin,
    validateCreateUser
}