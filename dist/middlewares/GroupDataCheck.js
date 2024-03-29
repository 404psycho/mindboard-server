"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleIncompleteError_1 = __importDefault(require("../libs/handleIncompleteError"));
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const groupDataCheck = (req, res, next) => {
    try {
        const { admin, name } = req.body.group || {};
        if (!admin || !name) {
            return (0, handleIncompleteError_1.default)(res);
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = groupDataCheck;
//# sourceMappingURL=GroupDataCheck.js.map