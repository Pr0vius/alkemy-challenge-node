const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const { webtoken, mail } = require("../config/index");
const ErrorResponse = require("../helpers/errorResponse");
const userService = require("./user.service");

sgMail.setApiKey(mail.apiKey);

const login = async (email, password) => {
    try {
        //Email Validation
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new ErrorResponse(
                "Couldn't LogIn",
                400,
                "User doesn't exist"
            );
        }

        // User status Validation
        if (!user.enabled) {
            throw new ErrorResponse(
                "Authentication failed! User disabled.",
                401
            );
        }
        // Password Validation
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new ErrorResponse(
                "Couldn't LogIn",
                400,
                "User doesn't exist"
            );
        }

        // JSONWEBTOKEN
        const token = _encrypt(user.id);

        return {
            token,
            role: user.role,
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            enabled: user.enabled,
        };
    } catch (err) {
        throw new ErrorResponse("Something went wrong", 500, err);
    }
};

const register = async (user) => {
    try {
        const newUser = await userService.create(user);

        const msg = {
            to: `${user.email}`, 
            from: `${mail.email}`,
            subject: "Thanks you to register to my Api!",
            text: `Hi, ${user.username}!this email was sended by SendGrid to say thanks you, now you can use the api now`,
        };

        await sgMail.send(msg);

        const token = _encrypt(newUser.id);

        return {
            token,
            role: newUser.role,
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            email: newUser.email,
            enabled: newUser.enabled,
        };
    } catch (err) {
        throw new ErrorResponse("Couldn't create the user", 403, err);
    }
};

const _encrypt = (id) => {
    return jwt.sign({ id }, webtoken.secret, { expiresIn: webtoken.expires });
};

const validateToken = async (token) => {
    try {
        let id;

        //Verify Token
        if (!token) {
            throw new ErrorResponse(
                "Authentication Failed",
                401,
                "Token Required"
            );
        }
        try {
            const decoded = jwt.verify(token, webtoken.secret);
            id = decoded.id;
        } catch (error) {
            throw new ErrorResponse(
                "Authentication Failed",
                401,
                "Invalid Token"
            );
        }
        //Find User
        const user = await userService.findById(id);
        if (!user) {
            throw new ErrorResponse(
                "Authentication Failed",
                401,
                "Invalid Token"
            );
        }

        //Verify user state
        if (!user.enabled) {
            throw new ErrorResponse(
                "Authentication Failed",
                401,
                "User Disabled"
            );
        }

        return user;
    } catch (err) {
        throw err;
    }
};

const validateRole = (user, ...roles) => {
    if (!roles.includes(user.role)) {
        throw new ErrorResponse(
            "Authorization Failed",
            403,
            "Unauthorized user"
        );
    }
    return true;
};

module.exports = {
    login,
    register,
    validateToken,
    validateRole,
};
