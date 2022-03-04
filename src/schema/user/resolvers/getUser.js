import { ForbiddenError, UserInputError } from "apollo-server-core";
import User from "../../../models/User.model.js";
import isLoggedIn from "../../../utils/isLoggedIn.js";

const getUser = async (_, req, context) => {
    // Check if user is logged in
    if (!isLoggedIn(context)) {
        throw new ForbiddenError("No estás autorizado");
    }

    const user = await User.findById(req.id);

    if (!user) {
        throw new UserInputError("No se encontró el usuario");
    }

    return user;
}

export default getUser;