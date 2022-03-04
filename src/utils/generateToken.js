import jwt from "jsonwebtoken";

const generateToken = async (user) => {
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    return token;
}

  
export default generateToken;