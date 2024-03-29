"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const userExists = async (req, res, next) => {
    try {
        // Checking if the user exists
        const user = await UserModel_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = userExists;
//# sourceMappingURL=UserExists.js.map