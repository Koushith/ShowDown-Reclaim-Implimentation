import express from 'express';

import { register, getUser, getUsers, updateUser, deleteUser, getUserBySteamId } from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.get('/:id', getUser);
router.get('/list-users', getUsers);
router.post('/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user/steamId/:steamId', getUserBySteamId);


export default router;