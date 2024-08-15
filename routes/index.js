import { Router } from "express";
import { apiRoutes } from "./api/index.js";

export const routes = Router();

routes.use("/api", apiRoutes);
