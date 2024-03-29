"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateName = exports.getboard = exports.getBoardWithUser = exports.getAllBoards = exports.createBoard = void 0;
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const BoardModel_1 = __importDefault(require("../models/BoardModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const handleIncompleteError_1 = __importDefault(require("../libs/handleIncompleteError"));
// Creating a new board
const createBoard = async (req, res) => {
    try {
        const { name, image = "1.svg" } = req.body.board;
        const { _id } = req.body.group;
        const { requestingUserId } = req.query;
        if (!name)
            return (0, handleIncompleteError_1.default)(res);
        // Creating
        const board = await BoardModel_1.default.create({
            name,
            image,
            group: _id,
            createdBy: requestingUserId,
            lastUpdatedBy: requestingUserId,
        });
        // Response
        res.status(200).json({ message: "Board Created" });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.createBoard = createBoard;
// Getting all boards of a specific group
const getAllBoards = async (req, res) => {
    try {
        const { _id } = req.body.group;
        const boards = await BoardModel_1.default.find({
            group: _id,
        })
            .populate("group")
            .populate("createdBy", "username email firstName lastName profilePic")
            .populate("lastUpdatedBy", "username email firstName lastName profilePic");
        // Response
        res.status(200).json({ boards });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getAllBoards = getAllBoards;
// Authenticating user and responsing with user data and board data
const getBoardWithUser = async (req, res) => {
    try {
        const { board } = req.body.board;
        const user = await UserModel_1.default.findById(req.query.requestingUserId);
        // Response
        res.status(200).json({ board, user });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getBoardWithUser = getBoardWithUser;
// Getting a specific board
const getboard = async (req, res) => {
    try {
        const board = await BoardModel_1.default.findById(req.params.id)
            .populate("group")
            .populate("createdBy", "username email firstName lastName profilePic")
            .populate("lastUpdatedBy", "username email firstName lastName profilePic");
        // Response
        res.status(200).json({ board });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getboard = getboard;
// Updating name of board
const updateName = async (req, res) => {
    try {
        const { newName } = req.body;
        const { id } = req.params;
        const board = await BoardModel_1.default.findByIdAndUpdate(id, {
            name: newName,
            lastUpdatedBy: req.query.requestingUserId,
        });
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        // Response
        res.status(200).json({ message: "Name updated" });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.updateName = updateName;
// Deleting a board
const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await BoardModel_1.default.findByIdAndDelete(id);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        // Response
        res.status(200).json({ message: "Board Deleted Successfully" });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=Board.js.map