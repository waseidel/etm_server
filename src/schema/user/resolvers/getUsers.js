import { AuthenticationError } from "apollo-server-core";
import User from "../../../models/User.model.js";
import isLoggedIn from "../../../utils/isLoggedIn.js";

const getUsers = async (_, req, context) => {
    const isLogged = isLoggedIn(context);
  
    if (!isLogged) {
      throw new AuthenticationError("Debes estar logueado para ver los usuarios");
    }
  
    return await User.find({});
  };
  
export default getUsers;