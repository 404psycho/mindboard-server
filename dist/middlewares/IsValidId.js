"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
// Function to check if the provided ID is valid
const isIdValid = async (req, res, next) => {
    try {
        if (req.params.id.length !== 24) {
            return res.status(400).json({ message: "Invalid id" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = isIdValid;
//# sourceMappingURL=IsValidId.js.map