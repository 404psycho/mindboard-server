"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./db"));
const GroupRoutes_1 = __importDefault(require("./routes/GroupRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const BoardRoutes_1 = __importDefault(require("./routes/BoardRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/v1/user/", UserRoutes_1.default);
app.use("/api/v1/group/", GroupRoutes_1.default);
app.use("/api/v1/board/", BoardRoutes_1.default);
const server = http_1.default.createServer(app);
(0, db_1.default)();
server.listen(8080, () => {
    console.log("Server running");
});
exports.default = app;
//# sourceMappingURL=index.js.map