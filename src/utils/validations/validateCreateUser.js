import isValidPassword from "../isValidPassword.js";

const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateCreateUser = (req) => {
    const errors = {};
    const { name, email, password, confirmPassword } = req;
    if (!name) {
        errors.name = "El nombre es requerido";
    }
    if (!email) {
        errors.email = "El correo es requerido";
    } else if (!isEmail(email)) {
        errors.email = "El correo no es válido";
    }

    if (!password) {
        errors.password = "La contraseña es requerida";
    } else {
        const validPassword = isValidPassword(password);
        if (!validPassword.isValid) {
            errors.password = validPassword.errors;
            
        } 
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};

export default validateCreateUser;