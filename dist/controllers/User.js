"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.SignUpWithClerk = void 0;
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Storing user created from Clerk in the database
const SignUpWithClerk = async (req, res) => {
    try {
        // destructuring
        const { email, username, clerkId, firstName, lastName, profilePic } = req.body.user || {};
        // Checking if a user with the provided email or username already exists
        const existingUser = await UserModel_1.default.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() },
            ],
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User with provided email or username already exists",
            });
        }
        const user = await UserModel_1.default.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            clerkId,
            firstName,
            lastName,
            profilePic,
        });
        if (!user) {
            return (0, handleInternalError_1.default)(res);
        }
        // Response
        return res.status(200).json({ message: "User created", userId: user.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.SignUpWithClerk = SignUpWithClerk;
// Getting a user
const getUser = async (req, res) => {
    try {
        const user = await UserModel_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No User found" });
        }
        // Response
        return res.status(200).json({ message: "User found", user });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getUser = getUser;
// Updating user in the database
const updateUser = async (req, res) => {
    try {
        const { email, username, clerkId, firstName, lastName, profilePic } = req.body.user || {};
        // Checking if a user with the provided email or username already exists
        const usernameExists = await UserModel_1.default.findOne({
            username: username.toLowerCase(),
        });
        const emailExists = await UserModel_1.default.findOne({ email: email.toLowerCase() });
        if ((usernameExists && usernameExists.id !== req.params.id) ||
            (emailExists && emailExists.id !== req.params.id)) {
            return res.status(400).json({
                message: "User with provided email or username already exists",
            });
        }
        // updating
        const updatedUser = await UserModel_1.default.findByIdAndUpdate(req.params.id, {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            clerkId,
            firstName,
            lastName,
            profilePic,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "No user found" });
        }
        // Response
        return res
            .status(200)
            .json({ message: "User updated", userId: updatedUser.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.updateUser = updateUser;
// Deleting user from the database
const deleteUser = async (req, res) => {
    try {
        // deleting
        const deletedUser = await UserModel_1.default.findByIdAndDelete(req.params.id);
        // Response
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=User.js.map