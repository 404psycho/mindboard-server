"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleIncompleteError_1 = __importDefault(require("../libs/handleIncompleteError"));
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const userDataCheck = (req, res, next) => {
    try {
        const { email, username, firstName, profilePic } = req.body.user || {};
        if (!email || !username || !firstName || !profilePic) {
            return (0, handleIncompleteError_1.default)(res);
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = userDataCheck;
//# sourceMappingURL=UserDataCheck.js.map