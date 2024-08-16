import { Thought } from '../../models/Thought.js';
import { User } from '../../models/User.js';
import {
  responseError,
  responseNotFound,
  responseUserError,
} from '../errorhandlers.js';

/**
 * Create a new User
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const createUser = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  //destructure params
  let { username, email, thoughts, friends } = req.body;
  try {
    //create the user
    const u = await User.create({
      username,
      email,
      thoughts,
      friends,
    });
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 */
export const getUsers = async (req, res) => {
  try {
    let u = await User.find();
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Get all a user by id
 * @param {Request} req
 * @param {Response} res
 */
export const getOneUser = async (req, res) => {
  try {
    let u = await User.findOne(
      { _id: req.params.id },
      { strictPopulate: false }
    )
      .select('-__v')
      .populate('thoughts')
      .populate('friends');
    !u ? responseNotFound(res, req.params.id) : res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Delete a user by id
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = async (req, res) => {
  try {
    let u = await User.findByIdAndDelete({ _id: req.params.id });
    if (!u) {
      responseNotFound(res, req.params.id);
      return;
    }
    let t = await Thought.deleteMany({ username: u.username });
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Update an existing user
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = async (req, res) => {
  if (!req.body) {
    responseUserError(res, 'No body provided');
    return;
  }

  try {
    let u = await User.findByIdAndUpdate(
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
 * Add a friend for the user
 * @param {Request} req
 * @param {Response} res
 */
export const addFriend = async (req, res) => {
  try {
    const u = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(u);
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};

/**
 * Delete a friend from the user
 * @param {Request} req
 * @param {Response} res
 */
export const deleteFriend = async (req, res) => {
  try {
    const u = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    responseError(res, err.message || err);
  }
};
