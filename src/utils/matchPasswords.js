import bcrypt from "bcryptjs";

const matchPasswords = async (paswword, user) => {
    return await bcrypt.compare(paswword, user.password);
};
  
export default matchPasswords;