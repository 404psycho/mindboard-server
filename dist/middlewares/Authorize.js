"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const authorize = (req, res, next) => {
    try {
        if (req.headers["accesstoken"] !== process.env.ACCESS_TOKEN) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = authorize;
//# sourceMappingURL=Authorize.js.map