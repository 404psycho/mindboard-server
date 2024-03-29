"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const GroupModel_1 = __importDefault(require("../models/GroupModel"));
const isGroupMember = async (req, res, next) => {
    try {
        const groupId = req.params.groupId || req.params.id;
        const requestingUserId = req.query.requestingUserId;
        if (!groupId) {
            return res.status(404).json({ message: "No group found" });
        }
        // Checking if group exists
        const group = await GroupModel_1.default.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "No group found" });
        }
        // Checking if requesting user belongs to the group
        if (group.admin.toString() !== requestingUserId) {
            const index = group.members.findIndex((member) => member.toString() === requestingUserId);
            if (index === -1) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
        req.body.group = group;
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = isGroupMember;
//# sourceMappingURL=isGroupMember.js.map