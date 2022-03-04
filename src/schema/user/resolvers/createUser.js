import { UserInputError } from "apollo-server-core";
import bcryptjs from "bcryptjs";
import User from "../../../models/User.model.js";
import userWithToken from "../../../utils/userWithToken.js";
import validateCreateUser from "../../../utils/validations/validateCreateUser.js";

const createUser = async (_, req) => {
  // Validate user input
  // TODO: Add validation for input
  const { errors, isValid } = validateCreateUser(req);
  if (!isValid) {
    throw new UserInputError("Errores de validación", { errors });
    
  }
  // Check if user already exists
  const user = await User.findOne({ email: req.email });
  if (user) {
    throw new UserInputError("El usuario ya existe");
  }
  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.password, salt);
  // Create new user
  const newUser = new User({
    ...req,
    password: hashedPassword,
  });
  const createdUser = await newUser.save();
  return createdUser;
};

export default createUser;