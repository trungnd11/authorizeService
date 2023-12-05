import express from "express";
import { findRoleByName } from "../controllers/RoleController";

const role = express.Router();

role.get("/find-role-by-name", findRoleByName);

export default role;