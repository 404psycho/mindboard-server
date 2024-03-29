"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGroup = exports.inviteUsersByEmails = exports.leaveGroup = exports.removeMember = exports.addMembers = exports.createGroup = exports.deleteGroup = exports.getGroup = exports.getAllGroups = void 0;
const handleIncompleteError_1 = __importDefault(require("../libs/handleIncompleteError"));
const handleInternalError_1 = __importDefault(require("../libs/handleInternalError"));
const GroupModel_1 = __importDefault(require("../models/GroupModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const SendInvitationEmail_1 = require("../libs/SendInvitationEmail");
// Get all groups of an user by it's databse userid
const getAllGroups = async (req, res) => {
    try {
        const groups = await GroupModel_1.default.find({
            $or: [{ members: req.params.id }, { admin: req.params.id }],
        })
            .populate("members", "username email")
            .populate("admin", "username email");
        // Response
        return res.status(200).json({ groups });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getAllGroups = getAllGroups;
// Get a group by groupID
const getGroup = async (req, res) => {
    try {
        // Checking if group exists
        const group = await GroupModel_1.default.findById(req.params.id)
            .populate("members", "username email profilePic")
            .populate("admin", "username email profilePic");
        if (!group) {
            return res.status(404).json({ message: "No group found" });
        }
        // Response
        return res.status(200).json({ group });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.getGroup = getGroup;
// Deleting group
const deleteGroup = async (req, res) => {
    try {
        // deleting
        const group = await GroupModel_1.default.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Response
        return res.status(200).json({ message: "Group deleted" });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.deleteGroup = deleteGroup;
// Creating group
const createGroup = async (req, res) => {
    try {
        // Destructuring
        const { admin, image, name } = req.body.group || {};
        // Creating
        const group = await GroupModel_1.default.create({
            name,
            admin,
            image,
            members: [],
        });
        // Response
        return res
            .status(200)
            .json({ message: "Group created", groupId: group.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.createGroup = createGroup;
// Add members to group with an array of ids of users
const addMembers = async (req, res) => {
    try {
        // Destructuring
        const { members } = req.body.group || {};
        if (!members || members.length < 1) {
            return (0, handleIncompleteError_1.default)(res);
        }
        // Find the group by ID
        const group = await GroupModel_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Push the new members into the group's members array
        members.forEach((member) => {
            if (member &&
                member.toString().length === 24 &&
                member.toString() !== group.admin.toString() &&
                !group.members.includes(member)) {
                group.members.push(member);
            }
        });
        // Saving the updated group
        const updatedGroup = await group.save();
        //Response
        return res
            .status(200)
            .json({ message: "New members added", groupId: updatedGroup.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.addMembers = addMembers;
// Removing members
const removeMember = async (req, res) => {
    try {
        // Destructuring
        const { user } = req.body || {};
        if (!user || user.length !== 24) {
            return (0, handleIncompleteError_1.default)(res);
        }
        // Find the group by ID
        const group = await GroupModel_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Removing users
        group.members = group.members.filter((member) => member.toString() !== user.toString());
        // Saving the updated group
        const updatedGroup = await group.save();
        // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET
        // Response
        return res
            .status(200)
            .json({ message: "Member has been removed", groupId: updatedGroup.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.removeMember = removeMember;
// Removing members
const leaveGroup = async (req, res) => {
    try {
        // Destructuring
        const { requestingUserId } = req.query || {};
        if (!requestingUserId || requestingUserId.length !== 24) {
            return (0, handleIncompleteError_1.default)(res);
        }
        // Find the group by ID
        const group = await GroupModel_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Removing users
        group.members = group.members.filter((member) => member.toString() !== requestingUserId.toString());
        // Saving the updated group
        const updatedGroup = await group.save();
        // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET
        // Response
        return res
            .status(200)
            .json({ message: "Group left", groupId: updatedGroup.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.leaveGroup = leaveGroup;
// route to send invite emails to users
const inviteUsersByEmails = async (req, res) => {
    try {
        const { emails } = req.body || {};
        if (!emails || emails.length < 1) {
            return (0, handleIncompleteError_1.default)(res);
        }
        const group = await GroupModel_1.default.findById(req.params.id).populate("admin", "firstName lastName");
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Fetch users from the database
        const users = await UserModel_1.default.find({ email: { $in: emails } });
        if (!users) {
            return res
                .status(404)
                .json({ message: "No users found with the provided IDs" });
        }
        users.forEach(async (user) => {
            await (0, SendInvitationEmail_1.SendInvitationEmail)(user.email, `${user.firstName} ${user.lastName}`, 
            // @ts-ignore
            `${group.admin.firstName} ${group.admin.lastName}`, group.name, `https://mindboard.vercel.app/groups/join/${group._id}`);
        });
        // Response
        return res.status(200).json({
            message: "Invites have been sent on provided emails",
            groupId: group.id,
        });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.inviteUsersByEmails = inviteUsersByEmails;
// joining group
const joinGroup = async (req, res) => {
    try {
        // Destructring
        const { user } = req.body || {};
        if (!user || user.length !== 24) {
            return (0, handleIncompleteError_1.default)(res);
        }
        // Find the group by ID
        const group = await GroupModel_1.default.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // Accepting invite and adding user from invites to members list
        if (!group.members.includes(user)) {
            group.members.push(user);
        }
        // Saving the updated group
        const updatedGroup = await group.save();
        // TODO : EMAIL / NOTIFICATION LOGIC TO IMPLEMENT YET
        // Response
        return res
            .status(200)
            .json({ message: "Invitation accepted", groupId: updatedGroup.id });
    }
    catch (error) {
        console.error(error);
        (0, handleInternalError_1.default)(res);
    }
};
exports.joinGroup = joinGroup;
//# sourceMappingURL=Group.js.map