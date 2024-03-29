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
const userControllers = __importStar(require("../controllers/User"));
const UserDataCheck_1 = __importDefault(require("../middlewares/UserDataCheck"));
const IsValidId_1 = __importDefault(require("../middlewares/IsValidId"));
const Authorize_1 = __importDefault(require("../middlewares/Authorize"));
const UserExists_1 = __importDefault(require("../middlewares/UserExists"));
const router = express_1.default.Router();
// isValidId middleware check if the length of provided id is 24
// authorize middleware checks if the api call contains access token
// userExists middleware check if the user with provided userid exists
// Sign up route
router.post("/signupwithclerk", Authorize_1.default, UserDataCheck_1.default, userControllers.SignUpWithClerk);
// Get user
router.get("/getUser/:id", Authorize_1.default, IsValidId_1.default, userControllers.getUser);
// Update user route
router.put("/updateUser/:id", Authorize_1.default, IsValidId_1.default, UserExists_1.default, UserDataCheck_1.default, userControllers.updateUser);
// Delete user route
router.delete("/deleteUser/:id", Authorize_1.default, IsValidId_1.default, UserExists_1.default, userControllers.deleteUser);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map