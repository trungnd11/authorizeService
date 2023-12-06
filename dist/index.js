"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("./controllers/UserController"));
const RoleController_1 = __importDefault(require("./controllers/RoleController"));
const App_1 = __importDefault(require("./App"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.port;
const app = new App_1.default([new RoleController_1.default(), new UserController_1.default(), new AuthController_1.default()], port);
app.listen();
//# sourceMappingURL=index.js.map