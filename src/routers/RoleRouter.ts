import express from "express";
import RoleController from "../controllers/RoleController";

const role = express.Router();

role.get("/find-role-by-name", RoleController.findRoleByName);

export default role;