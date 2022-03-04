import { ForbiddenError, UserInputError } from "apollo-server-core";
import bcryptjs from "bcryptjs";
import isLoggedIn from "../../../utils/isLoggedIn.js";
import validateUpdateUser from "../../../utils/validations/validateUpdateUser.js";

const updateUser = async (_, req, context) => {
  // Check if user is logged in
  if (!isLoggedIn(context)) {
    throw new ForbiddenError("No estás autorizado");
  }

  // Check data
  const { errors, isValid } = validateUpdateUser(req);
  if (!isValid) {
    throw new UserInputError("Errores", { errors });
  }
  
  // Check if user exists
  const user = await isLoggedIn(context);
  console.log(user);
  if (!user) {
    throw new UserInputError("No existe el usuario");
  }

  // Update user
  user.name = req.name;
  user.email = req.email;
  if (req.password) {
    // encrypt password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(req.password, salt);
  }
  
  await user.save();
  return user;
};

export default updateUser;