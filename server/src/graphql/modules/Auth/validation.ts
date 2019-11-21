import * as yup from 'yup'

const PASSWORD_MIN_LENGTH = 6

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email(),
    password: yup.string().required(),
})

const registerValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email(),
    password: yup
        .string()
        .required()
        .min(PASSWORD_MIN_LENGTH),
})

export {loginValidationSchema, registerValidationSchema}
