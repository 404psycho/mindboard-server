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
const groupController = __importStar(require("../controllers/Group"));
const Authorize_1 = __importDefault(require("../middlewares/Authorize"));
const IsValidId_1 = __importDefault(require("../middlewares/IsValidId"));
const UserExists_1 = __importDefault(require("../middlewares/UserExists"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const GroupDataCheck_1 = __importDefault(require("../middlewares/GroupDataCheck"));
const isGroupMember_1 = __importDefault(require("../middlewares/isGroupMember"));
const router = express_1.default.Router();
// isAdmin middleware checks if the user requested api is the admin of the group who's id is provided
// isValidId middleware check if the length of provided id is 24
// authorize middleware checks if the api call contains access token
// Create Group
router.post("/createGroup", Authorize_1.default, GroupDataCheck_1.default, groupController.createGroup);
// Getting all groups based on the user's database id
router.get("/getAllGroups/:id", Authorize_1.default, IsValidId_1.default, UserExists_1.default, groupController.getAllGroups);
// Getting all groups based on the group database id
router.get("/getGroup/:id", Authorize_1.default, IsValidId_1.default, isGroupMember_1.default, groupController.getGroup);
// Deleting a group
router.delete("/deleteGroup/:id", Authorize_1.default, IsValidId_1.default, isAdmin_1.default, groupController.deleteGroup);
// adding a member to group
router.put("/addMembers/:id", Authorize_1.default, IsValidId_1.default, isAdmin_1.default, groupController.addMembers);
// inviting members to group by email
router.put("/inviteUsersByEmail/:id", Authorize_1.default, IsValidId_1.default, isAdmin_1.default, groupController.inviteUsersByEmails);
// joining group
router.put("/joinGroup/:id", Authorize_1.default, IsValidId_1.default, groupController.joinGroup);
// removing a member from the group
router.put("/removeMember/:id", Authorize_1.default, IsValidId_1.default, isAdmin_1.default, groupController.removeMember);
router.put("/leaveGroup/:id", Authorize_1.default, IsValidId_1.default, isGroupMember_1.default, groupController.leaveGroup);
exports.default = router;
//# sourceMappingURL=GroupRoutes.js.map