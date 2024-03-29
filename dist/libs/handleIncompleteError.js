"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Centralized function to handle incomplete data errors
const handleIncompleteError = (res) => {
    return res.status(400).json({ message: "Incomplete data" });
};
exports.default = handleIncompleteError;
//# sourceMappingURL=handleIncompleteError.js.map