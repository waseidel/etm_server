const isValidPassword = (password) => {
    const errors = [];
    if (password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres");
    }
    if (password.search(/[a-z]/) < 0) {
        errors.push("La contraseña debe tener al menos una letra minúscula");
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("La contraseña debe tener al menos una letra mayúscula");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("La contraseña debe tener al menos un número");
    }
    
    return {
        errors,
        isValid: errors.length === 0,
    }
};

export default isValidPassword;