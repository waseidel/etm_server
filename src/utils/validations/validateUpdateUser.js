import isValidPassword from "../isValidPassword.js";

const validateUpdateUser = (req) => {
    const errors = {};
    
    if (req.email) {
        if (!req.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            errors.email = "Email inválido";
        }
    }
    if (req.password) {
        const validPassword = isValidPassword(req.password);
        if (!validPassword.isValid) {
            errors.password = validPassword.errors;
        }
        if (!req.passwordConfirm) {
            errors.passwordConfirm = "La confirmación de la contraseña es requerida";
        } else if (req.password !== req.passwordConfirm) {
            errors.passwordConfirm = "Las contraseñas no coinciden";
        }
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

export default validateUpdateUser;