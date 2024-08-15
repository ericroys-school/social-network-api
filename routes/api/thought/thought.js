import { Router } from "express";
import { getThoughts, createThought, getOneThought,
    updateThought, deleteThought, addReaction, deleteReaction
 } from "../../../controllers/thought/thought.js";

export const thoughtRouter = Router();

thoughtRouter.route("/").get(getThoughts).post(createThought);

thoughtRouter.route("/:id").get(getOneThought).put(updateThought).delete(deleteThought);

thoughtRouter.route("/:id/reactions").post(addReaction).delete(deleteReaction);