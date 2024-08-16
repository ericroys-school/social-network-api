import { Router } from 'express';
import {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} from '../../../controllers/user/user.js';
export const userRouter = Router();

/**
 * /api/users POST/GET
 */
userRouter.route('/').get(getUsers).post(createUser);

/**
 * /api/users/id GET/DELETE/PUT
 */
userRouter.route('/:id').get(getOneUser).delete(deleteUser).put(updateUser);

/**
 * /api/users/id/friends/friendId  POST/DELETE for add/remove friends
 */
userRouter.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);
