"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const BoardModel_1 = __importDefault(require("../models/BoardModel"));
const hasAccessToBoard = async (req, res, next) => {
    try {
        const { id } = req.params || {};
        const requestingUserId = req.query.requestingUserId;
        // Getting board
        const board = await BoardModel_1.default.findById(id).populate("group");
        if (!board) {
            return res.status(404).json({ message: "No board found" });
        }
        // Getting group from board
        const group = board.group;
        // Checking if requesting user belongs to the group
        // @ts-ignore
        if (group.admin.toString() !== requestingUserId) {
            // @ts-ignore
            const index = group.members.findIndex(
            // @ts-ignore
            (member) => member.toString() === requestingUserId);
            if (index === -1) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
        req.body.group = group;
        req.body.board = board;
        next();
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.default = hasAccessToBoard;
//# sourceMappingURL=hasAccessToBoard.js.map