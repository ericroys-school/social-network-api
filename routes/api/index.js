import { Router } from "express";
import { userRouter } from "./user/user.js";
import { thoughtRouter } from "./thought/thought.js";

export const apiRoutes = Router();

apiRoutes.use("/users", userRouter);
apiRoutes.use("/thoughts", thoughtRouter);
