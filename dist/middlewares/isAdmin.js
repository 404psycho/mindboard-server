"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const GroupModel_1 = __importDefault(require("../models/GroupModel"));
const isAdmin = async (req, res, next) => {
    try {
        const { requestingUserId } = req.query || {};
        // Finding group
        const group = await GroupModel_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Checking if the requesting user is the admin of the group or not
        if (group.admin.toString() !== requestingUserId) {
            return res.status(401).json({
                message: "Only group admin is authorized to perform this action",
            });
        }
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map