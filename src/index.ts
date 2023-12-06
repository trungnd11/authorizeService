import UserController from "./controllers/UserController";
import RoleController from "./controllers/RoleController";
import App from "./App";
import AuthController from "./controllers/AuthController";
import config from "./config";

const port = config.port;
const app = new App([new RoleController(), new UserController(), new AuthController()], port);

app.listen();
