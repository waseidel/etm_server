import generateToken from "./generateToken.js";

const userWithToken = (user) => {
    return {
        user: {
        id: user._id,
        ...user._doc,
        },
        token: generateToken(user),
    };
};

export default userWithToken;