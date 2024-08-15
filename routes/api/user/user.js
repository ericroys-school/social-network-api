import { Router } from 'express';
import {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} from '../../../controllers/user/user.js';
export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);

userRouter.route('/:id').get(getOneUser).delete(deleteUser).put(updateUser);

userRouter.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);
