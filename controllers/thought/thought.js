import { Thought } from '../../models/Thought.js';
import { User } from '../../models/User.js';
import {
  responseError,
  responseNotFound,
  responseUserError,
} from '../errorhandlers.js';

/**
 * Create a thought object (/api/thought)
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const createThought = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  //destruct the body and make sure we have a userId
  let { thoughtText, username, reactions, userId } = req.body;
  if (!userId) {
    responseUserError(res, "Required 'userId' not provided");
    return;
  }
  try {
    //create the thought
    const t = await Thought.create({
      thoughtText,
      username,
      reactions,
    });
    //update the user by adding the new thought id to the thoughts array
    const u = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { thoughts: t._id } },
      { runValidators: true, new: true }
    );
    res.status(200).json(t);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Get all the Thoughts (/api/thoughts)
 * @param {Request} req
 * @param {Response} res
 */
export const getThoughts = async (req, res) => {
  try {
    let u = await Thought.find();
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Get a sinlgle Thought by an id (/api/thoughts/:id)
 * @param {Request} req
 * @param {Response} res
 */
export const getOneThought = async (req, res) => {
  try {
    //return the thought otherwise a not found error message
    let u = await Thought.findOne({ _id: req.params.id }).select('-__v');
    !u ? responseNotFound(res, req.params.id) : res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Delete an existing thought (/api/thoughts/:id)
 * @param {Request} req
 * @param {Response} res
 */
export const deleteThought = async (req, res) => {
  try {
    //find and delete the thought otherwise return not found
    let u = await Thought.findByIdAndDelete(req.params.id);
    !u ? responseNotFound(res, req.params.id) : res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Update and existing thought (/api/thoughts/:id)
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const updateThought = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  try {
    //find existing thought and update it with the body params
    // otherwise error if not found
    let u = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    !u ? responseNotFound(res, req.params.id) : res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Add a reaction to an existing thought's reactions array (/api/thoughts/:id/reactions)
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const addReaction = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  try {
    //update thought with the params from body if found otherwise
    //return not found error
    const u = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Delete a reaction from the reactions array (/api/thoughts/:id/reactions)
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const deleteReaction = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  try {
    //remove reaction from exising reactions array if found otherwise return
    // not found message
    const u = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};
