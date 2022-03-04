import { UserInputError } from "apollo-server-core";
import User from "../../../models/User.model.js";
import matchPasswords from "../../../utils/matchPasswords.js";
import userWithToken from "../../../utils/userWithToken.js";

const login = async (_, req) => {
    const { email, password } = req;
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserInputError("Usuario o contraseña incorrectos");
    }
    const isValid = await matchPasswords(password, user);
    if (!isValid) {
      throw new UserInputError("Usuario o contraseña incorrectos");
    }
  
    return userWithToken(user);
  };
  
  export default login;