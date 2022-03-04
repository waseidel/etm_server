import { ForbiddenError, UserInputError } from "apollo-server-core";
import User from "../../../models/User.model.js";
import isLoggedIn from "../../../utils/isLoggedIn.js";

const deleteUser = async (_, req, context) => {
    // Check if user is logged in
    if (!isLoggedIn(context)) {
        throw new ForbiddenError("No estás autorizado");
    }

    // Check if user exists and delete
    try {
        const user = await User.findByIdAndDelete(req.id);

        if (!user) {
            throw new UserInputError("No se encontró el usuario");
        }
    } catch (error) {
        throw new UserInputError(error.message);
    }
    // Delete user
    return "Usuario eliminado";
};

export default deleteUser;