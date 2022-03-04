import isLoggedIn from "../../../utils/isLoggedIn"
import userWithToken from "../../../utils/userWithToken";

const checkSession = async (_, __, context) => {
    const user = isLoggedIn(context);
    if (!user) {
        throw new Error("No estás autorizado");
    }
    return userWithToken(user);
}