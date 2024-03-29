"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongo = async () => {
    mongoose_1.default
        .connect(process.env.DATABASE_URI)
        .then(() => {
        console.log("connected");
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.default = connectToMongo;
//# sourceMappingURL=db.js.map