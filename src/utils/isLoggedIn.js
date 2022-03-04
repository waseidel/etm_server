import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const isLoggedIn = async (context) => {
    if (!context.req.headers.authorization) {
        throw new Error("No estás logueado");
    }
    const token = context.req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findOne({ _id: payload.id });
};

export default isLoggedIn;