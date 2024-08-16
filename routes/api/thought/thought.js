import { Router } from "express";
import { getThoughts, createThought, getOneThought,
    updateThought, deleteThought, addReaction, deleteReaction
 } from "../../../controllers/thought/thought.js";

export const thoughtRouter = Router();

/**
 * /api/thoughts/  GET/POST for getAll and create
 */
thoughtRouter.route("/").get(getThoughts).post(createThought);

/**
 * /api/thoughts/id  GET/PUT/DELETE for getOne, update, and delete
 */
thoughtRouter.route("/:id").get(getOneThought).put(updateThought).delete(deleteThought);

/**
 * /api/thoughts/id/reactions  POST/DELETE for add/remove reactions
 */
thoughtRouter.route("/:id/reactions").post(addReaction).delete(deleteReaction);