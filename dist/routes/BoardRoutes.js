"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController = __importStar(require("../controllers/Board"));
const Authorize_1 = __importDefault(require("../middlewares/Authorize"));
const IsValidId_1 = __importDefault(require("../middlewares/IsValidId"));
const hasAccessToBoard_1 = __importDefault(require("../middlewares/hasAccessToBoard"));
const isGroupMember_1 = __importDefault(require("../middlewares/isGroupMember"));
const router = express_1.default.Router();
// authorize middleware checks if the api call contains access token
// isGroupMember middleware check if the user requesting is a member or admin of the group or not
// hasAccessToBoard middleware check if the user requesting
// route to create board
router.post("/createBoard/:groupId", Authorize_1.default, isGroupMember_1.default, boardController.createBoard);
// route to get all the boards of the requesting user
router.get("/getAllBoards/:groupId", Authorize_1.default, isGroupMember_1.default, boardController.getAllBoards);
// route to authenticate if the user has access to the board and return it with the user data
router.get("/getBoardWithUser/:id", Authorize_1.default, hasAccessToBoard_1.default, boardController.getBoardWithUser);
// route to get board data
router.get("/getBoard/:id", Authorize_1.default, hasAccessToBoard_1.default, boardController.getboard);
// route to update the board name
router.put("/updateName/:id", Authorize_1.default, IsValidId_1.default, hasAccessToBoard_1.default, boardController.updateName);
// route to delete a board
router.delete("/deleteBoard/:id", Authorize_1.default, IsValidId_1.default, hasAccessToBoard_1.default, boardController.deleteBoard);
exports.default = router;
//# sourceMappingURL=BoardRoutes.js.map