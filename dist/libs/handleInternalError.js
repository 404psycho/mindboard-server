"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Centralized function to handle internal server errors
const handleInternalError = (res) => {
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.default = handleInternalError;
//# sourceMappingURL=handleInternalError.js.map