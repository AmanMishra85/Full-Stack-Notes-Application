import express from 'express';
import ChangePic from '../controller/ChangePic.js';
import authMiddleware from '../middleware/AuthMiddleWare.js';

const UserRouter = express.Router();

UserRouter.get('/changePics',authMiddleware,ChangePic);

export default UserRouter;